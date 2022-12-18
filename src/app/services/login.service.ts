import {Injectable} from '@angular/core';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  activeUser: User | undefined;

  constructor() {
  }

  checkAuth(): boolean {
    let user = JSON.parse(window.localStorage.getItem('activeUser') || '');
    if (user) {
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
    return this.activeUser!
  }
}
