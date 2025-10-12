import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SpeakersService } from '../../service/speakers.service';
import { Speaker } from '../../models/speaker.model';
import { EventConfigService } from '../../config/event-config.service';

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
 template: `
  <div class="min-h-screen bg-gray-50 relative">
    <!-- Hero -->
    <section class="relative text-center py-16 px-4">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Nos <span class="text-yellow-500">Speakers</span>
        </h1>
        <p class="text-gray-600 text-lg leading-relaxed">
          Les voix qui inspireront le DevFest Kivu {{ eventConfig.year }}. Des experts tech qui partagent leur passion et leur expérience.
        </p>
      </div>
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-yellow-50 to-transparent opacity-60"></div>
    </section>

    <!-- Speakers Grid -->
    <div class="max-w-7xl mx-auto px-4 md:px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      @for (speaker of speakers; track speaker.name) {
      <div
        class="group transition-all duration-300 p-4 relative overflow-hidden"
      >

        <!-- Speaker Photo -->
        <div class="flex flex-col items-center text-center mb-6 relative">
          <img
            [ngSrc]="speaker.photo"
            [alt]="speaker.name"
            width="180"
            height="180"
            class="w-40 h-40 rounded-full object-cover border-4 border-gray-200 group-hover:border-yellow-400 transition-all duration-300"
          />

            <!-- Socials -->
            <div
              class="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              @if (speaker.socials.twitter) {
              <a
                [href]="speaker.socials.twitter"
                target="_blank"
                class="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center hover:bg-yellow-500 transition"
                aria-label="Twitter"
              >
                <i class="bi bi-twitter"></i>
              </a>
              }
              @if (speaker.socials.linkedin) {
              <a
                [href]="speaker.socials.linkedin"
                target="_blank"
                class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                aria-label="LinkedIn"
              >
                <i class="bi bi-linkedin"></i>
              </a>
              }
              @if (speaker.socials.github) {
              <a
                [href]="speaker.socials.github"
                target="_blank"
                class="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition"
                aria-label="GitHub"
              >
                <i class="bi bi-github"></i>
              </a>
              }
            </div>
          </div>

        <!-- Info -->
        <div class="text-center">
          <h3 class="text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition">
            {{ speaker.name }}
          </h3>
          <p class="text-sm uppercase tracking-wide text-yellow-600 font-medium mt-1 mb-3">
            {{ speaker.title }}
          </p>

          <div class="w-10 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-3"></div>

          <p class="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {{ speaker.bio }}
          </p>
        </div>
      </div>
      }
    </div>
  </div>
`
,
  styles: ``,
})
export default class Speakers implements OnInit {
  speakersService = inject(SpeakersService);
  eventConfig = inject(EventConfigService);
  speakers: Speaker[] = [];

  constructor() {
    // Initialize speakers from service
    this.speakers = this.speakersService.speakers || [];
  }

  ngOnInit(): void {
    // Scroll to top when component initializes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
