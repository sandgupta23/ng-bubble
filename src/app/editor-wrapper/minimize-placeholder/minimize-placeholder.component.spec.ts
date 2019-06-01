import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimizePlaceholderComponent } from './minimize-placeholder.component';

describe('MinimizePlaceholderComponent', () => {
  let component: MinimizePlaceholderComponent;
  let fixture: ComponentFixture<MinimizePlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimizePlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimizePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
