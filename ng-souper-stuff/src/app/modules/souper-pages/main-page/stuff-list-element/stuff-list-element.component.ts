import {Component, Input, OnInit} from '@angular/core';
import {Stuff} from '../../../../services/stuff/stuff';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-stuff-list-element',
  templateUrl: './stuff-list-element.component.html',
  styleUrls: ['./stuff-list-element.component.css'],
  animations: [
    trigger('expandElementAnimation', [
      state('open', style({
        opacity: 1,
        height: '*'
      })),
      state('closed', style({
        opacity: 0,
        height: 0
      })),
      transition('open <=> closed', [
        animate('250ms ease-out')
      ])
    ])
  ]
})
export class StuffListElementComponent implements OnInit {

  @Input() stuff: Stuff;

  expandView = false;

  constructor() { }

  ngOnInit() {
  }

  onToggleExpandView() {
    this.expandView = !this.expandView;
  }
}
