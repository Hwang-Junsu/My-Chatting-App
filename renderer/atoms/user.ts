import { atom } from "recoil";

const userState = atom({
  key: "user",
  default: {
    uid: "",
    email: "",
    displayName: "",
    isLoggedIn: false,
  },
});

export default userState;
