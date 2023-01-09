import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { db } from "../../firebase";
import { IModalProps } from "../../types/modal";
import Button from "../button";
import Input from "../input";
import Modal from "../modal";

export default function ChatRoomEditModal({ isOpen, setIsOpen }: IModalProps) {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const handleEdit = async (e) => {
    e.preventDefault();

    const chatroomRef = doc(db, "chatrooms", String(router.query.id));
    await updateDoc(chatroomRef, {
      chatRoomName: input,
    });
    setIsOpen((props: boolean) => !props);
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} height={400}>
      <div className="space-y-2">
        <div className="font-bold text-center">채팅방 이름 수정하기</div>
        <form className="space-y-2" onSubmit={handleEdit}>
          <Input
            type="text"
            placeholder="채팅방 이름을 수정하세요."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" text="수정하기" />
        </form>
      </div>
    </Modal>
  );
}
