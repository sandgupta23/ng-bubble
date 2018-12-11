import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingFaceIdComponent } from './onboarding-face-id.component';

describe('OnboardingFaceIdComponent', () => {
  let component: OnboardingFaceIdComponent;
  let fixture: ComponentFixture<OnboardingFaceIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingFaceIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingFaceIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
