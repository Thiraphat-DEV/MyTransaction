import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";

//required check context
import { useAuthContext } from "./useAuthContext";
const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  //destruck function dispatch
  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      //login with Email and Password
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      //check type of login
      dispatch({ type: "LOGIN", payload: res.user });

      //check response is false throw error for console
      if (!res) {
        throw new Error("NOT RESPONSE AND NOT CREATE USER TO FIREBASE");
      }

      if (!isCanceled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCanceled) {
        setError(error.message);
        setIsPending(false);
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    //In case the original state persists, remove the original state after the logout.
    return () => setIsCanceled(true);
  }, []);

  return { login, error, isPending };
};

export default useLogin;
