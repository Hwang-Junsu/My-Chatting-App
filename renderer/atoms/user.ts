import { atom } from "recoil";
import { IUserState } from "../types/user";

const userState = atom<IUserState>({
  key: "user",
  default: {
    uid: "",
    email: "",
    displayName: "",
    profile: "",
    isLoggedIn: false,
  },
});

export default userState;
