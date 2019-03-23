import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jsb-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  counter = 0;
  constructor() { }
  name  = "sandeep";

  ngOnInit() {
  }

  hello(){
    //console.log("great!");
  }

}
