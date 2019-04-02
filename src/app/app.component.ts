import {Component, DoCheck, OnChanges, SimpleChanges} from '@angular/core';
import {UtilityService} from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  title = 'ng-bubble-elements';
  val = 0;
  obj = {
    // name:"Sandeep Gupta",
    address: {
      country: {
        state: {
          city: {
            name: 'ghaziabad',
            landMark: 'Near Mango tree',
            pincode: 201009
          },
          alias: 'UP',
          name: 'Uttar Pradesh'
        }
      }
    }
  };

  constructor() {
    console.log(this);
  }

  ngDoCheck(): void {
    console.log(this);
  }




}
