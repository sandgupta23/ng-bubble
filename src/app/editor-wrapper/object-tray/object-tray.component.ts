import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-object-tray',
  templateUrl: './object-tray.component.html',
  styleUrls: ['./object-tray.component.scss']
})
export class ObjectTrayComponent implements OnInit {

  @Input() obj: object;
  keys: string[];
  myObject = Object;
  pinnedFieldStr;
  constructor() { }
  @Input() path = '';
  @Input() shouldFoldCode: boolean;
  @Output() path$ = new EventEmitter();
  ngOnInit() {
    // this.keys = this.obj && Object.keys(this.obj)

  }

  finalPrint(path) {

    this.path = this.path + ' ' + path;
    this.path = this.path.trim();
    this.path$.emit(this.path);
  }

}
