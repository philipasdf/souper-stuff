import {Component, OnInit} from '@angular/core';
import {SouperAuthService} from '../../services/auth/souper-auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-souper-pages',
  templateUrl: './souper-pages.component.html',
  styleUrls: ['./souper-pages.component.css']
})
export class SouperPagesComponent implements OnInit {

  constructor(private authService: SouperAuthService, private router: Router) {
  }

  ngOnInit() {
  }

  get user() {
    return this.authService.user$;
  }

  onSignOut() {
    this.authService.signOut();
  }

  onClickLogo() {
    this.router.navigate(['main/list']);
  }
}
