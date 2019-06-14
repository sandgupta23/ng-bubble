import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EDataCy} from '../../data-cy';

@Component({
  selector: 'jsb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  myEDataCy = EDataCy;
  @Output() showTooltip$ = new EventEmitter();
  @Output() action$ = new EventEmitter();
  @Input() set coords(val: {top: string, left: string}) {

    this._coords = val;
    if (!val) { return; }
    this.top = val.top;
    this.left = val.left;
    this.showMenu = false;
  }
  @Input() showFilesOptions = true;
  showMenu = false;
  top = '0';
  left = '0';
  _coords;
  constructor() { }

  ngOnInit() {
  }

}
