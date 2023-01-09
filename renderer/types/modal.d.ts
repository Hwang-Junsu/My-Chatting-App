import { IUser } from "./user";
export interface IRootModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  height?: number;
}

export interface IModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IUserListModalProps extends IModalProps {
  members: IUser[];
  hostId: string;
}
