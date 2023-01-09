import { useEffect, useState } from "react";
import ListItem from "../../components/chatlist/item";
import UserList from "../../components/user/userList";
import Layout from "../../components/layout";
import { db } from "../../firebase";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import userState from "../../atoms/user";
import ChatroomCard from "../../components/chatlist/chatroomCard";

export default function Chatting() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chatroomList, setChatroomList] = useState<DocumentData[]>([]);
  const router = useRouter();
  const { displayName, email, uid } = useRecoilValue(userState);

  useEffect(() => {
    async function getChatList() {
      const chatroomsRef = await getDocs(
        query(
          collection(db, "chatrooms"),
          where("members", "array-contains", {
            displayName,
            email,
            uid,
          })
        )
      );
      chatroomsRef.forEach((doc) => {
        setChatroomList((props) => [...props, { id: doc.id, ...doc.data() }]);
      });
    }
    getChatList();
  }, []);
  return (
    <>
      <Layout text="Chat">
        <div className="p-5">
          <section>
            <div className="mb-2 text-lg font-bold">Chat Rooms</div>
            <div className="divide-y-2 ">
              {chatroomList.map((chatroom) => (
                <ChatroomCard
                  key={chatroom.id}
                  chatroomName={chatroom.chatRoomName}
                  type={chatroom.type}
                  members={chatroom.members.length}
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
