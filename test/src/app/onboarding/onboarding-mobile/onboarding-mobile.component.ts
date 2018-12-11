import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {EOnboardingStage} from '../onboarding.page';

@Component({
    selector: 'app-onboarding-mobile',
    templateUrl: './onboarding-mobile.component.html',
    styleUrls: ['./onboarding-mobile.component.scss']
})
export class OnboardingMobileComponent implements OnInit {

    @Output() onboardingStageChanged$ = new EventEmitter();
    @ViewChild('mobileForm') mobileForm: NgForm;
    myEOnboardingStage = EOnboardingStage;

    localStage = 1;
    constructor() {
    }

    ngOnInit() {

    }

}
