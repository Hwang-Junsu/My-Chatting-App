import Image from "next/image";
import basicImage from "../../public/images/chatroom.png";

export default function ChatroomImage() {
  return (
    <div className="relative w-10 h-10 overflow-hidden bg-blue-400 border-gray-700 rounded-full">
      <Image layout="fill" src={basicImage} />
    </div>
  );
}
