import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ERouteNames} from '../../app-routing.module';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    navigate() {
        this.router.navigate([ERouteNames.onboarding]);
    }

}
