import { Component, OnInit } from '@angular/core';
import {HistoryService} from '../../../services/history/history.service';
import {History} from '../../../services/history/history';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent implements OnInit {

  newHistory: History = {
    shortNote: '',
    date: new Date()
  };

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
  }

  get history() {
    return this.historyService.history$;
  }

  onAddHistory() {
    console.log(this.history);
    console.log(this.newHistory);
  }
}
