import {Component, OnInit} from '@angular/core';
import {SouperAuthService} from '../../services/auth/souper-auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-souper-pages',
  templateUrl: './souper-pages.component.html',
  styleUrls: ['./souper-pages.component.css']
})
export class SouperPagesComponent implements OnInit {

  readonly nav = [
    { title: 'Souper Stuff', url: '/main/list' },
    { title: 'Souper Calendar', url: '/history/calendar' }
  ];
  currNavUrl = '';
  currNav;

  readonly maxIconNumber = 3;
  randomIcon = 'assets/logo/1.jpg';

  constructor(private authService: SouperAuthService, private router: Router) {
  }

  ngOnInit() {
    this.currNavUrl = this.router.url;
    this.currNav = this.nav.find(n => n.url === this.currNavUrl);

    const randomNumber = Math.floor(Math.random() * this.maxIconNumber + 1);
    this.randomIcon = `assets/logo/${randomNumber}.JPG`;
  }

  get user() {
    return this.authService.user$;
  }

  onSignOut() {
    this.authService.signOut();
  }

  onNavigate(url) {
    this.router.navigate([url]);
  }
}
