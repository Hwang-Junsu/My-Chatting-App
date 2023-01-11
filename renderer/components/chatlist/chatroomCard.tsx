import { IChatRoomCard } from "types/chat";
import useUser from "@hooks/useUser";

export default function ChatroomCard({
  chatRoomName,
  lastMessage,
  lastTimeStamp,
  members,
  type,
  onClick,
}: IChatRoomCard) {
  const [currentUser] = useUser();

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-3 space-x-3 hover:cursor-pointer hover:bg-blue-300"
    >
      <div className="flex items-center w-full space-x-2 truncate">
        <div>
          <div className="w-10 h-10 bg-gray-400 rounded-full" />
        </div>
        <div className="w-full truncate">
          <div className="flex justify-between space-x-1 truncate">
            <div className="truncate">
              {type === "ONE"
                ? members.filter((user) => user.uid !== currentUser?.uid)[0]
                    .displayName
                : chatRoomName}
            </div>
            <div>
              {type === "MULTIPLE" ? (
                <div className="flex items-center justify-center px-[3px] py-[2px] bg-blue-300 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-2 h-2 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-[12px]">{members.length}</p>
                </div>
              ) : (
                <div className="px-[3px] py-[2px] text-[12px] bg-blue-300 rounded-md">
                  1:1 Chat
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center text-[12px] justify-between text-gray-500 truncate">
            <p className="truncate">
              {lastMessage === "" ? "대화내용이 없습니다!" : lastMessage}
            </p>
            <p>{new Date(lastTimeStamp).toLocaleTimeString("ko-KR")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
