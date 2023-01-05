import {Dispatch, SetStateAction} from "react";

export interface IUser {
    displayName: string;
    uid: string;
    email: string;
    profile?: string;
}

export interface IListItemProps {
    displayName?: string;
    user?: IUser;
    isOpen?: boolean;
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
    profile?: string;
    type?: "ADD" | "USER";
    handleAdd?: (user: IUser) => void;
}
