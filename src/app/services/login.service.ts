import {Injectable} from '@angular/core';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  activeUser: User;

  constructor() {
    this.activeUser = new User()
  }

  checkAuth(): boolean {
    let storeData = localStorage.getItem('activeUser');
    if (storeData) {
      this.activeUser = JSON.parse(storeData);
      return this.activeUser.isLoggedIn;
    } else {
      return false;
    }
  }

  login(user: User): boolean {
    if (user.userName === 'admin' && user.password === '123456') {
      user.isLoggedIn = true;
      this.activeUser = user;
      window.localStorage.setItem('activeUser', JSON.stringify(user))
      return true
    } else {
      return false;
    }
  }

  logout(user: User): string {
    user.isLoggedIn = false;
    this.activeUser = user
    window.localStorage.setItem('activeUser', JSON.stringify(user))
    return 'Başarıyla Çıkış Yapıldı!'
  }

  getActiveUser(): User {
    return this.activeUser!
  }
}
