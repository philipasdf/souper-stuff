import {Component, OnInit} from '@angular/core';
import {SouperAuthService} from '../../services/auth/souper-auth.service';

@Component({
  selector: 'app-souper-pages',
  templateUrl: './souper-pages.component.html',
  styleUrls: ['./souper-pages.component.css']
})
export class SouperPagesComponent implements OnInit {

  constructor(private authService: SouperAuthService) {
  }

  ngOnInit() {
  }

  onSignOut() {
    this.authService.signOut();
  }
}
