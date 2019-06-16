import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EDataCy} from '../../data-cy';

@Component({
  selector: 'app-minimize-placeholder',
  template: `
    <div
      class="minimize-placeholder"
      [attr.data-cy]="myDataCy.app_minimize"
      (dblclick)="$event.stopPropagation()"
      (scroll)="$event.stopPropagation()"
      (wheel)="$event.stopPropagation()"
      (click)="maximize$.emit(true);$event.stopPropagation()">
      <i></i>

      <div *ngIf="isLoading"
           class="loader-wrapper">
        <svg class="lds-spinner" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
             preserveAspectRatio="xMidYMid">
          <g transform="rotate(0 50 50)">
            <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="white">
              <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.9375s" repeatCount="indefinite"></animate>
            </rect>
          </g>
          <g transform="rotate(22.5 50 50)">
            <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="white">
              <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.875s" repeatCount="indefinite"></animate>
            </rect>
          </g>
          <g transform="rotate(45 50 50)">
            <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="white">
              <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.8125s" repeatCount="indefinite"></animate>
            </rect>
          </g>
          <g transform="rotate(67.5 50 50)">
            <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="white">
              <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
            </rect>
          </g>
          <g transform="rotate(90 50 50)">
            <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="white">
              <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.6875s" repeatCount="indefinite"></animate>
            </rect>
          </g>
          <g transform="rotate(112.5 50 50)">
            <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="white">
              <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.625s" repeatCount="indefinite"></animate>
            </rect>
          </g>
          <g transform="rotate(135 50 50)">
            <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="white">
              <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.5625s" repeatCount="indefinite"></animate>
            </rect>
          </g>
          <g transform="rotate(157.5 50 50)">
            <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="white">
              <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
            </rect>
          </g>
          <g transform="rotate(180 50 50)">
            <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="white">
              <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.4375s" repeatCount="indefinite"></animate>
            </rect>
          </g>
          <g transform="rotate(202.5 50 50)">
            <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="white">
              <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.375s" repeatCount="indefinite"></animate>
            </rect>
          </g>
          <g transform="rotate(225 50 50)">
            <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="white">
              <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.3125s" repeatCount="indefinite"></animate>
            </rect>
          </g>
          <g transform="rotate(247.5 50 50)">
            <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="white">
              <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
            </rect>
          </g>
          <g transform="rotate(270 50 50)">
            <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="white">
              <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.1875s" repeatCount="indefinite"></animate>
            </rect>
          </g>
          <g transform="rotate(292.5 50 50)">
            <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="white">
              <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.125s" repeatCount="indefinite"></animate>
            </rect>
          </g>
          <g transform="rotate(315 50 50)">
            <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="white">
              <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.0625s" repeatCount="indefinite"></animate>
            </rect>
          </g>
          <g transform="rotate(337.5 50 50)">
            <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="white">
              <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
            </rect>
          </g>
        </svg>
      </div>
    </div>
  `,
  styleUrls: ['./minimize-placeholder.component.scss']
})
export class MinimizePlaceholderComponent implements OnInit {

  @Input() isLoading;
  @Output() maximize$ = new EventEmitter();

  myDataCy = EDataCy;

  constructor() {
  }

  ngOnInit() {
  }

}
