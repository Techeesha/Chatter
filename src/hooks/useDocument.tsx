import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useDocument = (collection: string, id: string) => {
  const [document, setDocument] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  // realtime data for documents
  useEffect(() => {
    const ref = db.collection(collection).doc(id);

    const unsub = ref.onSnapshot(
      (snapshot) => {
        setIsPending(true);
        if (snapshot.exists) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
          setIsPending(false);
        } else {
          setError("No such document exists");
          setIsPending(false);
        }
      },
      (err) => {
        console.log(err.message);
        setIsPending(false);
        setError("Failed to get document");
      }
    );

    return () => unsub();
  }, [collection, id]);

  return { document, error, isPending };
};
