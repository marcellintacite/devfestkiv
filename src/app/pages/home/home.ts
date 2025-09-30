import { Component } from '@angular/core';
import PastEventsGallery from '../../components/past-events-gallery/past-events-gallery';
import { RouterLink } from '@angular/router';
import { start } from 'repl';

@Component({
  selector: 'app-home',
  imports: [PastEventsGallery, RouterLink],
  template: `
    <!-- Hero Section -->
    <section
      class="hero-section relative overflow-hidden bg-gradient-to-br from-background via-primary-pastel to-background"
    >
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-10 left-15 w-20 h-20 bg-primary rounded-full animate-pulse"></div>
        <div
          class="absolute top-32 right-10 w-12 h-12 bg-secondary rounded-full animate-bounce"
        ></div>
      </div>

      <div class="max-w-7xl mx-auto px-md sm:px-lg lg:px-xl relative z-10">
        <!-- Hero Content -->
        <div class="text-center pt-8 pb-12 md:pt-lg md:pb-lg relative">
          <div class="absolute inset-0 pointer-events-none hidden lg:block">
            <!-- Left side illustrations -->
            <img
              src="/assets/illustrations/bracket.png"
              alt=""
              class="absolute top-1/4 left-16 w-12 opacity-60 animate-pulse"
            />
            <img
              src="/assets/illustrations/superior.png"
              alt=""
              class="absolute top-3/4 left-10 w-14 opacity-60 animate-bounce"
            />

            <!-- Right side illustrations -->
            <img
              src="/assets/illustrations/dot.png"
              alt=""
              class="absolute top-1/3 right-30 w-10 opacity-60 animate-pulse"
            />
            <img
              src="/assets/illustrations/threedot.png"
              alt=""
              class="absolute top-2/3 right-15 w-12 opacity-60 animate-bounce"
            />
          </div>

          <!-- Mobile Decorative Elements -->
          <div class="absolute inset-0 pointer-events-none lg:hidden">
            <div class="absolute top-4 left-4 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <div
              class="absolute top-8 right-6 w-2 h-2 bg-secondary rounded-full animate-bounce"
            ></div>
            <div
              class="absolute bottom-8 left-8 w-2 h-2 bg-accent rounded-full animate-pulse"
            ></div>
          </div>
          <!-- Main Title -->
          <div class="hero-content animate-fade-in-up">
            <h1
              class="hero-title text-4xl md:text-6xl lg:text-7xl font-bold text-text mb-md relative z-10"
            >
              DevFest Kivu
              <span class=" bg-gradient-to-r text-primary from-primary to-accent bg-clip-text">{{
                NowDate.getFullYear()
              }}</span>
            </h1>

            <!-- Subtitle -->
            <p
              class="hero-subtitle text-lg md:text-xl lg:text-2xl text-text/80 max-w-3xl mx-auto leading-relaxed mb-lg"
            >
              Le plus grand festival technologique de la région des Grands Lacs.
              <span class="text-primary font-semibold">Découvrez les innovations</span>, rencontrez
              les experts et façonnez l'avenir de la tech en Afrique.
            </p>

            <!-- CTA Section -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-xl">
              <a href="#" class="btn btn-primary btn-lg group">
                <span>S'inscrire maintenant</span>
                <svg
                  class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </a>
              <a href="#impact" class="btn btn-outline btn-lg">
                En savoir plus
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </a>
            </div>

            <!-- Event Details -->
            <div
              class="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base text-text/70 mb-lg"
            >
              <div class="flex items-center gap-2">
                <svg
                  class="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span
                  >{{ eventDay.start }}-{{ eventDay.end }} {{ eventDay.month }}
                  {{ eventDay.year }}</span
                >
              </div>
              <div class="flex items-center gap-2">
                <svg
                  class="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span>Bukavu, RD Congo</span>
              </div>
              <div class="flex items-center gap-2">
                <svg
                  class="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  ></path>
                </svg>
                <span> {{ stats[1].number }} Participants</span>
              </div>
            </div>
          </div>
        </div>

        <!-- YouTube Video Container -->
        <div class="video-container relative mb-16 md:mb-20">
          <!-- Video Side Illustrations - Hidden on mobile -->
          <div class="absolute inset-0 pointer-events-none hidden lg:block">
            <!-- Left of video -->
            <img
              src="/assets/illustrations/inferior.png"
              alt=""
              class="absolute top-1/2 left-5 w-16 -translate-y-1/2 opacity-50 animate-pulse"
            />

            <!-- Right of video -->
            <img
              src="/assets/illustrations/bar.png"
              alt=""
              class="absolute top-1/2 right-10 w-14 -translate-y-1/2 opacity-50 animate-bounce"
            />
          </div>
          <div
            class="video-wrapper relative z-10 rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl hover:shadow-2xl md:hover:shadow-3xl hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 w-full max-w-4xl mx-auto"
          >
            <iframe
              src="https://www.youtube.com/embed/O4DvVTkfcTs"
              title="DevFest Kivu 2025 - Vidéo de présentation"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              class="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- Countdown Section -->
    <section class="py-12 md:py-16 bg-white">
      <div class="max-w-4xl mx-auto px-md text-center">
        <h3 class="text-2xl md:text-3xl font-bold text-text mb-8">
          Plus que {{ daysLeft }} jours avant DevFest Kivu {{ NowDate.getFullYear() }}
        </h3>
        <div class="grid grid-cols-4 gap-4 md:gap-8">
          <div class="bg-primary/10 rounded-lg p-4 md:p-6">
            <div class="text-2xl md:text-4xl font-bold text-primary">{{ countdown.days }}</div>
            <div class="text-sm md:text-base text-text/70 truncate">Jours</div>
          </div>
          <div class="bg-secondary/10 rounded-lg p-4 md:p-6">
            <div class="text-2xl md:text-4xl font-bold text-secondary">{{ countdown.hours }}</div>
            <div class="text-sm md:text-base text-text/70 truncate">Heures</div>
          </div>
          <div class="bg-accent/10 rounded-lg p-4 md:p-6">
            <div class="text-2xl md:text-4xl font-bold text-accent">{{ countdown.minutes }}</div>
            <div class="text-sm md:text-base text-text/70 truncate">Minutes</div>
          </div>
          <div class="bg-danger/10 rounded-lg p-4 md:p-6">
            <div class="text-2xl md:text-4xl font-bold text-danger">{{ countdown.seconds }}</div>
            <div class="text-sm md:text-base text-text/70 truncate">Secondes</div>
          </div>
        </div>
        <br />
        <a [routerLink]="'/agenda'" class="btn btn-outline btn-lg">
          Voir le programme
          <svg
            class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </a>
      </div>
    </section>
    <!-- Impact Section -->
    <section class="bg-primary-pastel py-12 md:py-16 lg:py-20 relative overflow-hidden" id="impact">
      <div class="absolute inset-0">
        <!-- Floating geometric shapes -->
        <div class="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full animate-pulse"></div>
        <div
          class="absolute top-32 right-20 w-24 h-24 bg-accent rounded-lg rotate-45 animate-float-delayed"
        ></div>
        <div
          class="absolute bottom-20 left-1/4 w-20 h-20 bg-secondary rounded-full animate-bounce"
        ></div>
        <div
          class="absolute bottom-32 right-1/3 w-16 h-16 bg-white rounded-lg rotate-12 animate-bounce"
        ></div>

        <!-- Grid pattern -->
        <div class="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-md sm:px-lg lg:px-xl relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-3 md:mb-4">
            Notre Impact
          </h2>
          <p class="text-base sm:text-lg md:text-xl text-text/80 max-w-3xl mx-auto leading-relaxed">
            Plus de {{ engagementYear }} années d'engagement pour l'écosystème technologique de la
            région
          </p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          @for (stat of impactStats; track $index) {
          <div
            class="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 text-center"
          >
            <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
              {{ stat.number }}
            </div>
            <div class="text-sm md:text-base text-text/80 font-medium mb-2">
              {{ stat.label }}
            </div>
            <div class="text-xs md:text-sm text-text/60">
              {{ stat.description }}
            </div>
          </div>
          }
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-10">
          <a href="#" class="btn btn-primary btn-lg">
            Rejoignez notre communauté
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </a>
          <p class="text-xs sm:text-sm md:text-base text-text/70 mt-4 max-w-3xl mx-auto">
            Formation en ligne et en présentiel • Partenariats locaux • Innovation continue
          </p>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-primary-pastel">
      <div class="max-w-7xl mx-auto px-md sm:px-lg lg:px-xl">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-3 md:mb-4">
            Ils nous font confiance
          </h2>
          <p class="text-sm sm:text-base md:text-lg text-text/80 max-w-2xl mx-auto">
            Découvrez les témoignages de nos anciens participants
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 md:gap-8">
          @for (testimonial of testimonials; track $index) {
          <div
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <div class="flex items-center mb-4">
              <!-- <img
                [src]="'/assets/avatars/avatar-' + ($index + 1) + '.jpg'"
                [alt]="testimonial.name"
                class="w-12 h-12 rounded-full mr-4 bg-primary-pastel"
              /> -->
              <img
                [src]="'/assets/logo.png'"
                [alt]="testimonial.name"
                class="w-12 h-12 rounded-full mr-4 bg-primary-pastel"
              />
              <div>
                <h4 class="font-semibold text-text">{{ testimonial.name }}</h4>
                <p class="text-sm text-text/70">{{ testimonial.role }}</p>
              </div>
            </div>
            <p class="text-text/80 italic">"{{ testimonial.quote }}"</p>
            <div class="flex text-primary mt-4">
              @for (star of Array(5).fill(0); track $index) {
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                ></path>
              </svg>
              }
            </div>
          </div>
          }
        </div>
      </div>
    </section>
    <!-- Past Events Gallery -->
    <app-past-events-gallery></app-past-events-gallery>
  `,
  styles: `
    .video-wrapper {
      aspect-ratio: 16 / 9;
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
})
export default class Home {
  daysLeft = 45;
  countdown = { days: 45, hours: 12, minutes: 30, seconds: 15 };
  NowDate = new Date();
  eventDay = { start: 5, end: 6, month: 'Décembre', year: 2025 };
  engagementYear = 5;

  stats = [
    { number: '30+', label: 'Événements Organisés' },
    { number: '500+', label: 'Développeurs Rassemblés' },
    { number: '10+', label: 'Startups & Entreprises' },
    { number: '700+', label: 'Personnes Formées' },
  ];

  impactStats = [
    {
      number: '30+',
      rawNumber: 30,
      label: 'Événements Organisés',
      description: 'Conférences, workshops,...',
    },
    {
      number: '500+',
      rawNumber: 500,
      label: 'Développeurs Rassemblés',
      description: 'Une communauté grandissante',
    },
    {
      number: '10+',
      rawNumber: 10,
      label: 'Startups & Entreprises',
      description: 'Partenaires et sponsors',
    },
    {
      number: '700+',
      rawNumber: 700,
      label: 'Personnes Formées',
      description: 'Compétences développées',
    },
  ];

  impactFeatures = [
    'Formation en ligne et en présentiel',
    'Partenariats locaux ',
    'Innovation continue et recherche',
  ];

  testimonials = [
    {
      name: 'Marie Uwimana',
      role: 'Développeuse Full-Stack',
      quote:
        "DevFest Kivu m'a permis de découvrir les dernières technologies et de rencontrer des experts passionnés.",
    },
    {
      name: 'Jean Baptiste',
      role: 'CEO Tech Startup',
      quote:
        'Un événement incontournable pour tous les acteurs de la tech en région des Grands Lacs.',
    },
    {
      name: 'Sarah Mukamana',
      role: 'Data Scientist',
      quote:
        "Les workshops pratiques m'ont donné les compétences nécessaires pour évoluer dans ma carrière.",
    },
  ];

  Array = Array;
}
