export interface IUser {
  displayName: string;
  uid: string;
  email: string;
  profile?: string;
}

export interface IUserState extends IUser {
  isLoggedIn: boolean;
}
