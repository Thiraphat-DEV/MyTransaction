import { projectFirestore, timestamp} from "../firebase/config";
//require Hook for change state
import { useReducer, useState, useEffect } from "react";

//init state
const initstate = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

//check action
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { ...state, isPending: true };
    case "ADD_DOCUMENT":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
	error:null,
      };
case 'ERROR':
	return {...state, isPending:false, document: null,success: false, error:action.payload }
    default:
      return state;
  }
};
export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initstate);
  const [isCancelled, setIsCancelled] = useState(false);

  //create reference of collection
  const referenceCollection = projectFirestore.collection(collection);

  //only dispatch to change statestate
  const dispatchNotCanCel = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };
  //add to document with doc params
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
	    //before request you are check timestamp
	const createdAt = timestamp.fromDate(new Date()) // Date now
      const added = await referenceCollection.add({...doc, createdAt});
      dispatchNotCanCel({ type: "ADD_DOCUMENT", payload: added });
    } catch (error) {
	    dispatchNotCanCel({type: 'ERROR', payload: error.message})
    }
  };

  //delete a document
  const deleteDocument = async (id) => {};
  //clean up function after update state
  useEffect(() => {
    //remove old state and replace new state
    return () => setIsCancelled(true);
  }, []);

  return {addDocument}
};
