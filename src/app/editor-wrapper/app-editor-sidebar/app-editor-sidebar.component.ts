import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-editor-sidebar',
  template: `
  <div class="editor-body-sidebar" (click)="sidebarAction$.emit($event)">
    <img class="vs-code-grey"
         src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Visual_Studio_Code_1.18_icon.svg">
    <i class="fa fa-search"></i>
    <i class="fa fa-save" id="save-editor"></i>
    <i class="fa fa-repeat"></i>
    <i class="fa fa-angle-left"></i>
    <i class="fa fa-angle-right"></i>
    <i class="fa fa-angle-down"></i>
    <i class="fa fa-angle-up"></i>
  </div>
`,
  styleUrls: ['./app-editor-sidebar.component.scss']
})
export class AppEditorSidebarComponent implements OnInit {

  @Output() sidebarAction$ = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
  }

}
