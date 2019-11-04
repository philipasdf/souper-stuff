import { Component, OnInit } from '@angular/core';
import {AuthProvider, Theme} from 'ngx-auth-firebaseui';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  providers = AuthProvider.Google;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLoginSuccessful($event) {
    console.log($event);
    this.router.navigate(['main']);
  }
}
