import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangedPrefixComponent } from './changed-prefix.component';

describe('ChangedPrefixComponent', () => {
  let component: ChangedPrefixComponent;
  let fixture: ComponentFixture<ChangedPrefixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangedPrefixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangedPrefixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
