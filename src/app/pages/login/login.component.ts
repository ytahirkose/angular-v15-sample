import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";

declare let alertify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService) {
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      isLoggedIn: [false]
    });
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      if (this.loginService.login(this.loginForm.value)) {
        alertify.success('Giriş Başarılı')
        this.router.navigate(['/campaigns']);
      } else {
        alertify.error('Kullanıcı Adı veya Şifre Hatalı')
      }
    } else {
      if (this.loginForm.value.password.length < 6) {
        alertify.error('Şifreniz En Az 6 Karakter Olmalıdır!')
      }
    }
  }

}
