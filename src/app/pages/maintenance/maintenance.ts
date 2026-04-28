import { Component, inject, OnInit, OnDestroy, DestroyRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Data } from '../../services/data';
import { Auth } from '../../services/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-maintenance',
  imports: [],
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.scss',
})
export class Maintenance implements OnInit, OnDestroy{
  private http = inject(HttpClient);
  private router = inject(Router);
  private dataService = inject(Data);
  private interval:any;
  private auth = inject(Auth);
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.interval = setInterval(()=> {
      this.http.get(`${environment.apiUrl}/health`).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next:()=> {
          this.router.navigate(['/services']);
          this.dataService.loadHomeData();
          this.dataService.loadSocialNetworkData();
          this.dataService.loadContactData();
          this.auth.loadCurrentUser();
        },
        error: ()=> {}
      });
    },5000)
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
