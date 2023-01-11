import {
  addDoc,
  collection,
  doc,
  DocumentData,
  updateDoc,
} from "firebase/firestore";
import { useRef } from "react";
import { db } from "@firebase";

export default function ChatInput({
  chatroomId,
  currentUser,
}: {
  chatroomId: string;
  currentUser: DocumentData;
}) {
  // const [chatMessage, setChatMessage] = useState("");
  const chatMessage = useRef<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: React.MutableRefObject<string>
  ) => {
    const value = e.target.value;
    type.current = value;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, `messages-${chatroomId}`), {
      displayName: currentUser.displayName,
      uid: currentUser.uid,
      message: chatMessage.current,
      createdAt: Date.now(),
    });
    await updateDoc(doc(db, "chatrooms", chatroomId), {
      lastMessage: chatMessage.current,
      lastTimeStamp: Date.now(),
    });

    chatMessage.current = "";
    inputRef.current.value = "";
  };

  return (
    <div className="fixed inset-x-2 bottom-20">
      <form
        className="flex items-center w-full p-3 space-x-2 bg-white"
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="메시지를 입력하세요."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e, chatMessage)
          }
          className="w-full px-3 py-2 placeholder-gray-400 bg-white border border-gray-500 rounded-md shadow-lg appearance-none outline-blue-500 focus:outline-2 focus:ring-blue-500 focus:border-blue-500"
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
