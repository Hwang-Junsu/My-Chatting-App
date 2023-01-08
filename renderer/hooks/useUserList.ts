import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function useUserList() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function userData() {
      await getDocs(collection(db, "users")).then((data) =>
        data.forEach((doc) => {
          setUserList((props) => [
            ...props,
            {
              ...doc.data(),
            },
          ]);
        })
      );
    }
    userData().then(() => setIsLoading(true));
  }, []);

  return { userList, isLoading };
}
