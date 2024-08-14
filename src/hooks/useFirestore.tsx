import { useReducer, useEffect, useState } from "react";
import { db, timestamp, storage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

interface FirestoreState {
  document: any | null;
  isPending: boolean;
  error: string | null;
  success: boolean | null;
}

type FirestoreAction =
  | { type: "IS_PENDING" }
  | { type: "ADDED_DOCUMENT"; payload: any }
  | { type: "DELETED_DOCUMENT" }
  | { type: "UPDATED_DOCUMENT"; payload: any }
  | { type: "ERROR"; payload: string };

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (
  state: FirestoreState,
  action: FirestoreAction
): FirestoreState => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "UPDATED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection: string) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  const { user } = useAuthContext();

  // collection ref
  const ref = db.collection(collection);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action: FirestoreAction) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (doc: any, image?: File) => {
    dispatch({ type: "IS_PENDING" });
    if (image) {
      try {
        const uploadPath = `images/${image.name}`;
        const img = await storage.ref(uploadPath).put(image);
        const downloadURL = await img.ref.getDownloadURL();

        const createdAt = timestamp.fromDate(new Date());

        const addedDocument = await ref.add({
          ...doc,
          createdAt,
          imageURL: downloadURL,
        });
        dispatchIfNotCancelled({
          type: "ADDED_DOCUMENT",
          payload: addedDocument,
        });
      } catch (err: any) {
        dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
      }
    } else {
      try {
        const createdAt = timestamp.fromDate(new Date());

        const addedDocument = await ref.add({
          ...doc,
          createdAt,
        });
        dispatchIfNotCancelled({
          type: "ADDED_DOCUMENT",
          payload: addedDocument,
        });
      } catch (err: any) {
        dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
      }
    }
  };

  // delete a document
  const deleteDocument = async (id: string) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "Could not delete" });
    }
  };

  // update documents
  const updateDocument = async (id: string, updates: any) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const updatedDocument = await ref.doc(id).update(updates);
      dispatchIfNotCancelled({
        type: "UPDATED_DOCUMENT",
        payload: updatedDocument,
      });
      return updatedDocument;
    } catch (err: any) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
      return null;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
