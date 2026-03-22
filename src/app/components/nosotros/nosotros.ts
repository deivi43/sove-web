import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="nosotros" id="nosotros">
      <div class="container">
        <div class="nosotros-grid">
          <div class="nosotros-images">
            <div class="img-main">
              <img src="assets/images/equipo.jpg" alt="Equipo SOVE" />
            </div>
            <div class="img-badge">
              <span class="num">10+</span>
              <span class="txt">Años de experiencia</span>
            </div>
          </div>
          <div class="nosotros-content">
            <span class="section-label">// Quiénes somos</span>
            <h2 class="section-title">SOVE Control Ambiental</h2>
            <p>
              Somos una empresa bogotana especializada en control ambiental,
              comprometida con la salud y seguridad de nuestros clientes.
              Contamos con personal certificado y productos de alta calidad
              para garantizar resultados efectivos y duraderos.
            </p>
            <p>
              Atendemos empresas, colegios, conjuntos residenciales, centros
              comerciales y hogares en Bogotá y sus alrededores.
            </p>
            <div class="valores">
              <div class="valor" *ngFor="let v of valores">
                <span class="valor-icon">{{ v.icon }}</span>
                <div>
                  <h4>{{ v.titulo }}</h4>
                  <p>{{ v.desc }}</p>
                </div>
              </div>
            </div>
            <a href="#contacto" class="btn-primary" style="margin-top: 32px; display: inline-flex;">
              Contáctanos hoy
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .nosotros {
      padding: 100px 0;
      background: #f8f9fa;
    }
    .nosotros-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }
    .nosotros-images {
      position: relative;
    }
    .img-main {
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.15);
      img { width: 100%; height: 500px; object-fit: cover; }
    }
    .img-badge {
      position: absolute;
      bottom: -20px; right: -20px;
      background: #f4c430;
      border-radius: 16px;
      padding: 20px 24px;
      text-align: center;
      box-shadow: 0 8px 24px rgba(244,196,48,0.4);
      .num {
        display: block;
        font-family: 'Montserrat', sans-serif;
        font-weight: 800; font-size: 2.5rem;
        color: #1a3a2a;
      }
      .txt {
        font-size: 0.8rem;
        color: #1a3a2a;
        font-weight: 600;
      }
    }
    .nosotros-content p {
      color: #555;
      line-height: 1.8;
      margin-bottom: 16px;
    }
    .valores {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 32px;
    }
    .valor {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      .valor-icon {
        font-size: 1.8rem;
        flex-shrink: 0;
      }
      h4 {
        font-size: 1rem;
        color: #1a3a2a;
        margin-bottom: 4px;
      }
      p {
        font-size: 0.875rem;
        color: #666;
        margin: 0;
      }
    }
    @media (max-width: 768px) {
      .nosotros-grid { grid-template-columns: 1fr; gap: 40px; }
      .img-badge { bottom: 10px; right: 10px; }
    }
  `]
})
export class NosotrosComponent {
  valores = [
    {
      icon: '✅',
      titulo: 'Certificados y autorizados',
      desc: 'Personal capacitado con certificaciones en manejo de plaguicidas y control ambiental.'
    },
    {
      icon: '🌿',
      titulo: 'Productos seguros',
      desc: 'Utilizamos productos de bajo impacto ambiental, seguros para personas y mascotas.'
    },
    {
      icon: '⏱️',
      titulo: 'Respuesta rápida',
      desc: 'Atendemos emergencias y programamos servicios según tu disponibilidad.'
    }
  ];
}
