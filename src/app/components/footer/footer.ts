import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">
              <img src="assets/images/logo.png" alt="SOVE" />
              <span>SOVE</span>
            </div>
            <p>
              Empresa especializada en control ambiental,
              fumigación y servicios de seguridad en Bogotá, Colombia.
            </p>
            <div class="footer-social">
              <a href="https://wa.me/573042004948" target="_blank">💬</a>
              <a href="mailto:soporte.sove@gmail.com">✉️</a>
            </div>
          </div>
          <div class="footer-links">
            <h4>Servicios</h4>
            <ul>
              <li><a href="#servicios">Fumigación</a></li>
              <li><a href="#servicios">Desratización</a></li>
              <li><a href="#servicios">Desinfección</a></li>
              <li><a href="#servicios">Lavado de tanques</a></li>
              <li><a href="#servicios">Extintores</a></li>
              <li><a href="#servicios">Marcación industrial</a></li>
            </ul>
          </div>
          <div class="footer-links">
            <h4>Navegación</h4>
            <ul>
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#galeria">Galería</a></li>
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="#contacto">Contacto</a></li>
              <li><a href="/admin">Panel Admin</a></li>
            </ul>
          </div>
          <div class="footer-contact">
            <h4>Contacto</h4>
            <div class="contact-item">
              <span>📍</span>
              <span>Bogotá, Colombia</span>
            </div>
            <div class="contact-item">
              <span>📞</span>
              <span>+57 304 200 4948</span>
            </div>
            <div class="contact-item">
              <span>✉️</span>
              <span>soporte.sove&#64;gmail.com</span>
            </div>
            <div class="contact-item">
              <span>🕐</span>
              <span>Lun - Sab: 7am - 6pm</span>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© {{ year }} SOVE Control Ambiental. Todos los derechos reservados.</p>
          <p>Bogotá, Colombia 🇨🇴</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background: #0d1f14;
      padding: 80px 0 0;
      color: rgba(255,255,255,0.75);
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
      gap: 48px;
      padding-bottom: 60px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .footer-logo {
      display: flex; align-items: center; gap: 10px;
      margin-bottom: 16px;
      img { height: 40px; }
      span {
        font-family: 'Montserrat', sans-serif;
        font-weight: 800; font-size: 1.3rem;
        color: white; letter-spacing: 2px;
      }
    }
    .footer-brand p {
      font-size: 0.875rem;
      line-height: 1.7;
      margin-bottom: 20px;
    }
    .footer-social {
      display: flex; gap: 12px;
      a {
        width: 40px; height: 40px;
        background: rgba(255,255,255,0.08);
        border-radius: 10px;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.2rem; transition: all 0.2s;
        &:hover { background: #2d6a4f; transform: translateY(-2px); }
      }
    }
    .footer-links {
      h4 {
        color: white; font-size: 0.95rem;
        margin-bottom: 20px; letter-spacing: 1px;
      }
      ul { list-style: none; }
      li { margin-bottom: 10px; }
      a {
        color: rgba(255,255,255,0.6);
        font-size: 0.875rem; transition: color 0.2s;
        &:hover { color: #52b788; }
      }
    }
    .footer-contact {
      h4 {
        color: white; font-size: 0.95rem;
        margin-bottom: 20px; letter-spacing: 1px;
      }
    }
    .contact-item {
      display: flex; gap: 10px;
      margin-bottom: 12px;
      font-size: 0.875rem;
      span:first-child { flex-shrink: 0; }
    }
    .footer-bottom {
      display: flex; justify-content: space-between;
      align-items: center; padding: 24px 0;
      font-size: 0.8rem;
      color: rgba(255,255,255,0.4);
    }
    @media (max-width: 768px) {
      .footer-grid { grid-template-columns: 1fr 1fr; }
      .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
    }
    @media (max-width: 480px) {
      .footer-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
