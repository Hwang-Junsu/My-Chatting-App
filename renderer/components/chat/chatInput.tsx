import {
  addDoc,
  collection,
  doc,
  DocumentData,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "@firebase";
import Input from "../common/input";

export default function ChatInput({
  chatroomId,
  currentUser,
}: {
  chatroomId: string;
  currentUser: DocumentData;
}) {
  const [chatMessage, setChatMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, `messages-${chatroomId}`), {
      displayName: currentUser.displayName,
      uid: currentUser.uid,
      message: chatMessage,
      createdAt: Date.now(),
    });
    await updateDoc(doc(db, "chatrooms", chatroomId), {
      lastMessage: chatMessage,
      lastTimeStamp: Date.now(),
    });
    setChatMessage("");
    const chatting = document.getElementById("chatting");
    setTimeout(() => {
      chatting.scrollTop = chatting.scrollHeight;
    }, 300);
  };

  return (
    <div className="fixed inset-x-2 bottom-20">
      <form
        className="flex items-center w-full p-3 space-x-2 bg-white"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          placeholder="메시지를 입력하세요."
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
        />
        <div>
          <button className="p-2 bg-blue-400 rounded-md whitespace-nowrap">
            보내기
          </button>
        </div>
      </form>
    </div>
  );
}
