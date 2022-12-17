import {Component} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private loginService: LoginService, private router: Router) {
  }

  logout() {
    this.loginService.logout(this.loginService.getActiveUser());
    this.router.navigate(['/login']);
  }

}
