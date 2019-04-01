import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectKeyComponent } from './object-key.component';

describe('ObjectKeyComponent', () => {
  let component: ObjectKeyComponent;
  let fixture: ComponentFixture<ObjectKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
