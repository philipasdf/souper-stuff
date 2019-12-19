import {Component, OnInit} from '@angular/core';
import {SouperAuthService} from '../../services/auth/souper-auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-souper-pages',
  templateUrl: './souper-pages.component.html',
  styleUrls: ['./souper-pages.component.css']
})
export class SouperPagesComponent implements OnInit {

  readonly maxIconNumber = 3;
  randomIcon = 'assets/logo/1.jpg';

  constructor(private authService: SouperAuthService, private router: Router) {
  }

  ngOnInit() {
    const randomNumber = Math.floor(Math.random() * this.maxIconNumber + 1);
    this.randomIcon = `assets/logo/${randomNumber}.JPG`;
  }

  get user() {
    return this.authService.user$;
  }

  onSignOut() {
    this.authService.signOut();
  }

  onNavigateToMain() {
    this.router.navigate(['main/list']);
  }
}
