import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {UtilityService} from '../../utility.service';


@Component({
  selector: 'app-editor',
  template: `<textarea #textEditorPlaceholder id="ng-bubble-editor">This is a test</textarea>`,
  styleUrls: ['./app-editor.component.scss']
})
export class AppEditorComponent implements OnInit, AfterViewInit {

  @ViewChild('textEditorPlaceholder') textEditorPlaceholder: ElementRef;

  @Input() set codeText(val: string) {
    this.codemirror && this.codemirror.setValue(val);
    this._codeText = val;
  }
  _codeText:string;

  codemirror;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const editorTextArea = this.textEditorPlaceholder.nativeElement;
    setTimeout(() => {
      this.codemirror = UtilityService.codeMirrorInit(editorTextArea);
      this.codemirror.setValue(this._codeText);
    });
  }

}
