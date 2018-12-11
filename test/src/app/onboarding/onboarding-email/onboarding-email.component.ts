import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {EOnboardingStage} from '../onboarding.page';


@Component({
    selector: 'app-onboarding-email',
    templateUrl: './onboarding-email.component.html',
    styleUrls: ['./onboarding-email.component.scss']
})
export class OnboardingEmailComponent implements OnInit {

    stage = 0;
    myEOnboardingStage = EOnboardingStage;
    @Output() onboardingStageChanged$ = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        console.log(this.onboardingStageChanged$);
    }

}
