import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {EHeaderFormDataKeys} from '../editor-header/editor-header.component';
import {ILocalConfig} from '../../interface';

@Component({
  selector: 'jsb-editor-sidebar',
  template: `

    <div class="editor-body-sidebar" (click)="action$.emit($event)">
      <div style="height:30px; margin-top: 10px" [title]="!isConnected? 'No connection':'Open in IDE'">
        <img *ngIf="!isLoading && isConnected"
             [ngClass]="{'make-disable':!isConnected}"
             class="vs-code-grey"
             [src]="(config && config.preferredIde) === 'VSCODE'? vscodeImg: webstormImg">
        <!--<i  class="fa fa-spinner fa-spin"></i>//-->
        <img *ngIf="isLoading" class="fa-image-svg" style="width: 28px; height: 28px; margin: 0" [src]="BACKEND_IMG_ROOT+ 'loader.svg'"
             [ngClass]="{'make-disable':!isConnected}"/>
        <i *ngIf="!isLoading && !isConnected" class="fa fa-warning"></i>
      </div>

      <span [title]="!isConnected? 'No connection':'Search files'">
        <img class="fa-image-svg fa-search" [src]="BACKEND_IMG_ROOT+ 'search.svg'" [ngClass]="{'make-disable':!isConnected}"/>
      </span>
      <span title="Refresh component data"><img class="fa-image-svg fa-repeat" [src]="BACKEND_IMG_ROOT+ 'repeat.svg'"/></span>
      <span title="Unfold code">
        <img class="fa-image-svg fa-angle-double-right" [src]="BACKEND_IMG_ROOT+ 'angle-double-right.svg'" *ngIf="shouldFoldCode"/>
      </span>
      <span title="Fold code">
        <img class="fa-image-svg fa-angle-double-down fa-angle-double-down" [src]="BACKEND_IMG_ROOT+ 'angle-double-down.svg'"
             *ngIf="!shouldFoldCode"/>
      </span>
      <span title="Shut down server"><img class="fa-image-svg fa-power-off"
                                                       [src]="BACKEND_IMG_ROOT+ 'power-off-solid.svg'"/></span>
      <!--<i class="fa fa-angle-double-right" title="Unfold code" *ngIf="shouldFoldCode"></i>-->
      <!--<img alt="warning logo" class="fa-image-svg fa-angle-double-right fa-angle-double-down" [src]="BACKEND_IMG_ROOT+ 'angle-double-right.svg'" title="Fold code" *ngIf="!shouldFoldCode"/>-->
      <!--<i class="fa fa-angle-double-down" title="Fold code" *ngIf="!shouldFoldCode"></i>-->
      <!--<i class="fa fa-terminal" title="Log in console" *ngIf="activeHeaderTab === myEHeaderFormDataKeys.key"></i>-->
      <!--<img alt="expand" class="fa-image-svg fa-angle-double-down fa-angle-double-down" [src]="BACKEND_IMG_ROOT+ 'angle-double-down.svg'" title="Fold code" *ngIf="!shouldFoldCode"/>-->
      <!--<i class="fa fa-terminal" title="Log in console" ></i>-->
      <!--<i class="fa fa-save" id="save-editor"></i>-->
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

  BACKEND_IMG_ROOT = 'http://localhost:11637/assets/imgs/';

  vscodeImg = 'http://localhost:11637/assets/imgs/vscode.svg';
  webstormImg = 'http://localhost:11637/assets/imgs/webstorm.png';
  right = true;

  constructor() {
  }

  ngOnInit() {

    // console.log(this.config);
  }

}
