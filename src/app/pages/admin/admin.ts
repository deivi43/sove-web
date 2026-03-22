import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService, Servicio, GaleriaItem } from '../../services/firebase';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar-logo">
          <img src="assets/images/logo.png" alt="SOVE" />
          <span>SOVE Admin</span>
        </div>
        <nav class="sidebar-nav">
          <button
            *ngFor="let tab of tabs"
            [class.active]="tabActivo() === tab.id"
            (click)="tabActivo.set(tab.id)">
            <span>{{ tab.icon }}</span>
            {{ tab.label }}
          </button>
        </nav>
        <button class="btn-logout" (click)="logout()">
          🚪 Cerrar sesión
        </button>
      </aside>

      <!-- CONTENIDO -->
      <main class="admin-main">
        <header class="admin-header">
          <h1>{{ tabLabel() }}</h1>
          <span class="admin-user">{{ userEmail }}</span>
        </header>

        <!-- TAB: SERVICIOS -->
        <div *ngIf="tabActivo() === 'servicios'">
          <div class="admin-toolbar">
            <button class="btn-add" (click)="abrirFormServicio()">
              ➕ Nuevo servicio
            </button>
          </div>

          <!-- FORM SERVICIO -->
          <div class="admin-form" *ngIf="formServicioVisible()">
            <h3>{{ editandoServicio ? 'Editar' : 'Nuevo' }} servicio</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Nombre</label>
                <input type="text" [(ngModel)]="formServicio.nombre" placeholder="Nombre del servicio" />
              </div>
              <div class="form-group">
                <label>Categoría</label>
                <select [(ngModel)]="formServicio.categoria">
                  <option value="">Seleccionar</option>
                  <option>Fumigación</option>
                  <option>Desinfección</option>
                  <option>Tanques</option>
                  <option>Extintores</option>
                  <option>Marcación</option>
                  <option>Otro</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>Descripción</label>
              <textarea [(ngModel)]="formServicio.descripcion" rows="3" placeholder="Descripción del servicio"></textarea>
            </div>
            <div class="form-group">
              <label>Imagen</label>
              <input type="file" accept="image/*" (change)="onImagenServicio($event)" />
              <img *ngIf="formServicio.imagen" [src]="formServicio.imagen" class="preview-img" />
            </div>
            <div class="form-actions">
              <button class="btn-save" (click)="guardarServicio()" [disabled]="guardando()">
                {{ guardando() ? 'Guardando...' : '💾 Guardar' }}
              </button>
              <button class="btn-cancel" (click)="formServicioVisible.set(false)">
                Cancelar
              </button>
            </div>
          </div>

          <!-- LISTA SERVICIOS -->
          <div class="admin-grid">
            <div class="admin-card" *ngFor="let s of servicios">
              <img *ngIf="s.imagen" [src]="s.imagen" class="card-img" />
              <div class="card-info">
                <span class="card-cat">{{ s.categoria }}</span>
                <h4>{{ s.nombre }}</h4>
                <p>{{ s.descripcion }}</p>
              </div>
              <div class="card-actions">
                <button class="btn-edit" (click)="editarServicio(s)">✏️ Editar</button>
                <button class="btn-delete" (click)="eliminarServicio(s.id!)">🗑️ Eliminar</button>
              </div>
            </div>
            <div class="empty-state" *ngIf="servicios.length === 0">
              <span>📋</span>
              <p>No hay servicios aún. ¡Agrega el primero!</p>
            </div>
          </div>
        </div>

        <!-- TAB: GALERÍA -->
        <div *ngIf="tabActivo() === 'galeria'">
          <div class="admin-toolbar">
            <button class="btn-add" (click)="formGaleriaVisible.set(!formGaleriaVisible())">
              ➕ Agregar foto
            </button>
          </div>

          <!-- FORM GALERÍA -->
          <div class="admin-form" *ngIf="formGaleriaVisible()">
            <h3>Nueva foto</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Título</label>
                <input type="text" [(ngModel)]="formGaleria.titulo" placeholder="Título de la foto" />
              </div>
              <div class="form-group">
                <label>Categoría</label>
                <select [(ngModel)]="formGaleria.categoria">
                  <option value="">Seleccionar</option>
                  <option>Fumigación</option>
                  <option>Tanques</option>
                  <option>Extintores</option>
                  <option>Marcación</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>Imagen</label>
              <input type="file" accept="image/*" (change)="onImagenGaleria($event)" />
            </div>
            <div class="form-actions">
              <button class="btn-save" (click)="guardarGaleria()" [disabled]="guardando()">
                {{ guardando() ? 'Subiendo...' : '💾 Guardar' }}
              </button>
              <button class="btn-cancel" (click)="formGaleriaVisible.set(false)">
                Cancelar
              </button>
            </div>
          </div>

          <!-- GRID GALERÍA -->
          <div class="galeria-admin-grid">
            <div class="galeria-admin-item" *ngFor="let item of galeria">
              <img [src]="item.url" [alt]="item.titulo" />
              <div class="galeria-overlay">
                <span>{{ item.titulo }}</span>
                <button (click)="eliminarGaleria(item.id!)">🗑️</button>
              </div>
            </div>
            <div class="empty-state" *ngIf="galeria.length === 0">
              <span>🖼️</span>
              <p>No hay fotos aún. ¡Sube la primera!</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  `,
  styles: [`
    .admin-page {
      display: flex; min-height: 100vh;
      background: #f0f2f5;
      font-family: 'Raleway', sans-serif;
    }
    .sidebar {
      width: 260px; flex-shrink: 0;
      background: #1a3a2a;
      display: flex; flex-direction: column;
      padding: 24px 16px;
      position: sticky; top: 0; height: 100vh;
    }
    .sidebar-logo {
      display: flex; align-items: center; gap: 10px;
      padding: 8px 12px; margin-bottom: 32px;
      img { height: 36px; }
      span {
        font-family: 'Montserrat', sans-serif;
        font-weight: 700; color: white; font-size: 1rem;
      }
    }
    .sidebar-nav {
      flex: 1; display: flex; flex-direction: column; gap: 4px;
      button {
        display: flex; align-items: center; gap: 10px;
        padding: 12px 16px; border-radius: 10px;
        border: none; background: transparent;
        color: rgba(255,255,255,0.7);
        font-family: 'Raleway', sans-serif;
        font-size: 0.9rem; cursor: pointer;
        transition: all 0.2s; text-align: left;
        &:hover, &.active {
          background: rgba(255,255,255,0.1);
          color: white;
        }
        &.active { background: #2d6a4f; color: white; }
      }
    }
    .btn-logout {
      padding: 12px 16px; border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.2);
      background: transparent; color: rgba(255,255,255,0.7);
      font-family: 'Raleway', sans-serif; cursor: pointer;
      transition: all 0.2s;
      &:hover { background: rgba(255,0,0,0.2); color: white; }
    }
    .admin-main {
      flex: 1; padding: 32px; overflow-y: auto;
    }
    .admin-header {
      display: flex; justify-content: space-between;
      align-items: center; margin-bottom: 32px;
      h1 { font-size: 1.6rem; color: #1a3a2a; }
      .admin-user { color: #666; font-size: 0.875rem; }
    }
    .admin-toolbar {
      margin-bottom: 24px;
    }
    .btn-add {
      padding: 12px 24px; border-radius: 10px;
      background: #2d6a4f; color: white;
      border: none; cursor: pointer;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600; font-size: 0.9rem;
      transition: all 0.2s;
      &:hover { background: #1a3a2a; }
    }
    .admin-form {
      background: white; border-radius: 16px;
      padding: 28px; margin-bottom: 28px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      h3 { font-size: 1.1rem; color: #1a3a2a; margin-bottom: 20px; }
    }
    .form-row {
      display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    }
    .form-group {
      margin-bottom: 16px;
      label {
        display: block; font-weight: 600;
        font-size: 0.82rem; color: #444; margin-bottom: 6px;
      }
      input, select, textarea {
        width: 100%; padding: 10px 14px;
        border: 2px solid #e0e0e0; border-radius: 8px;
        font-family: 'Raleway', sans-serif;
        font-size: 0.875rem; outline: none;
        transition: border-color 0.2s;
        &:focus { border-color: #2d6a4f; }
      }
    }
    .preview-img {
      width: 120px; height: 80px;
      object-fit: cover; border-radius: 8px;
      margin-top: 8px; display: block;
    }
    .form-actions {
      display: flex; gap: 12px;
    }
    .btn-save {
      padding: 10px 24px; border-radius: 8px;
      background: #2d6a4f; color: white;
      border: none; cursor: pointer;
      font-family: 'Montserrat', sans-serif; font-weight: 600;
      &:disabled { opacity: 0.6; cursor: not-allowed; }
    }
    .btn-cancel {
      padding: 10px 24px; border-radius: 8px;
      background: #e0e0e0; color: #444;
      border: none; cursor: pointer;
      font-family: 'Montserrat', sans-serif; font-weight: 600;
    }
    .admin-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }
    .admin-card {
      background: white; border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
      .card-img {
        width: 100%; height: 160px; object-fit: cover;
      }
      .card-info {
        padding: 16px;
        .card-cat {
          font-size: 0.7rem; color: #52b788;
          letter-spacing: 2px; text-transform: uppercase;
          font-weight: 600; display: block; margin-bottom: 4px;
        }
        h4 { font-size: 1rem; color: #1a3a2a; margin-bottom: 6px; }
        p { font-size: 0.82rem; color: #666; line-height: 1.5; }
      }
      .card-actions {
        display: flex; gap: 8px; padding: 12px 16px;
        border-top: 1px solid #f0f0f0;
      }
    }
    .btn-edit {
      padding: 6px 14px; border-radius: 6px;
      background: #e8f4ea; color: #2d6a4f;
      border: none; cursor: pointer; font-size: 0.8rem;
      font-weight: 600; transition: all 0.2s;
      &:hover { background: #2d6a4f; color: white; }
    }
    .btn-delete {
      padding: 6px 14px; border-radius: 6px;
      background: #fef0f0; color: #dc3545;
      border: none; cursor: pointer; font-size: 0.8rem;
      font-weight: 600; transition: all 0.2s;
      &:hover { background: #dc3545; color: white; }
    }
    .galeria-admin-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 16px;
    }
    .galeria-admin-item {
      position: relative; border-radius: 12px;
      overflow: hidden; aspect-ratio: 4/3;
      img { width: 100%; height: 100%; object-fit: cover; }
      &:hover .galeria-overlay { opacity: 1; }
    }
    .galeria-overlay {
      position: absolute; inset: 0;
      background: rgba(0,0,0,0.6);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 12px;
      opacity: 0; transition: opacity 0.3s;
      span { color: white; font-weight: 600; font-size: 0.9rem; }
      button {
        padding: 8px 16px; border-radius: 8px;
        background: #dc3545; color: white;
        border: none; cursor: pointer; font-size: 0.875rem;
      }
    }
    .empty-state {
      grid-column: 1/-1;
      text-align: center; padding: 60px;
      span { font-size: 3rem; display: block; margin-bottom: 12px; }
      p { color: #999; }
    }
  `]
})
export class AdminComponent implements OnInit {
  private fbService = inject(FirebaseService);
  private authService = inject(AuthService);

  tabActivo = signal('servicios');
  formServicioVisible = signal(false);
  formGaleriaVisible = signal(false);
  guardando = signal(false);

  servicios: Servicio[] = [];
  galeria: GaleriaItem[] = [];
  editandoServicio: string | null = null;
  imagenServicioFile: File | null = null;
  imagenGaleriaFile: File | null = null;
  userEmail = '';

  formServicio: Servicio = {
    nombre: '', descripcion: '', imagen: '',
    categoria: '', activo: true
  };

  formGaleria: GaleriaItem = {
    url: '', titulo: '', categoria: ''
  };

  tabs = [
    { id: 'servicios', icon: '🛠️', label: 'Servicios' },
    { id: 'galeria', icon: '🖼️', label: 'Galería' },
  ];

  tabLabel() {
    return this.tabs.find(t => t.id === this.tabActivo())?.label || '';
  }

  ngOnInit() {
    this.userEmail = this.authService.getCurrentUser()?.email || '';
    this.fbService.getServicios().subscribe(d => this.servicios = d);
    this.fbService.getGaleria().subscribe(d => this.galeria = d);
  }

  abrirFormServicio() {
    this.editandoServicio = null;
    this.formServicio = { nombre: '', descripcion: '', imagen: '', categoria: '', activo: true };
    this.formServicioVisible.set(true);
  }

  editarServicio(s: Servicio) {
    this.editandoServicio = s.id!;
    this.formServicio = { ...s };
    this.formServicioVisible.set(true);
  }

  onImagenServicio(event: any) {
    this.imagenServicioFile = event.target.files[0];
  }

  onImagenGaleria(event: any) {
    this.imagenGaleriaFile = event.target.files[0];
  }

  async guardarServicio() {
    if (!this.formServicio.nombre) return;
    this.guardando.set(true);
    try {
      if (this.editandoServicio) {
        await this.fbService.updateServicio(
          this.editandoServicio,
          this.formServicio,
          this.imagenServicioFile || undefined
        );
      } else {
        await this.fbService.addServicio(
          this.formServicio,
          this.imagenServicioFile!
        );
      }
      this.formServicioVisible.set(false);
      this.editandoServicio = null;
    } catch (e) {
      console.error(e);
    }
    this.guardando.set(false);
  }

  async eliminarServicio(id: string) {
    if (confirm('¿Seguro que deseas eliminar este servicio?')) {
      await this.fbService.deleteServicio(id);
    }
  }

  async guardarGaleria() {
    if (!this.imagenGaleriaFile || !this.formGaleria.titulo) return;
    this.guardando.set(true);
    try {
      await this.fbService.addGaleriaItem(this.formGaleria, this.imagenGaleriaFile);
      this.formGaleriaVisible.set(false);
      this.formGaleria = { url: '', titulo: '', categoria: '' };
    } catch (e) {
      console.error(e);
    }
    this.guardando.set(false);
  }

  async eliminarGaleria(id: string) {
    if (confirm('¿Seguro que deseas eliminar esta foto?')) {
      await this.fbService.deleteGaleriaItem(id);
    }
  }

  logout() { this.authService.logout(); }
}
