import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
  if (this.username === 'adminANAspa' && this.password === '1234') {
    sessionStorage.setItem('loggedIn', 'true');
    this.router.navigate(['/dashboard']);
  } else {
    this.errorMessage = 'Usuario o contraseña incorrectos';
  }
}
}
