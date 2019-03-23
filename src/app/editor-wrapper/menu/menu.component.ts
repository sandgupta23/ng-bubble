import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'jsb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() showTooltip$ = new EventEmitter();
  @Output() action$ = new EventEmitter();
  top:string = "0";
  left:string = "0";
  _coords;
  @Input() set coords(val:{top:string, left:string}){

    this._coords = val;
    if(!val) return;
    this.top = val.top;
    this.left = val.left;
    this.showMenu = false;
  }

  showMenu = false;
  constructor() { }

  ngOnInit() {
  }

}
