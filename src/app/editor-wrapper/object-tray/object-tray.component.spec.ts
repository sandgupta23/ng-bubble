import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectTrayComponent } from './object-tray.component';

describe('ObjectTrayComponent', () => {
  let component: ObjectTrayComponent;
  let fixture: ComponentFixture<ObjectTrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectTrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
