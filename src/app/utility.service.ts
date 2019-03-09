import { Injectable } from '@angular/core';
import {FormBuilder} from '@angular/forms';

declare const CodeMirror: any;

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private formBuilder: FormBuilder) { }

  getHeaderForm() {
    return this.formBuilder.group({
      first_message: [""],
      error_message: [""],
    });
  }


  static codeMirrorInit(editorTextArea){
    return CodeMirror.fromTextArea(editorTextArea, {
      lineNumbers: true,
      lineWrapping: true,
      theme: 'night',
      rtlMoveVisually: false,
      direction: 'ltr',
      moveInputWithCursor: false,
      extraKeys: {
        'Ctrl-Q': function (codemirror: any) {
          codemirror.foldCode(codemirror.getCursor());
        },
        'Ctrl-Space': 'autocomplete',
      },
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    });
  }
}
