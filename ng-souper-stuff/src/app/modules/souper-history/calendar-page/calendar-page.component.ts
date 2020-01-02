import { Component, OnInit } from '@angular/core';
import {HistoryService} from '../../../services/history/history.service';
import {History} from '../../../services/history/history';
import {ImgService} from '../../../services/images/img.service';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent implements OnInit {

  readonly monthColors = [
    '#2c26d9', // jan
    '#882ed9', // feb
    '#d92f76', // mar
    '#d96d29', // apr
    '#47d90e', // may
    '#1cd99f', // jun
    '#d96d29', // jul
    '#d92f76', // aug
    '#2c26d9', // sep
    '#47d90e', // oct
    '#1fb1d9', // nov
    '#882ed9', // dez
  ];

  history: History[];
  filteredHistory: History[];
  dateFrom;
  dateTo;

  constructor(private historyService: HistoryService, private imgService: ImgService) { }

  ngOnInit() {
    const today = new Date();
    this.dateFrom = new Date(today.getFullYear(), today.getMonth(), 1);
    this.dateTo = new Date(today.getFullYear(), 12, 31); // till the end of the year

    this.historyService.history$.subscribe(history => {
      history.sort((a, b) => {
        return a.date.seconds - b.date.seconds;
      });
      history.sort();
      this.history = history;
      this.setFilter();
    });
  }

  getMonthColor(month): string {
    return this.monthColors[month - 1];
  }

  private setFilter() {
    this.filteredHistory = this.history.filter(h => {
      const time = h.date.toDate().getTime();
      return ((time >= this.dateFrom.getTime()) && (time <= this.dateTo.getTime()));
    });
  }
}
