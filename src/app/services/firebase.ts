import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, updateDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Servicio {
  id?: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  activo: boolean;
}

export interface GaleriaItem {
  id?: string;
  url: string;
  titulo: string;
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore = inject(Firestore);
  private cloudName = 'dgozpmru5';
  private uploadPreset = 'sove_uploads';

  // ===== CLOUDINARY UPLOAD =====
  async uploadImagen(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    formData.append('cloud_name', this.cloudName);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
      { method: 'POST', body: formData }
    );
    const data = await response.json();
    return data.secure_url;
  }

  // ===== SERVICIOS =====
  getServicios(): Observable<Servicio[]> {
    const serviciosRef = collection(this.firestore, 'servicios');
    return collectionData(serviciosRef, { idField: 'id' }) as Observable<Servicio[]>;
  }

  async addServicio(servicio: Servicio, imagen?: File): Promise<void> {
    let imageUrl = '';
    if (imagen) {
      imageUrl = await this.uploadImagen(imagen);
    }
    await addDoc(collection(this.firestore, 'servicios'), {
      ...servicio,
      imagen: imageUrl
    });
  }

  async updateServicio(id: string, servicio: Partial<Servicio>, imagen?: File): Promise<void> {
    const docRef = doc(this.firestore, 'servicios', id);
    if (imagen) {
      const url = await this.uploadImagen(imagen);
      await updateDoc(docRef, { ...servicio, imagen: url });
    } else {
      await updateDoc(docRef, { ...servicio });
    }
  }

  async deleteServicio(id: string): Promise<void> {
    await deleteDoc(doc(this.firestore, 'servicios', id));
  }

  // ===== GALERÍA =====
  getGaleria(): Observable<GaleriaItem[]> {
    const galeriaRef = collection(this.firestore, 'galeria');
    return collectionData(galeriaRef, { idField: 'id' }) as Observable<GaleriaItem[]>;
  }

  async addGaleriaItem(item: GaleriaItem, imagen: File): Promise<void> {
    const url = await this.uploadImagen(imagen);
    await addDoc(collection(this.firestore, 'galeria'), {
      ...item,
      url
    });
  }

  async deleteGaleriaItem(id: string): Promise<void> {
    await deleteDoc(doc(this.firestore, 'galeria', id));
  }
}
