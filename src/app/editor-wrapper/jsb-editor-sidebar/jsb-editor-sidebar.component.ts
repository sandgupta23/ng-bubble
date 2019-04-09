import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {EHeaderFormDataKeys} from '../editor-header/editor-header.component';
import {ILocalConfig} from '../../interface';

@Component({
  selector: 'jsb-editor-sidebar',
  template: `
    <div class="editor-body-sidebar" (click)="action$.emit($event)">
      <div style="height:30px;" [title]="!isConnected? 'No connection':'Open in IDE'">
        <img *ngIf="!isLoading && isConnected"
             [ngClass]="{'make-disable':!isConnected}"
             class="vs-code-grey"
             [src]="(config && config.preferredIde) === 'VSCODE'? vscodeImg: webstormImg">
        <i *ngIf="isLoading" class="fa fa-spinner fa-spin"></i>
        <i *ngIf="!isLoading && !isConnected" class="fa fa-warning"></i>
      </div>
      
      <span [title]="!isConnected? 'No connection':'Search files'">
        <i class="fa fa-search" [ngClass]="{'make-disable':!isConnected}"></i>
      </span>
      <i class="fa fa-repeat"></i>
      <i class="fa fa-angle-double-right" title="Unfold code" *ngIf="shouldFoldCode"></i>
      <i class="fa fa-angle-double-down" title="Fold code" *ngIf="!shouldFoldCode"></i>
      <i class="fa fa-terminal" title="Log in console" *ngIf="activeHeaderTab === myEHeaderFormDataKeys.key"></i>
      <i class="fa fa-save" *ngIf="activeHeaderTab === myEHeaderFormDataKeys.fileName" id="save-editor"></i>
    </div>
  `,
  styleUrls: ['./jsb-editor-sidebar.component.scss'],
})
export class JsbEditorSidebarComponent implements OnInit {

  myEHeaderFormDataKeys = EHeaderFormDataKeys;
  @Output() action$ = new EventEmitter();
  @Input() activeHeaderTab: EHeaderFormDataKeys;
  @Input() shouldFoldCode;
  @Input() config: ILocalConfig;
  @Input() isLoading: boolean;
  @Input() isConnected: boolean;

  vscodeImg = 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Visual_Studio_Code_1.18_icon.svg';
  webstormImg = 'https://seeklogo.com/images/W/webstorm-logo-691E749F21-seeklogo.com.png';
  right = true;

  constructor() {
  }

  ngOnInit() {
  }

}
