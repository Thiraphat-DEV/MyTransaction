//should be get collection of firestore database realtime
import { projectFirestore } from "../firebase/config";
//requireHook
import { useState, useEffect } from "react";
export const useCollection = (collection) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = projectFirestore.collection(collection);
    //shot of edcontent to transaction document
    //real time collection from document
    const unsub = ref.onSnapshot(
      (shot) => {
	      //get data of shot to array
	      let results = []

	      shot.docs.forEach((doc) => {
		      //add data and id of user to array
		      results.push({...doc.data(), id: doc.id})
	      })

	      //update state of document
	      setDocuments(results)
	      setError(null)
      },
      (err) => {
	      console.log(err.message)
        setError("Could not get Data from firestoreDatabase");
      }
    );

    //clean up unsub function with remove state is repeat
    return () => unsub()
    //run everytime of collection is changed or state of collection update
  }, [collection]);

  return {documents, error}
};
