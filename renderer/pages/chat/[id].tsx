import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "@firebase";
import ChatLog from "@components/chat/chatLog";
import ChatInput from "@components/chat/chatInput";
import UserListModal from "@components/chat/userListModal";
import Layout from "@components/common/layout";
import useUser from "@hooks/useUser";

export default function Chatting() {
  const [chatroom, setChatroom] = useState<DocumentData>();
  const [roomName, setRoomName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const [currentUser] = useUser();
  useEffect(() => {
    async function getChatroomData() {
      const docRef = doc(db, "chatrooms", String(router.query.id));
      const chatroomInfo = await getDoc(docRef);

      if (chatroomInfo.exists()) {
        setChatroom(chatroomInfo.data());

        if (chatroomInfo.data().type === "ONE") {
          const string = chatroomInfo
            .data()
            .members.filter(
              (user) => user.uid !== currentUser?.uid
            )[0].displayName;
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
        seoTitle={roomName}
        text={roomName}
        hasTabBar
        canGoBack
        headerText={chatroom && chatroom.type === "ONE" ? true : false}
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
