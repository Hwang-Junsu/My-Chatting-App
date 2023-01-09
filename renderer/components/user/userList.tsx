import { useState } from "react";
import { IModalProps } from "../../types/modal";
import Modal from "../modal";
import { v4 as uuid } from "uuid";
import UserCard from "./userCard";
import useUserList from "../../hooks/useUserList";
import Button from "../button";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import userState from "../../atoms/user";
import { IUser } from "../../types/user";
import { useRouter } from "next/router";

export default function UserList({ isOpen, setIsOpen }: IModalProps) {
  const { userList } = useUserList();
  const router = useRouter();
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
    if (addList.length === 0) return;
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const chatroomRef = collection(db, "chatrooms");
        const userData = {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
        };

        const existChatroom = query(
          chatroomRef,
          where("members", "in", [[...addList, userData]])
        );
        const chatroomArr = [];
        const snapShot = await getDocs(existChatroom);
        snapShot.forEach((data) =>
          chatroomArr.push({ data: data.data(), id: data.id })
        );

        if (chatroomArr.length > 0) {
          router.push(`/chat/${chatroomArr[0].id}`);
          return;
        }

        const chatRoomNameString =
          currentUser.displayName +
          "," +
          addList.map((user) => user.displayName).join(",");

        const { id } = await addDoc(chatroomRef, {
          chatRoomName: chatRoomNameString,
          members: [...addList, userData],
          lastMessage: "",
          lastTimeStamp: Date.now(),
          type: "MULTIPLE",
          host: userData,
        });

        const messagesRef = collection(db, `messages-${id}`);
        await addDoc(messagesRef, {
          message: "",
          createdAt: "",
          displayName: "",
        });
        router.push(`/chat/${id}`);
      }
    });
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="mb-2 font-bold tracking-tighter text-center ">
        그룹채팅 만들기
      </div>
      <div>
        <ul className="flex flex-wrap items-center w-full mb-1 space-x-2 list-none">
          {addList.map((user) => (
            <li
              className="flex items-center justify-between px-3 py-1 mt-1 text-[11px] bg-blue-300 rounded-lg"
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
        <section className="h-[400px] pb-2 overflow-scroll border-t-2 divide-y-2 scrollbar-none">
          {userList.map((user) => {
            if (currentUser.uid === user.uid) return;
            return (
              <UserCard
                key={user.uid}
                user={user}
                type="ADD"
                handleAdd={handleAdd}
              />
            );
          })}
        </section>
      </div>
      <div className="h-12">
        <div className="absolute bottom-2 inset-x-3">
          <Button onClick={handleChatting} text="채팅하기" />
        </div>
      </div>
    </Modal>
  );
}