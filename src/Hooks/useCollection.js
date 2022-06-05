//should be get collection of firestore database realtime
import { projectFirestore } from "../firebase/config";
//requireHook
import { useState, useEffect, useRef } from "react";
export const useCollection = (collection, _query, _order) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // Use useRef if I will enter more than 1 query and the previous query will still be stored.
  //if you are don't use a ref -> infinite loop in useEffect
  //_query is an array is 'difference' on every function call 
  const query = useRef(_query).current
  // order to TransactionList
  const order = useRef(_order).current

  useEffect(() => {
    //**  ORM style oneline completed
    // let ref = projectFirestore.collection(collection).where(...query).orderBy(...order).onSnapshot((shot) => {
    //   let results = []
    //   shot.docs.forEach((doc) =>{
    //     results.push({...doc, id: user.id})

    //   })

    // })

    //check query of firestoreDatabase
    let ref = projectFirestore.collection(collection);
    //If the state is changed in the transaction collection
    if (query) {
      //All queries are retained, they are not cleared to keep the same state that the user wants.
      ref = ref.where(...query);
    }
    //check is order to transaction
    if(order) {
      ref = ref.orderBy(...order)
    }

    //shot of edcontent to transaction document
    //real time collection from document
    const unsub = ref.onSnapshot(
      (shot) => {
        //get data of shot to array
        let results = [];

        shot.docs.forEach((doc) => {
          //add data and id of user to array
          results.push({ ...doc.data(), id: doc.id });
        });

        //update state of document
        setDocuments(results);
        setError(null);
      },
      (err) => {
        console.log(err.message);
        setError("Could not get Data from firestoreDatabase");
      }
    );

    //clean up unsub function with remove state is repeat
    return () => unsub();
    //run everytime of collection, query, order is changed or state of collection, query, order  update
  }, [collection, query, order]);

  return { documents, error};
};
