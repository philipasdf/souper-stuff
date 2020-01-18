import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {History} from '../../../services/history/history';

@Component({
  selector: 'app-history-element',
  templateUrl: './history-element.component.html',
  styleUrls: ['./history-element.component.css']
})
export class HistoryElementComponent implements OnInit {

  @Input() history: History[];
  @Output() newHistory = new EventEmitter();
  @Output() updateHistory = new EventEmitter();
  @Output() deleteHistory = new EventEmitter();

  historyInput: History = {
    shortNote: '',
    date: new Date()
  };

  editMode = false;

  constructor() { }

  ngOnInit() {
    if (!this.history) {
      this.history = [];
    }

    this.history = this.history.map(h => {
      h.date = h.date.toDate();
      return h;
    });

    this.history.sort((a, b) => {
      return a.date.seconds - b.date.seconds;
    });
  }

  onSaveHistory() {
    if (this.editMode) {
      this.updateHistory.emit(this.historyInput);
    } else {
      this.newHistory.emit(this.historyInput);
    }
  }

  onEditHistory(history) {
    this.historyInput = history;
  }

  onDeleteHistory(history) {
    // TODO modal
  }


}
