export interface IUser {
  displayName: string;
  uid: string;
  email: string;
  stateMessage?: string;
  profile?: string;
}

export interface IUserState extends IUser {
  isLoggedIn: boolean;
}
