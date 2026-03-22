import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService, Servicio } from '../../services/firebase';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="servicios" id="servicios">
      <div class="container">
        <span class="section-label">// Nuestros servicios</span>
        <h2 class="section-title">Soluciones para cada necesidad</h2>
        <p class="section-sub">
          Ofrecemos servicios especializados de control ambiental para empresas,
          colegios, conjuntos residenciales y centros comerciales en Bogotá.
        </p>

        <!-- Servicios por defecto si no hay en Firebase -->
        <div class="servicios-grid" *ngIf="servicios.length === 0">
          <div class="servicio-card" *ngFor="let s of serviciosDefault">
            <div class="card-icon">{{ s.icon }}</div>
            <div class="card-body">
              <h3>{{ s.nombre }}</h3>
              <p>{{ s.descripcion }}</p>
              <a href="#contacto" class="card-link">Solicitar →</a>
            </div>
          </div>
        </div>

        <!-- Servicios desde Firebase -->
        <div class="servicios-grid" *ngIf="servicios.length > 0">
          <div class="servicio-card" *ngFor="let s of servicios">
            <div class="card-img" *ngIf="s.imagen">
              <img [src]="s.imagen" [alt]="s.nombre" />
            </div>
            <div class="card-body">
              <span class="card-categoria">{{ s.categoria }}</span>
              <h3>{{ s.nombre }}</h3>
              <p>{{ s.descripcion }}</p>
              <a href="#contacto" class="card-link">Solicitar →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .servicios {
      padding: 100px 0;
      background: #f8f9fa;
    }
    .servicios-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }
    .servicio-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      transition: all 0.3s ease;
      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 40px rgba(0,0,0,0.15);
      }
    }
    .card-icon {
      font-size: 3rem;
      padding: 32px 24px 16px;
      background: linear-gradient(135deg, #1a3a2a, #2d6a4f);
      text-align: center;
    }
    .card-img {
      height: 200px;
      overflow: hidden;
      img {
        width: 100%; height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }
      &:hover img { transform: scale(1.05); }
    }
    .card-body {
      padding: 24px;
    }
    .card-categoria {
      font-size: 0.72rem;
      color: #52b788;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-weight: 600;
      display: block;
      margin-bottom: 8px;
    }
    h3 {
      font-size: 1.15rem;
      margin-bottom: 10px;
      color: #1a3a2a;
    }
    p {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 16px;
    }
    .card-link {
      color: #2d6a4f;
      font-weight: 600;
      font-size: 0.9rem;
      transition: gap 0.2s;
      &:hover { color: #52b788; }
    }
  `]
})
export class ServiciosComponent implements OnInit {
  private fbService = inject(FirebaseService);
  servicios: Servicio[] = [];

  serviciosDefault = [
    { icon: '🦟', nombre: 'Fumigación', descripcion: 'Control efectivo de insectos voladores y rastreros en todo tipo de espacios.' },
    { icon: '🐀', nombre: 'Desratización', descripcion: 'Eliminación y control de roedores con métodos seguros y certificados.' },
    { icon: '🧴', nombre: 'Desinfección', descripcion: 'Sanitización profunda de ambientes con productos de alta eficacia.' },
    { icon: '💧', nombre: 'Lavado de Tanques', descripcion: 'Limpieza de tanques de agua potable y lluvia, aéreos y subterráneos.' },
    { icon: '🔥', nombre: 'Extintores', descripcion: 'Venta, recarga y mantenimiento de extintores para todo tipo de empresas.' },
    { icon: '🏭', nombre: 'Marcación Industrial', descripcion: 'Señalización y marcación de áreas en plantas industriales y bodegas.' },
  ];

  ngOnInit() {
    this.fbService.getServicios().subscribe(data => {
      this.servicios = data;
    });
  }
}
