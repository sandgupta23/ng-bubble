import {Component, OnInit} from '@angular/core';

export enum EOnboardingStage {
    Email,
    Mobile,
    FaceId
}

const ONBOARDING_LOGOS = [
    'email@3x.png',
    'sms-icon@3x.png'
];

@Component({
    selector: 'app-onboarding',
    templateUrl: './onboarding.page.html',
    styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

    myONBOARDING_LOGOS =  ONBOARDING_LOGOS;
    ONBOARDING_TITLE = [
      'Email verification',
      'Verify your mobile number',
      'Face ID enrollment',
    ];
    myEOnboardingStage = EOnboardingStage;
    stage: EOnboardingStage = this.myEOnboardingStage.Email;

    constructor() {
    }

    ngOnInit() {
    }

    test(data) {
        // alert();
        console.log(data);
        this.stage = data;
    }

}
