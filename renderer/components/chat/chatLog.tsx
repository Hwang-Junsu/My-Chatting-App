import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  collection,
  DocumentData,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Scrollbars } from "react-custom-scrollbars";
import { db } from "@firebase";
import Message from "./message";

export default function ChatLog({
  chatroomId,
  currentUser,
}: {
  chatroomId: string;
  currentUser: DocumentData;
}) {
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const scrollbarRef = useRef<Scrollbars>(null);

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
  useEffect(() => {
    scrollbarRef.current?.scrollToBottom();
  }, [messages]);
  useEffect(() => {
    setTimeout(() => {
      scrollbarRef.current?.scrollToBottom();
    }, 150);
  }, []);

  return (
    <section
      id="chatting"
      className="h-[70vh] overflow-auto scrollbar-none pb-6"
    >
      <Scrollbars ref={scrollbarRef} autoHide>
        <div className="space-y-3">
          {currentUser &&
            messages.map((message) => {
              if (message.message === "") return;
              return (
                <Message
                  key={uuid()}
                  message={message.message}
                  displayName={message.displayName}
                  createdAt={message.createdAt}
                  isMine={currentUser.uid === message.uid}
                />
              );
            })}
        </div>
      </Scrollbars>
    </section>
  );
}
