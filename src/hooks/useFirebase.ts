import { useState, useEffect } from "react";
import { collection, getDocs, DocumentSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import e from "express";

type FirebaseData = {
  id: string;
  // Add type for the rest of the data properties here
};

type UseFirebaseDataProps = {
  collectionName: string;
};

type UseFirebaseDataReturn = {
  data: FirebaseData[];
  loading: boolean;
  error: string;
};

/**
 * Fetches data from a Firebase collection.
 *
 * @param {string} collectionName - The collection name.
 * @returns {Promise<{ data: FirebaseData[]; loading: boolean; error: any }>} The fetched data and loading state.
 */
export const useFirebaseData = async (
  collectionName: string
): Promise<{ data: FirebaseData[]; loading: boolean; error: any }> => {
  const [data, setData] = useState<FirebaseData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = querySnapshot.docs.map((doc: DocumentSnapshot) => ({
          id: doc.id,
          // Assign the rest of the data properties here
        }));
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName]);

  return { data, loading, error };
};
