import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";

export const useCollection = (
  collection: string,
  _query?: any[] | null,
  _orderBy?: any[] | null
) => {
  const [documents, setDocuments] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const query = useRef<any[] | undefined>(_query).current;
  const orderBy = useRef<any[] | undefined>(_orderBy).current;

  useEffect(() => {
    setIsPending(true);
    let ref: any = db.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsub = ref.onSnapshot(
      (snapshot: any) => {
        let results: any[] = [];
        snapshot.docs.forEach((doc: any) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setIsPending(false);
        setDocuments(results);
        setError(null);
      },
      (err: any) => {
        setIsPending(false);
        console.log(err.message);
        setError("Could not fetch transaction");
      }
    );

    return () => unsub();
  }, [collection, query, orderBy]);

  return { documents, error, isPending };
};
