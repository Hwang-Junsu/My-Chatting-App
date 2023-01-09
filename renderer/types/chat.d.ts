import { Dispatch, SetStateAction } from "react";

export interface IListItemProps {
  displayName?: string;
  user?: IUser;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  profile?: string;
  type?: "ADD" | "USER";
  handleAdd?: (user: IUser) => void;
  onClick?: () => void;
}

export interface IChatRoomCard {
  chatroomName: string;
  type: string;
  members?: number;
  onClick: () => void;
}

export interface IMessageProps {
  message: string;
  displayName: string;
  createdAt: string;
  profile?: string;
  isMine?: boolean;
}
