import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ListItem from "../../components/chatlist/item";
import Layout from "../../components/layout";
import { db } from "../../firebase";
import { useRecoilValue } from "recoil";
import userState from "../../atoms/user";

export default function Chatting() {
  const [chatroom, setChatroom] = useState<DocumentData>();
  const [roomName, setRoomName] = useState<string>("");
  const router = useRouter();
  const currentUser = useRecoilValue(userState);
  useEffect(() => {
    async function getChatroomData() {
      const docRef = doc(db, "chatrooms", router.query.id as string);
      const chatroomInfo = await getDoc(docRef);

      if (chatroomInfo.exists()) {
        setChatroom(chatroomInfo.data());

        const string = chatroomInfo
          .data()
          .chatRoomName.split(",")
          .filter((name) => name !== currentUser.displayName)
          .join("");
        setRoomName(string);
      } else {
        console.log("No data");
      }
    }
    getChatroomData();
  }, []);
  return (
    <>
      <Layout text={roomName} hasTabBar>
        <div className="p-5">
          <section>
            <div className="font-bold text-lg">Chatting</div>
            <div className=" divide-y-2">
              {[1, 2, 3, 4, 5].map((el) => (
                <ListItem key={el} displayName={String(el)} />
              ))}
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
