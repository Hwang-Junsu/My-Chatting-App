import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { db } from "../../firebase";
import { useRecoilValue } from "recoil";
import userState from "../../atoms/user";
import ChatLog from "../../components/chat/chatLog";
import ChatInput from "../../components/chat/chatInput";
import { IUserState } from "../../types/user";
import UserListModal from "../../components/chat/userListModal";

export default function Chatting() {
  const [chatroom, setChatroom] = useState<DocumentData>();
  const [roomName, setRoomName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const currentUser = useRecoilValue<IUserState>(userState);
  useEffect(() => {
    async function getChatroomData() {
      const docRef = doc(db, "chatrooms", router.query.id as string);
      const chatroomInfo = await getDoc(docRef);

      if (chatroomInfo.exists()) {
        setChatroom(chatroomInfo.data());

        if (chatroomInfo.data().type === "ONE") {
          const string = chatroomInfo
            .data()
            .chatRoomName.split(",")
            .filter((name) => name !== currentUser.displayName)
            .join("");
          setRoomName(string);
        } else {
          setRoomName(chatroomInfo.data().chatRoomName);
        }
      } else {
        console.log("No data");
      }
    }
    getChatroomData();
  }, [chatroom]);
  return (
    <>
      <Layout
        text={roomName}
        hasTabBar
        canGoBack
        headerText={chatroom?.type === "ONE" ? true : false}
        onClick={() => setIsOpen((props) => !props)}
      >
        <div className="p-5 overflow-auto pb-28 scrollbar-none">
          <ChatLog
            chatroomId={String(router.query.id)}
            currentUser={currentUser}
          />
        </div>
        <ChatInput
          chatroomId={String(router.query.id)}
          currentUser={currentUser}
        />
      </Layout>
      {isOpen ? (
        <UserListModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          members={chatroom.members}
          hostId={chatroom.host.uid}
        />
      ) : null}
    </>
  );
}
