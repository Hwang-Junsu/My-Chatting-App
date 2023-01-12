import { auth, db } from "@firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createContext } from "react";

const UserContext = createContext(null);

interface Props {
  children: JSX.Element | JSX.Element[];
}

const UserProvider = (props: Props) => {
  const [user, setUser] = useState<DocumentData>();
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.email);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
          setUser(snapshot.data());
        }
      } else {
        router.replace("/login");
      }
    });
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
