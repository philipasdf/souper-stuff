import {Component, OnInit} from '@angular/core';
import {StuffService} from '../../../services/stuff/stuff.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {GroupService} from '../../../services/group/group.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  selectedTags$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(private stuffService: StuffService,
              private groupService: GroupService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

    this.selectedTags$.subscribe(tags => this.stuffService.filterStuffsByTags(tags));
  }

  ngOnInit() {
  }

  get group() {
    return this.groupService.currentGroup$;
  }

  get stuffs() {
    return this.stuffService.stuffs$;
  }

  onAddStuff() {
    this.router.navigate(['main/add']);
  }

}
