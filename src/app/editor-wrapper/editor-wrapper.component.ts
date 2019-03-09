import {Component, Input, OnInit} from '@angular/core';
import {UtilityService} from '../utility.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-editor-wrapper',
  templateUrl: './editor-wrapper.component.html',
  styleUrls: ['./editor-wrapper.component.scss']
})
export class EditorWrapperComponent implements OnInit {

  @Input() componentFiles: string[] = ["app.component.ts","app.component.html"];
  @Input() componentKeys: string[];
  codeText = "hello from wrapper";
  headerForm:FormGroup;
  constructor(private utilityService: UtilityService) { }

  ngOnInit() {
    this.headerForm = this.utilityService.getHeaderForm();
    this.headerForm.valueChanges.subscribe(()=>{
      /*todo: change component files or keys*/
    })
  }

  sidebarActionHandler(){

  }

}
