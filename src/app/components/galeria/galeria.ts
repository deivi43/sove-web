import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService, GaleriaItem } from '../../services/firebase';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="galeria" id="galeria">
      <div class="container">
        <span class="section-label">// Nuestro trabajo</span>
        <h2 class="section-title">Galería de servicios</h2>
        <p class="section-sub">
          Resultados reales de nuestros trabajos en empresas,
          conjuntos residenciales y más en Bogotá.
        </p>

        <!-- Filtros -->
        <div class="filtros">
          <button
            *ngFor="let cat of categorias"
            [class.active]="categoriaActiva() === cat"
            (click)="filtrar(cat)">
            {{ cat }}
          </button>
        </div>

        <!-- Grid -->
        <div class="galeria-grid">
          <div
            class="galeria-item"
            *ngFor="let item of galeriaFiltrada()"
            (click)="openModal(item)">
            <img [src]="item.url" [alt]="item.titulo" />
            <div class="item-overlay">
              <span>{{ item.titulo }}</span>
            </div>
          </div>

          <!-- Items por defecto -->
          <div
            class="galeria-item"
            *ngFor="let item of itemsDefault"
            [style.background]="item.bg">
            <div class="default-item">
              <span class="default-icon">{{ item.icon }}</span>
              <span class="default-label">{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal" *ngIf="modalItem()" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="closeModal()">✕</button>
          <img [src]="modalItem()!.url" [alt]="modalItem()!.titulo" />
          <p>{{ modalItem()!.titulo }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .galeria {
      padding: 100px 0;
      background: white;
    }
    .filtros {
      display: flex; gap: 10px; flex-wrap: wrap;
      margin-bottom: 40px;
      button {
        padding: 8px 20px; border-radius: 99px;
        border: 2px solid #e0e0e0;
        background: transparent; cursor: pointer;
        font-family: 'Raleway', sans-serif;
        font-weight: 600; font-size: 0.85rem;
        transition: all 0.2s; color: #444;
        &:hover, &.active {
          background: #2d6a4f;
          border-color: #2d6a4f;
          color: white;
        }
      }
    }
    .galeria-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
    .galeria-item {
      position: relative; border-radius: 12px;
      overflow: hidden; aspect-ratio: 4/3;
      cursor: pointer;
      img {
        width: 100%; height: 100%;
        object-fit: cover;
        transition: transform 0.4s;
      }
      &:hover img { transform: scale(1.08); }
      &:hover .item-overlay { opacity: 1; }
    }
    .item-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(26,58,42,0.85), transparent);
      display: flex; align-items: flex-end;
      padding: 20px; opacity: 0;
      transition: opacity 0.3s;
      span { color: white; font-weight: 600; }
    }
    .default-item {
      width: 100%; height: 100%;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 8px;
      .default-icon { font-size: 3rem; }
      .default-label { color: white; font-weight: 600; font-size: 0.9rem; }
    }
    .modal {
      position: fixed; inset: 0; z-index: 9998;
      background: rgba(0,0,0,0.85);
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
    }
    .modal-content {
      position: relative; max-width: 800px; width: 100%;
      border-radius: 16px; overflow: hidden;
      img { width: 100%; display: block; }
      p { background: #1a3a2a; color: white; padding: 16px; text-align: center; }
    }
    .modal-close {
      position: absolute; top: 12px; right: 12px;
      background: rgba(0,0,0,0.5); color: white;
      border: none; border-radius: 50%;
      width: 36px; height: 36px; cursor: pointer;
      font-size: 1rem; z-index: 1;
    }
  `]
})
export class GaleriaComponent implements OnInit {
  private fbService = inject(FirebaseService);
  galeria: GaleriaItem[] = [];
  categoriaActiva = signal('Todos');
  modalItem = signal<GaleriaItem | null>(null);
  galeriaFiltrada = signal<GaleriaItem[]>([]);

  categorias = ['Todos', 'Fumigación', 'Tanques', 'Extintores', 'Marcación'];

  itemsDefault = [
    { icon: '🦟', label: 'Fumigación', bg: 'linear-gradient(135deg, #1a3a2a, #2d6a4f)' },
    { icon: '💧', label: 'Lavado de Tanques', bg: 'linear-gradient(135deg, #1a2744, #1e3a6e)' },
    { icon: '🔥', label: 'Extintores', bg: 'linear-gradient(135deg, #8b1a1a, #c0392b)' },
    { icon: '🏭', label: 'Marcación', bg: 'linear-gradient(135deg, #2c2c2c, #444)' },
  ];

  ngOnInit() {
    this.fbService.getGaleria().subscribe(data => {
      this.galeria = data;
      this.galeriaFiltrada.set(data);
      if (data.length > 0) this.itemsDefault = [];
    });
  }

  filtrar(cat: string) {
    this.categoriaActiva.set(cat);
    if (cat === 'Todos') {
      this.galeriaFiltrada.set(this.galeria);
    } else {
      this.galeriaFiltrada.set(this.galeria.filter(i => i.categoria === cat));
    }
  }

  openModal(item: GaleriaItem) { this.modalItem.set(item); }
  closeModal() { this.modalItem.set(null); }
}
