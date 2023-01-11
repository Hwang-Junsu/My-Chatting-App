import { IListItemProps } from "../../types/chat";

export default function ListItem({ displayName, onClick }: IListItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center p-3 space-x-3 hover:cursor-pointer hover:bg-blue-300"
    >
      <div className="w-10 h-10 bg-gray-400 rounded-full" />
      <div>{displayName}</div>
    </div>
  );
}
