import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-js-console',
  templateUrl: './js-console.component.html',
  styleUrls: ['./js-console.component.scss']
})
export class JsConsoleComponent implements OnInit {

  rowCount = 2;
  name="1+1";
  editable = true;
  constructor() { }
  results = [];
  @ViewChild('codeContent') codeContent: ElementRef;

  ngOnInit() {
  }
  test($event){
    this.rowCount++;
    $event.stopPropagation();
  }

  executeCode(){
    // let x = eval(this.codeContent.nativeElement.textContent);
    let x =  eval("function hello(){}");
    console.log(x);
    this.results.push(x);
    this.codeContent.nativeElement.textContent = "";
  }

}
