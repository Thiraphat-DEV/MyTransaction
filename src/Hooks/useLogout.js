//require hook authContext
import { useAuthContext } from "./useAuthContext";

//required signout from firebaseConfig
import { projectAuth } from "../firebase/config";
import { useEffect, useState } from "react";

const useLogout = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await projectAuth.signOut();

      dispatch({ type: "LOGOUT" });

      //update state
      if (!isCanceled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCanceled) {
        setError(error.message);
        setIsPending(false)
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    //In case the original state persists, remove the original state after the logout.
    return () => setIsCanceled(true);
  }, []);

  return { logout, error, isPending };
};

export default useLogout;
