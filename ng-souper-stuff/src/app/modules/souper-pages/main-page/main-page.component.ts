import { Component, OnInit } from '@angular/core';
import {StuffService} from '../../../services/stuff/stuff.service';
import {SouperAuthService} from '../../../services/auth/souper-auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private authService: SouperAuthService,
              private stuffService: StuffService,
              private router: Router) {
  }

  ngOnInit() {
  }

  get stuffs() {
    return this.stuffService.stuffs;
  }

  onClickItem(stuffId: string) {
    // TODO  implement expansion panel
  }

  onAdd() {
    this.router.navigate(['add']);
  }
}
