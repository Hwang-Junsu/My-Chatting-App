import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@firebase";

export default function useUser() {
  const [currentUser, setCurrentUser] = useState<DocumentData>();
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.email);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
          setCurrentUser(snapshot.data());
        }
      } else {
        router.replace("/login");
      }
    });
  }, []);

  return [currentUser, setCurrentUser];
}
