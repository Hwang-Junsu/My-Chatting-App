import { useState } from "react";
import { useRouter } from "next/router";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@firebase";
import Button from "../common/button";
import Input from "../common/input";
import Modal from "../common/modal";
import { IModalProps } from "types/modal";

export default function ChatRoomEditModal({ isOpen, setIsOpen }: IModalProps) {
  const router = useRouter();
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const chatRoomName = e.target[0].value;

    const chatroomRef = doc(db, "chatrooms", String(router.query.id));
    await updateDoc(chatroomRef, {
      chatRoomName,
    });
    setIsOpen((props: boolean) => !props);
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} height={400}>
      <div className="space-y-2">
        <div className="font-bold text-center">채팅방 이름 수정하기</div>
        <form className="space-y-2" onSubmit={handleEdit}>
          <Input type="text" placeholder="채팅방 이름을 수정하세요." />
          <Button type="submit" text="수정하기" />
        </form>
      </div>
    </Modal>
  );
}
