export class User {
  userName: string;
  password: string;
  isLoggedIn: boolean;

  constructor(userName: string, password: string, isLoggedIn: boolean) {
    this.userName = userName;
    this.password = password;
    this.isLoggedIn = isLoggedIn;
  }
}
