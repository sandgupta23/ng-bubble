import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {UtilityService} from '../../utility.service';


@Component({
  selector: 'jsb-editor',
  template: `<textarea #textEditorPlaceholder></textarea>`,
  styleUrls: ['./jsb-editor.component.scss']
})
export class JsbEditorComponent implements OnInit, AfterViewInit {

  @ViewChild('textEditorPlaceholder') textEditorPlaceholder: ElementRef;

  @Input() level = 3;
  @Input() set codeText(val: string) {
    setTimeout(()=>{
      this._codeText = this.stringifyInput(val, this.level);
      this.setValueInCodeMirror(this.codemirror, this._codeText);
    })
  }

  stringifyInput(val: any, level:number): string {

    if (val === null) return 'UNDEFINED_VALUE';/*undef*/
    if (val === '') return 'EPMTY_STRING';/*undef*/
    if (val === undefined) return 'UNDEFINED_VALUE';/*undef*/
    return typeof val === 'function' || typeof val === 'object' ? JSON.stringify(JSON.parse(UtilityService.jsonStringifyCyclic(val, this.level)),null, '\t') : val;//val.toString();
  }


  _codeText: string;
  //

  codemirror;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const editorTextArea = this.textEditorPlaceholder.nativeElement;
    setTimeout(() => {
      this.codemirror = UtilityService.codeMirrorInit(editorTextArea);
      /*
      TODO: undo the comment
      console.log(this.codemirror);
      this._codeText = this.stringifyInput(this._codeText);
      // console.log(this._codeText);
      this.setValueInCodeMirror(this.codemirror, this._codeText);
      */
    });
  }

  @Input() shouldFoldCode = true;

  setValueInCodeMirror(codemirror, codeText: string) {
    console.log("setValueInCodeMirror");
    if (!codemirror) {
      // codemirror.setValue('undefined value');
      return;
    }
    codemirror.setValue(codeText);
    codemirror.operation(() => {
      if (this.shouldFoldCode) UtilityService.foldCode(codemirror);
    });
  }


  unfoldCode(codemirror){
    UtilityService.unfoldCode(codemirror);
  }

}