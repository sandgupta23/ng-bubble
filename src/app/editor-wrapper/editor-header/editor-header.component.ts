import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {IFileData} from '../file-search-panel/file-search-panel.component';

export enum EHeaderFormDataKeys {
  key="key",
  fileName="fileName",
}

@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss']
})
export class EditorHeaderComponent implements OnInit {

  @Input() componentFiles: IFileData[];
  @Input() componentKeys: string[];
  @Input() headerForm: FormGroup;
  @Output() headerDataChanged$ = new EventEmitter();
  @Output() action$ = new EventEmitter();
  @Input() minimize = false;
  @Input() expand = false;

  @Input() activeTab:EHeaderFormDataKeys;
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
      console.log(this.headerForm);
  }

}
