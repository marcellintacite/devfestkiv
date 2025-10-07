import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Profil } from './profil/profil';
import { Generator } from './generator/generator';

@Component({
  selector: 'app-dp-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, Profil, Generator],
  template: `
    <div class="min-h-screen py-12 md:py-16">
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
      <div class="container mx-auto px-4 mb-12 text-center">
        <div class="flex justify-center gap-4">
          <button
            (click)="activeTab = 'profile'"
            [class.bg-amber-600]="activeTab === 'profile'"
            [class.text-white]="activeTab === 'profile'"
            class="px-6 py-3 rounded-full font-medium transition-all text-gray-700 hover:bg-amber-500 hover:text-white"
          >
            Profile Picture
          </button>

          <button
            (click)="activeTab = 'dp'"
            [class.bg-amber-600]="activeTab === 'dp'"
            [class.text-white]="activeTab === 'dp'"
            class="px-6 py-3 rounded-full font-medium transition-all text-gray-700 hover:bg-amber-500 hover:text-white"
          >
            DP Generator
          </button>
        </div>
      </div>

      @if (activeTab === 'profile') {
      <app-profil></app-profil>
      } 
      
      @if (activeTab === 'dp') {
      <app-generator></app-generator>
      }
    </div>
    
  `,
})
export default class DpGenerator {
  activeTab: 'profile' | 'dp' = 'profile';
}
