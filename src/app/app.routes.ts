import { Routes } from '@angular/router';
import { ServiceList } from './pages/service-list/service-list';
import { About } from './pages/about/about';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Reviews } from './pages/reviews/reviews';
import { ServiceDetail } from './pages/service-detail/service-detail';
import { HardwareList } from './pages/hardware-list/hardware-list';
import { HardwareDetail } from './pages/hardware-detail/hardware-detail';
import { SoftwareList } from './pages/software-list/software-list';
import { SoftwaresDetail } from './pages/softwares-detail/softwares-detail';
import { Maintenance } from './pages/maintenance/maintenance';
import { apiHealthGuard } from './guards/api-health-guard';

export const routes: Routes = [
    { path:'maintenance', component: Maintenance},
    {
        path:'',
        canActivate:[apiHealthGuard],
        children:[
            { path:"", component: ServiceList },
            { path:"about", component: About },
            { path: 'login', component: Login },
            { path: 'register', component: Register },
            { path: 'reviews', component: Reviews },
            { path: 'services/:id', component: ServiceDetail },
            { path: 'hardwares', component: HardwareList },
            { path: 'hardwares/:id', component: HardwareDetail},
            { path: 'softwares', component: SoftwareList},
            { path: 'softwares/:id', component: SoftwaresDetail},
            { path:"services", component: ServiceList },
        ]
    }
];
