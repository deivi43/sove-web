import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  user$: Observable<any> = user(this.auth);

  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/admin']);
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.router.navigate(['/']);
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }
}
