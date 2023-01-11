import { useRouter } from "next/router";
import React, { useState } from "react";
import { IModalProps } from "../../types/modal";
import Button from "../common/button";
import { ipcRenderer } from "electron";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import Modal from "../common/modal";
import Input from "../common/input";

export default function UserEditModal({ isOpen, setIsOpen }: IModalProps) {
  const [nickName, setNickname] = useState<string>("");
  const [stateMessage, setStateMessage] = useState<string>("");

  const handleEdit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      nickName.length > 7 ||
      nickName.length < 1 ||
      stateMessage.length > 20
    ) {
      ipcRenderer.invoke(
        "showError",
        "닉네임은 8자이내, 상태 메시지는 20자 이내로 작성해주세요."
      );
      return;
    }

    onAuthStateChanged(auth, async (user) => {
      const userRef = doc(db, "users", user.email);
      await updateDoc(userRef, {
        stateMessage,
        displayName: nickName,
      });
    });

    ipcRenderer.invoke("showDialog", "프로필이 수정되었습니다.");
    setIsOpen((props: boolean) => !props);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} height={600}>
      <div className="space-y-2">
        <div className="text-lg font-bold text-center">프로필 수정하기</div>
        <form className="flex flex-col space-y-3" onSubmit={handleEdit}>
          <Input
            type="text"
            placeholder="닉네임(8자 이내)."
            value={nickName}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Input
            type="text"
            placeholder="상태 메시지 설정(20자 이내)."
            value={stateMessage}
            onChange={(e) => setStateMessage(e.target.value)}
          />
          <Button type="submit" text="수정하기" />
        </form>
      </div>
    </Modal>
  );
}
