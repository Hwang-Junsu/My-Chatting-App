import { IMessageProps } from "../../types/chat";
import { cls } from "../../utils/cls";

export default function Message({
  isMine,
  displayName,
  createdAt,
  message,
}: IMessageProps) {
  return (
    <div
      className={cls(
        "flex items-center space-x-2 w-full",
        isMine ? "flex-row-reverse space-x-reverse" : ""
      )}
    >
      {isMine ? null : (
        <div className="relative w-8 h-8 overflow-hidden bg-gray-400 rounded-full" />
      )}
      <div>
        {isMine ? null : <div className="text-sm font-bold">{displayName}</div>}
        <div
          className={cls(
            "px-3 py-1 rounded-lg",
            isMine ? " bg-orange-300" : "bg-blue-200"
          )}
        >
          {message}
        </div>
      </div>
      <div className="pt-5 whitespace-nowrap">
        <div className="text-[10px] text-gray-800">
          {new Date(createdAt).toLocaleDateString("ko-KR")}
        </div>
        <div className="text-[10px] text-gray-800">
          {new Date(createdAt).toLocaleTimeString("ko-KR")}
        </div>
      </div>
    </div>
  );
}
