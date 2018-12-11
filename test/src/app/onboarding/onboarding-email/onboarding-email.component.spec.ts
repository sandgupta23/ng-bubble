import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingEmailComponent } from './onboarding-email.component';

describe('OnboardingEmailComponent', () => {
  let component: OnboardingEmailComponent;
  let fixture: ComponentFixture<OnboardingEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
