import { signal } from "@angular/core";

export abstract class AntiBotBase {
    captchaToken = signal<string | null>(null);
    errorStatus = signal<boolean>(false);
    errorMessage = signal<string | null>(null);
    website = signal<string>('');
    onCaptchaSuccess(token: string | Event){
        if (token instanceof Event) return;
            this.captchaToken.set(token);
        }

    onCaptchaExpired(){
        this.captchaToken.set(null);
     }

    onSubmit(){
    //honeypot check
        this.errorStatus.set(false);
        if (this.website()){
            this.errorStatus.set(true);
            this.errorMessage.set("Bot détecté");
        return;
        }
        //captcha check
        if (!this.captchaToken()){
            this.errorStatus.set(true);
            this.errorMessage.set("Captcha requis.");
            return;
    }
    this.handleSubmit();
  }
  protected abstract handleSubmit(): void
}