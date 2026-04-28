import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { Data } from '../services/data';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(Auth);
  const dataService = inject(Data)
  return next(req).pipe(
    catchError((error)=>{
      if (error.status === 0 || error.status === 503){
        router.navigate(['/maintenance']);
      }
      if (error.status === 401){
        auth.logout();
        dataService.loadHomeData();
        dataService.loadSocialNetworkData();
        dataService.loadContactData();
        router.navigate(['/login']);
      }
      return throwError(()=> error);
    }
  )
  );
};
