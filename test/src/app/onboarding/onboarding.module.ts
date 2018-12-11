import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {OnboardingPage} from './onboarding.page';
import {OnboardingEmailComponent} from './onboarding-email/onboarding-email.component';
import {OnboardingMobileComponent} from './onboarding-mobile/onboarding-mobile.component';
import {OnboardingIdCardComponent} from './onboarding-id-card/onboarding-id-card.component';
import { OnboardingFaceIdComponent } from './onboarding-face-id/onboarding-face-id.component';

const routes: Routes = [
    {
        path: '',
        component: OnboardingPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        OnboardingPage,
        OnboardingEmailComponent,
        OnboardingMobileComponent,
        OnboardingIdCardComponent,
        OnboardingFaceIdComponent
    ]
})
export class OnboardingPageModule {
}
