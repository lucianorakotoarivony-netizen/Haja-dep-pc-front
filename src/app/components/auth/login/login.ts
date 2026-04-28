import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Auth } from '../../../services/auth';
import { FormsModule } from '@angular/forms';
import { AntiBotBase } from '../../../../AntiBotBase';
import { ShareModule } from '../../../../ShareModule';


import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgHcaptchaModule } from 'ng-hcaptcha';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, ShareModule, NgHcaptchaModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login extends AntiBotBase implements OnInit{
  public auth = inject(Auth);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  success = signal<string | null>(null);
  username = signal<string>('');
  password = signal<string>('');
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const usernameParam = params.get('username');
      if (params.get('registered') === 'true' && usernameParam){
        this.success.set("Compte crée avec succès ! Connectez vous.");
        this.username.set(usernameParam);
      }
    });
  }
  protected handleSubmit(): void {
    
    this.auth.authLoading.set(true);
    this.auth.authMessage.set("Connexion en cours...");

    setTimeout(()=> {
      this.auth.authMessage.set("Un instant s'il vous plait");
      setTimeout(()=> {
        this.auth.authLoading.set(false);
        this.auth.authMessage.set(null);
        this.auth.login(this.username(), this.password(), this.captchaToken()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: (data) => {
          this.auth.saveTokens(data.access, data.refresh);
          this.auth.isAuthenticated.set(true);
          this.auth.loadCurrentUser();
          this.router.navigate(["/reviews"], {
            queryParams: {connected:"true"},
            replaceUrl: true
          });
        window.addEventListener('popstate', ()=> {
          window.history.pushState(null,'', '/reviews?connected=true');
        })
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
    },2000)
  }
}
