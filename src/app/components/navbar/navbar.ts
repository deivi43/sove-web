import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav [class.scrolled]="isScrolled()">
      <div class="container nav-inner">
        <a href="#inicio" class="nav-logo">
          <img src="assets/images/logo.png" alt="SOVE Logo" />
          <span>SOVE</span>
        </a>
        <ul class="nav-links" [class.open]="menuOpen()">
          <li><a href="#inicio" (click)="closeMenu()">Inicio</a></li>
          <li><a href="#servicios" (click)="closeMenu()">Servicios</a></li>
          <li><a href="#galeria" (click)="closeMenu()">Galería</a></li>
          <li><a href="#nosotros" (click)="closeMenu()">Nosotros</a></li>
          <li><a href="#contacto" (click)="closeMenu()">Contacto</a></li>
          <li>
            <a href="#contacto" class="nav-cta" (click)="closeMenu()">
              Solicitar servicio
            </a>
          </li>
        </ul>
        <button class="hamburger" (click)="toggleMenu()" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 20px 0;
      transition: all 0.3s ease;
      background: transparent;
    }
    nav.scrolled {
      background: rgba(26,58,42,0.97);
      backdrop-filter: blur(16px);
      padding: 12px 0;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }
    .nav-inner {
      display: flex; align-items: center; justify-content: space-between;
    }
    .nav-logo {
      display: flex; align-items: center; gap: 10px;
      text-decoration: none;
      img { height: 45px; width: auto; }
      span {
        font-family: 'Montserrat', sans-serif;
        font-weight: 800; font-size: 1.4rem;
        color: white; letter-spacing: 2px;
      }
    }
    .nav-links {
      display: flex; align-items: center; gap: 8px;
      list-style: none;
      li a {
        color: rgba(255,255,255,0.9);
        padding: 8px 16px; border-radius: 8px;
        font-weight: 500; font-size: 0.9rem;
        transition: all 0.2s;
        &:hover { background: rgba(255,255,255,0.1); color: white; }
      }
      .nav-cta {
        background: #f4c430 !important;
        color: #1a3a2a !important;
        font-weight: 700 !important;
        border-radius: 8px;
        &:hover { background: #e6b800 !important; transform: translateY(-1px); }
      }
    }
    .hamburger {
      display: none; flex-direction: column; gap: 5px;
      background: none; border: none; cursor: pointer; padding: 4px;
      span {
        display: block; width: 25px; height: 2px;
        background: white; border-radius: 2px; transition: all 0.3s;
      }
    }
    @media (max-width: 768px) {
      .hamburger { display: flex; }
      .nav-links {
        display: none; position: fixed;
        top: 70px; left: 0; right: 0;
        background: rgba(26,58,42,0.98);
        flex-direction: column; padding: 24px;
        gap: 8px; backdrop-filter: blur(16px);
        &.open { display: flex; }
      }
    }
  `]
})
export class NavbarComponent {
  isScrolled = signal(false);
  menuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu() { this.menuOpen.set(false); }
}
