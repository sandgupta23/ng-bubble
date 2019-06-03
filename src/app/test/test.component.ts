import {ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'jsb-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  counter = 0;
  constructor(private changeDetectorRef: ChangeDetectorRef) { }
  name  = 'test1';

  counterButtonHandler() {
    ++this.counter;
    this.changeDetectorRef.detectChanges();
  }

}
