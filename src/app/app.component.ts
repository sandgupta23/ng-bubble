import {ChangeDetectorRef, Component, DoCheck, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {UtilityService} from './utility.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'ng-bubble-elements';
  testForm: NgForm;
  @ViewChild('form') form:NgForm;

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

  constructor(private changeDetectorRef:ChangeDetectorRef){}

  add() {
    this.val = this.val + 1;
    this.changeDetectorRef.detectChanges();
  }

  ngDoCheck(): void {

  }


}
