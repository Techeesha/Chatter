import { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    thumbnail: any,
    category: string
  ) => {
    setError(null);
    setIsPending(true);

    try {
      console.log(email);
      // signup
      const res = await auth.createUserWithEmailAndPassword(email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user?.uid}/${thumbnail.name}`;
      const img = await storage.ref(uploadPath).put(thumbnail);
      const downloadURL = await img.ref.getDownloadURL();

      // add display AND PHOTO_URL name to user
      await res.user?.updateProfile({
        displayName: firstName + " " + lastName,
        photoURL: downloadURL,
      });

      // create a user document
      await db.collection("users").doc(res.user?.uid).set({
        online: true,
        firstName,
        photoURL: downloadURL,
        interests: [],
        email,
        lastName,
        headline: "",
        category,
      });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err: any) {
      if (!isCancelled) {
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

  return { signup, error, isPending };
};
