import { db } from "../../firebase";
import {
  collection,
  DocumentData,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { IUserState } from "../../types/user";
import Message from "./message";
import { useEffect, useState } from "react";

export default function ChatLog({
  chatroomId,
  currentUser,
}: {
  chatroomId: string;
  currentUser: IUserState;
}) {
  const [messages, setMessages] = useState<DocumentData[]>([]);
  useEffect(() => {
    const messagesRef = query(
      collection(db, `messages-${chatroomId}`),
      orderBy("createdAt", "asc"),
      limit(1000)
    );
    onSnapshot(messagesRef, (querySnapshot) => {
      setMessages(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  return (
    <section
      id="chatting"
      className="h-[70vh] space-y-3 overflow-auto scrollbar-none pb-6"
    >
      {messages.map((message) => {
        if (message.message === "") return;
        return (
          <Message
            message={message.message}
            displayName={message.displayName}
            createdAt={message.createdAt}
            isMine={currentUser.uid === message.uid}
          />
        );
      })}
    </section>
  );
}
