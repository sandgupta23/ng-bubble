import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {IFileData} from '../file-search-panel/file-search-panel.component';

export enum EHeaderFormDataKeys {
  key="key",
  fileName="fileName",
}

@Component({
  selector: 'jsb-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss']
})
export class EditorHeaderComponent implements OnInit {

  subpaths:string[] = [];

  @Input() componentFiles: IFileData[];
  @Input() componentKeys: string[];
  @Input() headerForm: FormGroup;
  @Input() minimize = false;
  @Input() expand = false;
  @Input() activeTab:EHeaderFormDataKeys;
  @Input() set path(val:string){
    debugger;
    if(!val) this.subpaths = [];
    this.subpaths = val.split(' ');
  }

  @Output() headerDataChanged$ = new EventEmitter();
  @Output() action$ = new EventEmitter();
  @Output() path$ = new EventEmitter();
  myEHeaderFormDataKeys = EHeaderFormDataKeys;
  constructor() { }

  ngOnInit() {
    /*todo: do this in parent component*/
    this.headerForm.get('key').valueChanges.subscribe((value)=>{
      this.headerDataChanged$.emit({key:value});
    });
    this.headerForm.get('fileName').valueChanges.subscribe((value)=>{
      this.headerDataChanged$.emit({fileName:value});
    })
  }
  log(){
      //console.log(this.headerForm);
  }

  sendPath(index){
    debugger;
    this.subpaths = this.subpaths.slice(0, index+1);
    this.path$.emit(this.subpaths.join(" "))
  }

}
