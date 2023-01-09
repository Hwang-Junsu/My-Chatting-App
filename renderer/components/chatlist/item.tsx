import { IListItemProps } from "../../types/chat";

export default function ListItem({ displayName, onClick }: IListItemProps) {
  return (
    <div
      onClick={onClick}
      className="hover:cursor-pointer flex space-x-3 items-center p-3 hover:bg-blue-300"
    >
      <div className="w-10 h-10 rounded-full bg-gray-400" />
      <div>{displayName}</div>
    </div>
  );
}
