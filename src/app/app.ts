import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Data } from './services/data';
import { Footer } from './components/footer/footer';
import { Auth } from './services/auth';
import { catchError, interval, map, of, Subscription, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy{
  private tokenCheckSubscription: Subscription = Subscription.EMPTY;
  dataService = inject(Data);
  auth = inject(Auth);
  http = inject(HttpClient);
  router = inject(Router);
  TWENTY_FIVE_HOURS = 90_000_000;
  ngOnInit(): void {
    this.tokenCheckSubscription = interval(this.TWENTY_FIVE_HOURS).pipe(
      switchMap(()=> {
        const token = localStorage.getItem('access_token');
        if(!token) return of(null);
        const headers = new HttpHeaders({Authorization: `Bearer${token}`});
        return this.http.get(`${environment.apiUrl}/health/auth`, {headers}).pipe(
          map(()=>'valid'),
          catchError((error)=>{
            if (error.status === 401){
              this.auth.logout();
              this.dataService.loadHomeData(); 
              this.dataService.loadSocialNetworkData();
              this.dataService.loadContactData();
              this.router.navigate(['/login']);
            }
            return of('error');
          })
        );
      })
    ).subscribe();
    this.auth.loadCurrentUser();
    this.dataService.loadHomeData();
    this.dataService.loadContactData();
    this.dataService.loadSocialNetworkData();
  }
  ngOnDestroy(): void {
    this.tokenCheckSubscription?.unsubscribe();
  }
}
