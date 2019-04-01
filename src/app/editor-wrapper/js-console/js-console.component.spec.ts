import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsConsoleComponent } from './js-console.component';

describe('JsConsoleComponent', () => {
  let component: JsConsoleComponent;
  let fixture: ComponentFixture<JsConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
