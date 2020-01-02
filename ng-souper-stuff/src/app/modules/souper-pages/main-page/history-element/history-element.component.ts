import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {History} from '../../../../services/history/history';

@Component({
  selector: 'app-history-element',
  templateUrl: './history-element.component.html',
  styleUrls: ['./history-element.component.css']
})
export class HistoryElementComponent implements OnInit {

  @Input() history: History[];
  @Output() historyOutput = new EventEmitter();

  newHistory: History = {
    shortNote: '',
    date: new Date()
  };

  constructor() { }

  ngOnInit() {
    if (!this.history) {
      this.history = [];
    }
    this.history.sort((a, b) => {
      return a.date.seconds - b.date.seconds;
    });
  }

  onAddHistory() {
    this.historyOutput.emit(this.newHistory);
  }
}
