import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
// const options: CameraOptions = {
//     quality: 100,
//     destinationType: this.camera.DestinationType.FILE_URI,
//     encodingType: this.camera.EncodingType.JPEG,
//     mediaType: this.camera.MediaType.PICTURE
// }


@Component({
    selector: 'app-onboarding-face-id',
    templateUrl: './onboarding-face-id.component.html',
    styleUrls: ['./onboarding-face-id.component.scss']
})
export class OnboardingFaceIdComponent implements OnInit {
    // myOptions =


    @Output() onboardingStageChanged$ = new EventEmitter();
    CAMERA_OVERLAY_IMAGES = [
      'group-2@3x.png',
      'group-2@3x.png',
    ];
    localStage = 0;

    constructor(private camera: Camera) {
    }
    // options: CameraOptions = {
    //     quality: 100,
    //     destinationType: this.camera.DestinationType.FILE_URI,
    //     encodingType: this.camera.EncodingType.JPEG,
    //     mediaType: this.camera.MediaType.PICTURE
    // }

    ngOnInit() {
    }

    testCam(){
        let cam:any = this.camera;

        let options: any = {
            quality: 100,
            destinationType: cam.DestinationType.FILE_URI,
            encodingType: cam.EncodingType.JPEG,
            mediaType: cam.MediaType.PICTURE
        };
        cam.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            alert();
        }, (err) => {
            // Handle error
        });
    }
}
