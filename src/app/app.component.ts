import {ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {UtilityService} from './utility.service';
import {FormBuilder, NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  @Input() title = 'ng-bubble-elements';
  @Output() test = new EventEmitter();
  testForm: NgForm;
  @ViewChild('form', {static: false}) form: NgForm;

  val = 0;
  x  = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, ];
  y = undefined;
  obj = {
    // name:"Sandeep Gupta",
    address: {
      country: {
        state: {
          city: {
            name: 'city big',
            landMark: 'Near Mango tree',
            pincode: 2132131
          },
          alias: 'CN',
          name: 'Gloea longer'
        }
      }
    }
  };

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private s: HttpClient,
              private router: Router
              ) {}

  add() {
    this.val = this.val + 1;
    this.changeDetectorRef.detectChanges();
  }

  ngDoCheck(): void {

  }


}
