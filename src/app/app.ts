import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NgChartsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('anaspa_skincare_db-interface');
}
