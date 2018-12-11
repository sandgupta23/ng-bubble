import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingMobileComponent } from './onboarding-mobile.component';

describe('OnboardingMobileComponent', () => {
  let component: OnboardingMobileComponent;
  let fixture: ComponentFixture<OnboardingMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
