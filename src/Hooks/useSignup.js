import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

//require dispatch is change content check user

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  //destruck useAuthContext
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      //signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      dispatch({ type: "SIGNUP", payload: res.user });
      // console.log(res.user);

      //check is not response to page after createUser
      if (!res) {
        throw new Error("NOT RESPONSE AND NOT CREATE USER TO FIREBASE");
      }

 
      await res.user.updateProfile({ displayName });
      if (!isCanceled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCanceled) {
        // console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    //In case the original state persists, remove the original state after the logout.
    return () => setIsCanceled(true);
  }, []);
  return { signup, error, isPending };
};

export default useSignup;
