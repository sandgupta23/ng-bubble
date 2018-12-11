import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingIdCardComponent } from './onboarding-id-card.component';

describe('OnboardingIdCardComponent', () => {
  let component: OnboardingIdCardComponent;
  let fixture: ComponentFixture<OnboardingIdCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingIdCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingIdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
