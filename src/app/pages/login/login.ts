import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="login-logo">
          <img src="assets/images/logo.png" alt="SOVE" />
          <span>SOVE</span>
        </div>
        <h2>Panel Administrativo</h2>
        <p>Ingresa tus credenciales para continuar</p>

        <div class="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            [(ngModel)]="email"
            (keyup.enter)="login()" />
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input
            [type]="showPass ? 'text' : 'password'"
            placeholder="••••••••"
            [(ngModel)]="password"
            (keyup.enter)="login()" />
          <button class="toggle-pass" (click)="showPass = !showPass">
            {{ showPass ? '🙈' : '👁️' }}
          </button>
        </div>

        <div class="error" *ngIf="error">
          ⚠️ {{ error }}
        </div>

        <button
          class="btn-login"
          (click)="login()"
          [disabled]="loading">
          {{ loading ? 'Ingresando...' : 'Ingresar' }}
        </button>

        <a href="/" class="back-link">← Volver al sitio</a>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #1a3a2a, #1a2744);
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
    }
    .login-card {
      background: white;
      border-radius: 24px;
      padding: 48px 40px;
      width: 100%; max-width: 420px;
      box-shadow: 0 24px 80px rgba(0,0,0,0.3);
      text-align: center;
    }
    .login-logo {
      display: flex; align-items: center;
      justify-content: center; gap: 10px;
      margin-bottom: 24px;
      img { height: 50px; }
      span {
        font-family: 'Montserrat', sans-serif;
        font-weight: 800; font-size: 1.6rem;
        color: #1a3a2a; letter-spacing: 2px;
      }
    }
    h2 {
      font-size: 1.4rem; color: #1a3a2a;
      margin-bottom: 8px;
    }
    p { color: #666; font-size: 0.9rem; margin-bottom: 32px; }
    .form-group {
      position: relative;
      margin-bottom: 16px;
      text-align: left;
      label {
        display: block; font-weight: 600;
        font-size: 0.85rem; color: #333;
        margin-bottom: 6px;
      }
      input {
        width: 100%; padding: 12px 16px;
        border: 2px solid #e0e0e0; border-radius: 10px;
        font-size: 0.9rem; outline: none;
        transition: border-color 0.2s;
        font-family: 'Raleway', sans-serif;
        &:focus { border-color: #2d6a4f; }
      }
    }
    .toggle-pass {
      position: absolute; right: 12px; top: 36px;
      background: none; border: none;
      cursor: pointer; font-size: 1rem;
    }
    .error {
      background: #fff5f5; border: 1px solid #fed7d7;
      color: #c53030; border-radius: 8px;
      padding: 10px 14px; font-size: 0.85rem;
      margin-bottom: 16px; text-align: left;
    }
    .btn-login {
      width: 100%; padding: 14px;
      background: #2d6a4f; color: white;
      border: none; border-radius: 10px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 700; font-size: 1rem;
      cursor: pointer; transition: all 0.3s;
      margin-bottom: 20px;
      &:hover:not(:disabled) { background: #1a3a2a; }
      &:disabled { opacity: 0.6; cursor: not-allowed; }
    }
    .back-link {
      color: #666; font-size: 0.875rem;
      transition: color 0.2s;
      &:hover { color: #2d6a4f; }
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);

  email = '';
  password = '';
  error = '';
  loading = false;
  showPass = false;

  async login() {
    if (!this.email || !this.password) {
      this.error = 'Por favor completa todos los campos.';
      return;
    }
    this.loading = true;
    this.error = '';
    try {
      await this.authService.login(this.email, this.password);
    } catch (e: any) {
      this.error = 'Credenciales incorrectas. Intenta de nuevo.';
      this.loading = false;
    }
  }
}
