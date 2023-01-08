import { useState } from "react";
import { IModalProps } from "../../types/common";
import Modal from "../modal";
import { v4 as uuid } from "uuid";
import UserCard from "./userCard";
import useUserList from "../../hooks/useUserList";
import { IUser } from "../../types/chat";
import Button from "../button";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import userState from "../../atoms/user";

export default function UserList({ isOpen, setIsOpen }: IModalProps) {
  const { userList } = useUserList();
  const currentUser = useRecoilValue(userState);
  const [addList, setAddList] = useState<IUser[]>([]);
  const handleDelete = (selectedUser) => {
    setAddList((props) =>
      props.filter((user) => user.uid !== selectedUser.uid)
    );
  };
  const handleAdd = (user: IUser) => {
    if (addList.includes(user)) return;
    setAddList((props) => [user, ...props]);
  };
  const handleChatting = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const chatroomRef = collection(db, "chatrooms");
        const userData = {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
        };

        const chatRoomNameString = currentUser.displayName + ",";
        addList.map((user) => user.displayName).join(",");

        const { id } = await addDoc(chatroomRef, {
          chatRoomName: chatRoomNameString,
          members: [...addList, userData],
          type: "MULTIPLE",
        });

        const membersRef = collection(db, `members-${id}`);
        const messagesRef = collection(db, `messages-${id}`);
        await addDoc(membersRef, {
          members: [...addList, userData],
        });
        await addDoc(messagesRef, {
          message: "",
          createdAt: "",
          displayName: "",
        });
      }
    });
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className=" tracking-tighter font-bold text-center mb-2">
        채팅 유저 추가하기
      </div>
      <section className="border-t-2 divide-y-2 h-[350px] overflow-auto scrollbar-none pb-2">
        {userList.map((user) => {
          if (currentUser.uid === user.uid) return;
          return (
            <UserCard
              user={user}
              type="ADD"
              handleAdd={handleAdd}
              key={user.uid}
            />
          );
        })}
      </section>
      <ul className="flex h-12 flex-wrap items-center space-x-4 p-1 list-none overflow-auto scrollbar-none">
        {addList.map((user) => (
          <li
            className="flex items-center justify-between px-3 py-1 mt-2 text-sm rounded-lg bg-blue-300"
            key={uuid()}
          >
            <span>{user.displayName}</span>
            <span onClick={() => handleDelete(user)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 ml-2 text-center"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </li>
        ))}
      </ul>
      <div className="h-10">
        <Button onClick={handleChatting} text="채팅하기" />
      </div>
    </Modal>
  );
}
