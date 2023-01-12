import { ipcRenderer } from "electron";
import { onAuthStateChanged } from "firebase/auth";
import { IModalProps } from "types/modal";
import Button from "../common/button";
import { auth, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import Modal from "../common/modal";
import Input from "../common/input";

export default function UserEditModal({ isOpen, setIsOpen }: IModalProps) {
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const stateMessage = e.target[1].value;
    if (displayName.length > 8 || displayName.length === 0) {
      ipcRenderer.invoke("showError", "닉네임은 8자 이내로 작성해주세요.");
      return;
    }
    if (stateMessage.length > 20 || stateMessage.length === 0) {
      ipcRenderer.invoke(
        "showError",
        "상태 메시지는 20자 이내로 작성해주세요."
      );
      return;
    }

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user?.uid);
        await updateDoc(userRef, {
          stateMessage,
          displayName,
        });
      }
    });

    ipcRenderer.invoke("showDialog", "프로필이 수정되었습니다.");
    setIsOpen((props: boolean) => !props);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} height={600}>
      <div className="space-y-2">
        <div className="text-lg font-bold text-center">프로필 수정하기</div>
        <form className="flex flex-col space-y-3" onSubmit={handleEdit}>
          <Input type="text" placeholder="닉네임(8자 이내)." />
          <Input type="text" placeholder="상태 메시지 설정(20자 이내)." />
          <Button type="submit" text="수정하기" />
        </form>
      </div>
    </Modal>
  );
}
