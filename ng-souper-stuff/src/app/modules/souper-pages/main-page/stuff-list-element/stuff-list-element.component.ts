import {Component, Input, OnInit} from '@angular/core';
import {Stuff} from '../../../../services/stuff/stuff';
import {animate, style, transition, trigger} from '@angular/animations';
import {StuffService} from '../../../../services/stuff/stuff.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {GroupService} from '../../../../services/group/group.service';
import {ImgService} from '../../../../services/images/img.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stuff-list-element',
  templateUrl: './stuff-list-element.component.html',
  styleUrls: ['./stuff-list-element.component.css'],
  animations: [
    trigger('expandAnimation', [
      transition(':enter', [
        style({ opacity: 0, height: '15px' }),
        animate('350ms', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('250ms', style({opacity: 0, height: '0px'}))
      ])
    ])
  ]
})
export class StuffListElementComponent implements OnInit {

  @Input() stuff: Stuff;

  thumbnailUrl: Observable<string>;
  expandView = false;
  sliderImages = [];

  selectedTags$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(private router: Router,
              private stuffService: StuffService,
              private groupService: GroupService,
              private imgService: ImgService) { }

  ngOnInit() {
    this.initThumbnail();
    const tagArray: string[] = [];
    for (const key in this.stuff.tags) {
      tagArray.push(key);
    }
    this.selectedTags$.next(tagArray);

    // sort images
    if (this.stuff.images) {
      this.sliderImages = this.stuff.images;
    }
  }

  getExpandIconName() {
    return this.expandView ? 'expand_less' : 'expand_more';
  }

  onToggleExpandView() {
    this.expandView = !this.expandView;
  }

  onEdit() {
    this.router.navigate([`main/edit/${this.stuff.id}`]);
  }

  private initThumbnail() {
    console.log(this.stuff.images);
    if (this.stuff.images && this.stuff.images.length > 0) {
      this.thumbnailUrl = this.imgService.getImgSize200(this.stuff.images[0]);
    }
  }
}
