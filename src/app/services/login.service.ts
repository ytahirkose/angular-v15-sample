import {Injectable} from '@angular/core';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // @ts-ignore
  activeUser: User;

  constructor() {
  }

  checkAuth(): boolean {
    let user: User;
    if (window.localStorage.getItem('activeUser')) {
      user = JSON.parse(window.localStorage.getItem('activeUser') || '');
      this.activeUser = user;
      return user.isLoggedIn;
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
    return this.activeUser
  }
}
