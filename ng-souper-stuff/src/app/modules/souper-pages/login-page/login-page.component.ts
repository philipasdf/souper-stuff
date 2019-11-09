import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SouperAuthService} from '../../../services/auth/souper-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router, private authService: SouperAuthService ) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user != null) {
        this.router.navigate(['main/list']);
      }
    });
  }

  onSignIn() {
    this.authService.googleSignin();
  }
}
