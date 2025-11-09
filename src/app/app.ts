import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { NgChartsModule } from 'ng2-charts';

import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Clientes } from './clientes/clientes';
import { Servicios } from './servicios/servicios';
import { Citas } from './citas/citas';
import { Analitica } from './analitica/analitica';
import { AuthGuard } from './auth-guard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NgChartsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('anaspa_skincare_db-interface');
}

