import { DocumentData } from "firebase/firestore";
import { IUser } from "./user.d";
import { Dispatch, SetStateAction } from "react";

export interface IListItemProps {
  displayName?: string;
  user?: IUser;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  profile?: string;
  isHost?: boolean;
  type?: "ADD" | "USER" | "READONLY";
  handleAdd?: (user: IUser) => void;
  onClick?: () => void;
}

export interface IChatRoom {
  chatRoomName: string;
  host?: IUser;
  lastMessage: string;
  lastTimeStamp: number;
  members: IUser[];
  type: "ONE" | "MULTIPLE";
}

export interface IChatRoomCard extends IChatRoom {
  onClick: () => void;
}

export interface IMessageProps {
  message: string;
  displayName: string;
  createdAt: string;
  profile?: string;
  isMine?: boolean;
}
