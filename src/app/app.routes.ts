import { Routes } from '@angular/router';
import { NgChartsConfiguration } from 'ng2-charts';
import { Clientes } from './clientes/clientes';
import { Servicios } from './servicios/servicios';
import { Citas } from './citas/citas';
import { AddService } from './add-service/add-service';
import { Analitica } from './analitica/analitica';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { AuthGuard } from './auth-guard';
// export const routes: Routes = [
//     {
//         path: '',
//         component: Clientes
//     },
//    {
//         path: 'servicios', 
//         component: Servicios
//    },
//    {
//         path: 'clientes',
//         component: Clientes
//    },
//    {
//         path: 'citas',
//         component: Citas
//    }, 
//    {
//      path: 'analitica',
//      component: Analitica
//    }

// ];

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'clientes', component: Clientes, canActivate: [AuthGuard] },
  { path: 'servicios', component: Servicios, canActivate: [AuthGuard] },
  { path: 'citas', component: Citas, canActivate: [AuthGuard] },
  { path: 'analitica', component: Analitica, canActivate: [AuthGuard] }
];
