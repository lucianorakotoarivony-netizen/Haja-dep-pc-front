import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;
  isAuthenticated = signal<boolean>(!!localStorage.getItem('access_token'));
  authMessage = signal<string | null>(null);
  authLoading = signal<boolean>(false);
  

  login(username: string, password: string, captchaToken: string|null){
    
    return this.http.post<{ access: string; refresh: string}>(
      `${this.API_URL}/auth/login`,
      { username, password, captcha: captchaToken}
    );
    
  }

  register(username: string, password: string, email: string, captchaToken: string|null){
    return this.http.post<{ access: string; refresh: string}>(
      `${this.API_URL}/auth/register`,
      { username, password, email, captcha: captchaToken}
    );
  }

  saveTokens(access: string, refresh: string): void {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  logout(): void {
    this.authLoading.set(true);
    this.authMessage.set("Deconnexion ...")

    setTimeout(()=>{
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      this.isAuthenticated.set(false);
      this.currentUsername.set(null);
      this.authMessage.set("A bientôt");

      setTimeout(()=> {
        this.authLoading.set(false);
        this.authMessage.set(null);
      },1000)
    }, 2000)
    
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
  
  getUsername(): string | null {
  const token = this.getAccessToken();
  if (!token) return null;
  
  // Décoder le payload du JWT
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.username;
}

  currentUsername = signal<string | null>(null);

  loadCurrentUser(): void {
  this.currentUsername.set(this.getUsername());
}
}