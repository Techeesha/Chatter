import { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const useGoogle = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch }: any = useAuthContext();

  const googleSignUp = async () => {
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      if (res.user.displayName) {
        const splitName: string[] | undefined =
          res.user.displayName?.split(" ");
        const firstName: string = splitName[0];
        const lastName: string = splitName[1];

        // create a user document
        await db.collection("users").doc(res.user.uid).set({
          photoURL: res.user.photoURL,
          email: res.user.email,
          firstName: firstName,
          lastName: lastName,
          headline: "",
          online: true,
          interests: [],
        });

        // dispatch login action
        dispatch({ type: "LOGIN", payload: res.user });

        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
      }
    } catch (err: any) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  const googleSignIn = async () => {
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      // const res = await signInWithRedirect(auth, provider);

      if (!res) {
        throw new Error("Could not complete sign-in");
      }

      // update user document
      await db.collection("users").doc(res.user.uid).update({
        online: true,
      });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err: any) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { googleSignUp, googleSignIn, error, isPending };
};
