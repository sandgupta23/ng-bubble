import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {computeStyle} from '@angular/animations/browser/src/util';
import {UtilityService} from '../../utility.service';

@Component({
  selector: 'app-object-tray',
  templateUrl: './object-tray.component.html',
  styleUrls: ['./object-tray.component.scss']
})
export class ObjectTrayComponent implements OnInit {

  @Input() obj: object;
  keys:string[];
  myObject = Object;
  pinnedFieldStr;
  constructor() { }
  @Input() path:string = "";
  @Input() shouldFoldCode:boolean;
  @Output() path$ = new EventEmitter();
  ngOnInit() {
    // this.keys = this.obj && Object.keys(this.obj)
    console.log("ObjectTrayComponent:", this.obj);
  }

  finalPrint(path){
    console.log(path);
    this.path = this.path + " " + path;
    this.path = this.path.trim();
    this.path$.emit(this.path);
  }

}
