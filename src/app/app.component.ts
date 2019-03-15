// import { Component } from '@angular/core';
// import {UtilityService} from './utility.service';
//
import {ServerService} from "./server.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-bubble-elements';
  @Input() set input1(val){

  }
  constructor(private serverService:ServerService, private activetedRoute: ActivetedRoute){
  }
}
