import { Routes } from '@angular/router';

import { Clientes } from './clientes/clientes';
import { Servicios } from './servicios/servicios';
import { Citas } from './citas/citas';


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
   }

];
