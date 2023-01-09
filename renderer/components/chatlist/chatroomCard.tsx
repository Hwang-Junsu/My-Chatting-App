import { useRecoilValue } from "recoil";
import userState from "../../atoms/user";
import { IChatRoomCard } from "../../types/chat";

export default function ChatroomCard({
  chatroomName,
  onClick,
  type,
  members,
}: IChatRoomCard) {
  const currentUser = useRecoilValue(userState);
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-3 space-x-3 hover:cursor-pointer hover:bg-blue-300"
    >
      <div className="flex items-center space-x-2 truncate">
        <div>
          <div className="w-10 h-10 bg-gray-400 rounded-full" />
        </div>
        <div className="truncate">
          {type === "ONE"
            ? chatroomName
                .split(",")
                .filter((name) => name !== currentUser.displayName)
                .join()
            : chatroomName}
        </div>
      </div>
      {type === "MULTIPLE" ? (
        <div className="flex items-center justify-center px-2 py-1 bg-blue-300 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3 mr-1"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm">{members}</p>
        </div>
      ) : (
        <div className="px-2 py-1 text-sm bg-blue-300 rounded-md">1:1 Chat</div>
      )}
    </div>
  );
}
