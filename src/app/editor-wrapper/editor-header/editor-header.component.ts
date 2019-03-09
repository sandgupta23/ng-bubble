import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss']
})
export class EditorHeaderComponent implements OnInit {

  @Input() componentFiles: string[];
  @Input() componentKeys: string[];
  @Input() headerForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
