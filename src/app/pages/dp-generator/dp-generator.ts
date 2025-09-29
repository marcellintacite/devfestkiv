import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dp-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-gray-50 min-h-screen">
      <main class="geometric-bg min-h-screen py-12 md:py-16">
        <!-- Hero -->
        <section class="container mx-auto px-4 mb-12 md:mb-16 text-center">
          <h2 class="text-xs md:text-sm text-gray-600 mb-3 tracking-wide">
            Faites savoir à tout le monde que vous venez !
          </h2>
          <h1 class="text-3xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">
            Créez votre photo d'affichage<br />
            <span class="text-amber-600">DevFest personnalisée</span>
          </h1>
        </section>

        <!-- Form + Preview -->
        <section class="container mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <!-- Form -->
            <div class="lg:col-span-2">
              <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-2">Saisissez vos coordonnées</h3>
                <div class="w-14 md:w-16 h-1 bg-amber-600 mb-6 md:mb-8"></div>

                <form class="space-y-5 md:space-y-6">
                  <!-- Nom -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Nom et prénom
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="fullName"
                      name="fullName"
                      placeholder="Votre nom"
                      class="w-full px-4 py-3 text-base border border-gray-300 rounded-lg 
                             bg-white text-gray-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <!-- Upload -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Télécharger l'image
                    </label>
                    <div
                      class="upload-zone rounded-lg p-6 md:p-8 text-center bg-gray-50 cursor-pointer"
                      (click)="fileInput.click()"
                    >
                      <div class="flex flex-col items-center">
                        <svg
                          class="w-10 h-10 md:w-12 md:h-12 text-gray-400 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p class="text-sm text-gray-600 mb-2">
                          <span class="font-medium text-amber-600">Cliquez</span> ou faites glisser
                          votre photo
                        </p>
                        <p class="text-xs text-gray-500">SVG, PNG, JPG ou GIF (max. 800x400 px)</p>
                      </div>
                      <input
                        type="file"
                        #fileInput
                        class="hidden"
                        accept="image/*"
                        (change)="onFileSelected($event)"
                      />
                    </div>
                  </div>

                  <!-- Générer -->
                  <button
                    type="button"
                    (click)="generateDP()"
                    class="btn-primary w-full text-white font-semibold py-3 md:py-4 px-6 rounded-lg transition-colors text-base md:text-lg bg-amber-600 hover:bg-amber-700"
                  >
                    Générer
                  </button>
                </form>
              </div>
            </div>

            <!-- Preview -->
            <div class="lg:col-span-3">
              <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h3 class="text-xl md:text-2xl font-bold text-center text-gray-900 mb-6 md:mb-8">
                  Aperçu de votre DP
                </h3>
                <div class="flex justify-center">
                  <div
                    class="dp-preview relative w-64 h-80 md:w-80 md:h-96 rounded-2xl md:rounded-3xl p-6 overflow-hidden shadow-2xl"
                  >
                    <!-- Si image uploadée -->
                    @if(previewImage){
                      <img
                        [src]="previewImage"
                        alt="Preview"
                        class="w-full h-full object-cover rounded-xl md:rounded-2xl"
                      />
                    }

                    <!-- Sinon placeholder -->
                    @if(!previewImage){
                      <p
                        class="absolute inset-0 flex items-center justify-center text-gray-700 font-medium text-center px-4"
                      >
                        Votre Design apparaîtra ici
                      </p>
                    }
                  </div>
                </div>
                <p class="text-center mt-6 md:mt-8 text-gray-600 text-xs md:text-sm">
                  Personnalisez vos infos ci-dessus pour voir l’aperçu mis à jour
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [
    `
      .geometric-bg {
        background-image: radial-gradient(
            circle at 20% 80%,
            rgba(255, 140, 0, 0.15) 0%,
            transparent 50%
          ),
          radial-gradient(circle at 80% 20%, rgba(139, 0, 0, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(101, 67, 33, 0.15) 0%, transparent 50%),
          linear-gradient(135deg, rgba(47, 47, 47, 0.05) 0%, transparent 50%);
      }
      .upload-zone {
        border: 2px dashed #cbd5e1;
        transition: all 0.3s ease;
      }
      .upload-zone:hover {
        border-color: #d97706; /* amber */
        background-color: rgba(217, 119, 6, 0.05);
      }
      .dp-preview {
        background: linear-gradient(135deg, #fef3c7, #fde68a, #fbbf24);
      }
    `,
  ],
})
export default class DpGenerator {
  fullName = '';
  previewImage: string | ArrayBuffer | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  generateDP() {
    console.log('Nom:', this.fullName);
    console.log('Image:', this.previewImage);
  }
}
