import { Routes } from '@angular/router';
import { NgChartsConfiguration } from 'ng2-charts';
import { Clientes } from './clientes/clientes';
import { Servicios } from './servicios/servicios';
import { Citas } from './citas/citas';
import { AddService } from './add-service/add-service';
import { Analitica } from './analitica/analitica';

export const routes: Routes = [
    {
        path: '',
        component: Clientes
    },
   {
        path: 'servicios', 
        component: Servicios
   },
   {
        path: 'clientes',
        component: Clientes
   },
   {
        path: 'citas',
        component: Citas
   }, 
   {
     path: 'analitica',
     component: Analitica
   }

];
