import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EHeaderFormDataKeys} from '../editor-header/editor-header.component';
import {ILocalConfig} from '../../interface';

@Component({
  selector: 'app-editor-sidebar',
  template: `
    <div class="editor-body-sidebar" (click)="action$.emit($event)">
      <img class="vs-code-grey" 
           title="Open in IDE"
           [src]="(config && config.preferredIde) === 'VSCODE'? vscodeImg: webstormImg">
      <i class="fa fa-search"></i>
      <i class="fa fa-repeat"></i>
      <i class="fa fa-angle-double-right" title="Unfold code" *ngIf="shouldFoldCode"></i>
      <i class="fa fa-angle-double-down" title="Fold code" *ngIf="!shouldFoldCode"></i>
      <i class="fa fa-terminal" title="Log in console" *ngIf="activeHeaderTab === myEHeaderFormDataKeys.key"></i>
      <i class="fa fa-save" *ngIf="activeHeaderTab === myEHeaderFormDataKeys.fileName" id="save-editor"></i>
    </div>
  `,
  styleUrls: ['./app-editor-sidebar.component.scss']
})
export class AppEditorSidebarComponent implements OnInit {

  myEHeaderFormDataKeys = EHeaderFormDataKeys;
  @Output() action$ = new EventEmitter();
  @Input() activeHeaderTab: EHeaderFormDataKeys;
  @Input() shouldFoldCode;
  @Input() config:ILocalConfig;

  vscodeImg = 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Visual_Studio_Code_1.18_icon.svg';
  webstormImg = 'https://seeklogo.com/images/W/webstorm-logo-691E749F21-seeklogo.com.png';
  right = true;
  constructor() {
  }

  ngOnInit() {
  }

}
