import {Component, Input, OnInit} from '@angular/core';
import {ImgService} from '../../../../services/images/img.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-calendar-thumbnail',
  templateUrl: './calendar-thumbnail.component.html',
  styleUrls: ['./calendar-thumbnail.component.css']
})
export class CalendarThumbnailComponent implements OnInit {

  @Input() imgPath;

  imgUrl: Observable<string>;

  constructor(private imgService: ImgService) { }

  ngOnInit() {
    this.imgUrl = this.imgService.getImgSize200(this.imgPath);
  }

}
