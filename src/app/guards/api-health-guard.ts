import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

export const apiHealthGuard = () => {
  const router = inject(Router);
  const http = inject(HttpClient);
  return http.get(`${environment.apiUrl}/health`).pipe(
    switchMap(() => {
      const token = localStorage.getItem('access_token');
      if(!token) return of(true);
      const headers = {Authorization:`Bearer ${token}`};
      return http.get(`${environment.apiUrl}/health/auth`, {headers}).pipe(
        map(()=> true),
        catchError(()=> of(true))
      ); 
    }),
    catchError(() => {
      router.navigate(['/maintenance']);
      return of(false);
    })
  );
};
