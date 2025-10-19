import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EventConfigService } from '../../config/event-config.service';

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [CommonModule],
 template: `
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 py-16">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Speakers {{ eventConfig.year }}
        </h1>
        <p class="text-xl text-gray-600">
          Découvrez les intervenants de DevFest Kivu {{ eventConfig.year }}
        </p>
      </div>

      <!-- Coming Soon Content -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Speakers Bientôt Annoncés
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Nous travaillons à constituer une équipe d'experts exceptionnelle pour vous offrir
            des sessions inspirantes et enrichissantes. Restez connectés !
          </p>
        </div>

        <!-- Event Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <!-- Date -->
          <div class="text-center">
            <div class="flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">Date</span>
            </div>
            <p class="text-lg font-semibold text-gray-900">
              {{ eventConfig.date.display.start }} {{ eventConfig.date.display.month }} {{ eventConfig.date.display.year }}
            </p>
            <p class="text-sm text-gray-500 mt-1">9h00 - 18h00</p>
          </div>

          <!-- Location -->
          <div class="text-center">
            <div class="flex items-center justify-center mb-3">
              <svg class="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">Lieu</span>
            </div>
            <p class="text-lg font-semibold text-gray-900">
              {{ eventConfig.venue.conferenceCenter }}
            </p>
            <p class="text-sm text-gray-500 mt-1">{{ eventConfig.venue.fullLocation }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
`
,
  styles: ``,
})
export default class Speakers implements OnInit {
  eventConfig = inject(EventConfigService);

  ngOnInit(): void {
    // Scroll to top when component initializes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
