import { NgModule } from "@angular/core";
import { environment } from "./environments/environment";
import { NgHcaptchaModule } from 'ng-hcaptcha'

@NgModule({
    imports:[
        NgHcaptchaModule.forRoot({
            siteKey:environment.sitekey
        })
    ]
})
export class ShareModule{}