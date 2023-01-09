import { useEffect, useState } from "react";
import UserList from "../../components/user/userList";
import Layout from "../../components/layout";
import { auth, db } from "../../firebase";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import ChatroomCard from "../../components/chatlist/chatroomCard";
import { onAuthStateChanged } from "firebase/auth";

export default function Chatting() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chatroomList, setChatroomList] = useState<DocumentData[]>([]);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const chatroomRef = query(
          collection(db, "chatrooms"),
          orderBy("lastTimeStamp", "desc"),
          where("members", "array-contains", {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
          })
        );
        onSnapshot(chatroomRef, (querySnapshot) => {
          setChatroomList(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });
      }
    });
  }, []);
  return (
    <>
      <Layout text="Chat">
        <div className="p-5 ">
          <section>
            <div className="mb-2 text-lg font-bold">Chat Rooms</div>
            <div className="divide-y-2 ">
              {chatroomList.map((chatroom) => (
                <ChatroomCard
                  key={chatroom.id}
                  chatRoomName={chatroom.chatRoomName}
                  lastMessage={chatroom.lastMessage}
                  lastTimeStamp={chatroom.lastTimeStamp}
                  members={chatroom.members}
                  type={chatroom.type}
                  onClick={() => router.push(`/chat/${chatroom.id}`)}
                />
              ))}
            </div>
          </section>
        </div>
        <span
          onClick={() => setIsOpen((props) => !props)}
          className="w-12 h-12 rounded-full bg-blue-400 absolute flex justify-center items-center bottom-[6rem] right-[1rem] hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </span>
      </Layout>
      {isOpen ? <UserList isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
    </>
  );
}
