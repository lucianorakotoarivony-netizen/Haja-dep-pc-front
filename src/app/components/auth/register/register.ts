import { Component, inject, signal, DestroyRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth';
import { FormsModule } from '@angular/forms';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { ShareModule } from '../../../../ShareModule';
import { AntiBotBase } from '../../../../AntiBotBase';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, NgHcaptchaModule, ShareModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register extends AntiBotBase{
  public auth = inject(Auth);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  username = signal<string>('');
  password = signal<string>('');
  email = signal<string>('');

  protected handleSubmit(): void {
    this.auth.authLoading.set(true);
    this.auth.authMessage.set("Création du compte")
    setTimeout(()=>{
      this.auth.authMessage.set("Un instant s'il vous plait");
      setTimeout(()=> {
        this.auth.authLoading.set(false);
        this.auth.authMessage.set(null);
        this.auth.register(this.username(), this.password(), this.email(), this.captchaToken()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: (data) => {
            this.auth.saveTokens(data.access, data.refresh);
            this.router.navigate(["/login"], {
              queryParams: {
                registered : "true",
                username: this.username()}
            });
        },
          error: (err) => {
            this.errorStatus.set(true);
            let message = 'Une erreur est survenue. Veuillez réessayer.';
            if (err?.error && typeof err.error.message === "string"){
              message = err.error.message;
            }
            this.errorMessage.set(message);
            this.auth.authLoading.set(false);
      }
    });
      },1000)
    }, 2000)
  }
}
