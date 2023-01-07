import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { IListItemProps } from "../../types/chat";
import { cls } from "../../utils/cls";

export default function UserCard({
  user,
  handleAdd,
  type = "USER",
}: IListItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClick = () => {
    setIsOpen((props) => !props);
  };

  const handleChatting = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const chatroomRef = collection(db, "chatroom");
        const userData = {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
        };

        const response = await setDoc(doc(chatroomRef), {
          members: [userData, user],
        });

        console.log(response);
      }
    });
  };
  return (
    <div
      className={cls(
        `relative`,
        type === "ADD" ? "flex items-center justify-between px-2" : ""
      )}
    >
      <div
        onClick={() => onClick()}
        className="hover:cursor-pointer flex space-x-3 items-center p-3 hover:bg-blue-300"
      >
        <div className="w-10 h-10 rounded-full bg-gray-400" />
        <div>{user?.displayName}</div>
      </div>
      {type === "USER" ? (
        <>
          {isOpen ? (
            <div
              onClick={handleChatting}
              className="absolute right-2 bottom-5 cursor-pointer"
            >
              <div className="w-20 h-6 bg-blue-200 text-sm text-center rounded-md">
                1:1 채팅하기
              </div>
            </div>
          ) : null}
        </>
      ) : null}
      {type === "ADD" ? (
        <div onClick={() => handleAdd(user)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      ) : null}
    </div>
  );
}
