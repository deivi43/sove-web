import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero" id="inicio">
      <div class="hero-overlay"></div>
      <div class="hero-bg">
        <img src="assets/images/hero-bg.png" alt="SOVE Control Ambiental" />
      </div>
      <div class="container hero-content">
        <div class="hero-badge">
          <span class="dot"></span>
          Control Ambiental Profesional · Bogotá, Colombia
        </div>
        <h1>
          Soluciones integrales para
          <span class="highlight">ambientes seguros</span>
          y saludables
        </h1>
        <p>
          Empresa especializada en fumigación, control de plagas, desinfección,
          lavado de tanques y más. Más de 10 años protegiendo tu espacio.
        </p>
        <div class="hero-ctas">
          <a href="#contacto" class="btn-primary">
            📞 Solicitar servicio
          </a>
          <a href="#servicios" class="btn-outline">
            Ver servicios →
          </a>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <span class="num">500+</span>
            <span class="label">Clientes satisfechos</span>
          </div>
          <div class="stat">
            <span class="num">10+</span>
            <span class="label">Años de experiencia</span>
          </div>
          <div class="stat">
            <span class="num">100%</span>
            <span class="label">Garantía de servicio</span>
          </div>
        </div>
      </div>
      <div class="hero-scroll">
        <span></span>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative; min-height: 100vh;
      display: flex; align-items: center;
      overflow: hidden;
    }
    .hero-bg {
      position: absolute; inset: 0; z-index: 0;
      img { width: 100%; height: 100%; object-fit: cover; }
    }
    .hero-overlay {
      position: absolute; inset: 0; z-index: 1;
      background: linear-gradient(135deg, rgba(26,58,42,0.92) 0%, rgba(26,39,68,0.85) 100%);
    }
    .hero-content {
      position: relative; z-index: 2;
      padding-top: 100px; padding-bottom: 60px;
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 99px; padding: 8px 18px;
      color: rgba(255,255,255,0.9);
      font-size: 0.82rem; margin-bottom: 28px;
      backdrop-filter: blur(8px);
      .dot {
        width: 8px; height: 8px; border-radius: 50%;
        background: #52b788;
        animation: blink 1.5s infinite;
      }
    }
    @keyframes blink {
      0%,100% { opacity: 1; } 50% { opacity: 0.3; }
    }
    h1 {
      font-size: clamp(2.2rem, 5vw, 4rem);
      color: white; line-height: 1.15;
      margin-bottom: 24px; max-width: 700px;
      .highlight {
        color: #f4c430;
        display: block;
      }
    }
    p {
      color: rgba(255,255,255,0.8);
      font-size: 1.1rem; max-width: 560px;
      line-height: 1.7; margin-bottom: 36px;
    }
    .hero-ctas {
      display: flex; gap: 16px; flex-wrap: wrap;
      margin-bottom: 60px;
    }
    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 28px; border-radius: 12px;
      border: 2px solid rgba(255,255,255,0.4);
      color: white; font-weight: 600; font-size: 0.95rem;
      transition: all 0.3s;
      &:hover {
        border-color: white;
        background: rgba(255,255,255,0.1);
      }
    }
    .hero-stats {
      display: flex; gap: 40px; flex-wrap: wrap;
    }
    .stat {
      display: flex; flex-direction: column;
      .num {
        font-family: 'Montserrat', sans-serif;
        font-weight: 800; font-size: 2rem; color: #f4c430;
      }
      .label { color: rgba(255,255,255,0.7); font-size: 0.85rem; }
    }
    .hero-scroll {
      position: absolute; bottom: 30px; left: 50%;
      transform: translateX(-50%); z-index: 2;
      span {
        display: block; width: 2px; height: 50px;
        background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);
        margin: 0 auto;
        animation: scrollDown 2s infinite;
      }
    }
    @keyframes scrollDown {
      0% { transform: scaleY(0); transform-origin: top; }
      50% { transform: scaleY(1); transform-origin: top; }
      51% { transform: scaleY(1); transform-origin: bottom; }
      100% { transform: scaleY(0); transform-origin: bottom; }
    }
    @media (max-width: 768px) {
      .hero-stats { gap: 24px; }
      .hero-ctas { flex-direction: column; }
    }
  `]
})
export class HeroComponent {}
