import { Component, EventEmitter, inject, Inject, Output, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-code-pin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <!-- Dialog -->
      <div class="relative bg-white rounded-2xl shadow-xl p-6 w-80 animate-fade-in">
        <!-- Bouton fermer -->
        <button
          (click)="onClose()"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
        >
          ✕
        </button>

        <h2 class="text-xl font-bold mb-4 text-center">Accès Administrateur</h2>

        <p class="text-sm text-gray-600 mb-4 text-center">
          Entrez votre code PIN pour accéder à la page admin.
        </p>

        <!-- Champ code PIN -->
        <input
          type="password"
          [(ngModel)]="pin"
          placeholder="Code PIN"
          class="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <!-- Message d'erreur -->
        @if(error){
        <p class="text-red-500 text-sm mb-2 text-center">{{ error }}</p>
        }

        <!-- Bouton valider -->
        <div class="flex justify-center">
          <button
            (click)="validatePin()"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .animate-fade-in {
        animation: fadeIn 0.25s ease-in-out;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `,
  ],
})
export class CodePin {
  pin: string = '';
  error: string = '';

  /** Valeur par défaut du code PIN */
  private readonly defaultPin = 'dev2025';


  /** Événement pour fermer le dialog */
  @Output() close = new EventEmitter<void>();

  // inject
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  validatePin() {
    if (this.pin === this.defaultPin) {
      // Stocker l'état de connexion dans sessionStorage
        if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem('adminAccess', 'true');
        }
   

      // Redirection vers la route admin
      this.router.navigate(['/live_q/admin']);

      // Fermer le dialog
      this.onClose();
    } else {
      this.error = 'Code PIN incorrect. Veuillez réessayer.';
    }
  }

  onClose() {
    this.close.emit();
  }
}
