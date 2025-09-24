import { Component } from '@angular/core';
import PastEventsGallery from '../../components/past-events-gallery/past-events-gallery';

@Component({
  selector: 'app-home',
  imports: [PastEventsGallery],
  template: `
    <!-- Hero Section -->
    <section class="hero-section relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-md sm:px-lg lg:px-xl relative z-10">
        
        <!-- Hero Content -->
        <div class="text-center pt-8 pb-12 md:pt-lg md:pb-lg relative">
          <!-- Title Illustrations - Hidden on mobile for cleaner look -->
          <div class="absolute inset-0 pointer-events-none hidden lg:block">
            <!-- Left side illustrations -->
            <img 
              src="/assets/illustrations/bracket.png" 
              alt="" 
              class="absolute top-1/4 -left-16 w-12 opacity-60 animate-pulse"
            >
            <img 
              src="/assets/illustrations/superior.png" 
              alt="" 
              class="absolute top-3/4 -left-20 w-14 opacity-60 animate-bounce"
            >
            
            <!-- Right side illustrations -->
            <img 
              src="/assets/illustrations/dot.png" 
              alt="" 
              class="absolute top-1/3 -right-14 w-10 opacity-60 animate-pulse"
            >
            <img 
              src="/assets/illustrations/threedot.png" 
              alt="" 
              class="absolute top-2/3 -right-18 w-12 opacity-60 animate-bounce"
            >
          </div>
          
          <!-- Mobile Decorative Elements -->
          <div class="absolute inset-0 pointer-events-none lg:hidden">
            <div class="absolute top-4 left-4 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <div class="absolute top-8 right-6 w-2 h-2 bg-secondary rounded-full animate-bounce"></div>
            <div class="absolute bottom-8 left-8 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          </div>
          
          <!-- Main Title -->
          <h1 class="hero-title text-4xl md:text-6xl lg:text-7xl font-bold text-text mb-md relative z-10">
            DevFest Kivu
            <span class="text-primary">2025</span>
          </h1>
          
          <!-- Subtitle -->
          <p class="hero-subtitle text-lg md:text-xl lg:text-2xl text-text/80 max-w-3xl mx-auto leading-relaxed mb-lg">
            Le plus grand festival technologique de la région des Grands Lacs. 
            Découvrez les innovations, rencontrez les experts et façonnez l'avenir de la tech en Afrique.
          </p>
          
          <!-- CTA Button -->
          <div class="mb-xl">
            <a 
              href="#" 
              class="btn btn-primary btn-lg"
            >
              S'inscrire maintenant
            </a>
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
              class="absolute top-1/2 -left-24 w-16 -translate-y-1/2 opacity-50 animate-pulse"
            >
            
            <!-- Right of video -->
            <img 
              src="/assets/illustrations/bar.png" 
              alt="" 
              class="absolute top-1/2 -right-20 w-14 -translate-y-1/2 opacity-50 animate-bounce"
            >
          </div>
          
          <!-- YouTube Video Embed -->
          <div class="video-wrapper relative z-10 rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl hover:shadow-2xl md:hover:shadow-3xl hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 w-full max-w-4xl mx-auto">
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

    <!-- Impact Section -->
    <section class="bg-primary py-12 md:py-16 lg:py-20">
      <div class="max-w-7xl mx-auto px-md sm:px-lg lg:px-xl">
        <!-- Section Header -->
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
            Notre Impact
          </h2>
          <p class="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Plus de 5 années d'engagement pour l'écosystème technologique de la région
          </p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <!-- Events Organized -->
          <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
              30+
            </div>
            <div class="text-xs sm:text-sm md:text-base text-white/90 font-medium">
              Événements Organisés
            </div>
          </div>

          <!-- Developers Gathered -->
          <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
              500+
            </div>
            <div class="text-xs sm:text-sm md:text-base text-white/90 font-medium">
              Développeurs Rassemblés
            </div>
          </div>

          <!-- Partners -->
          <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
              10+
            </div>
            <div class="text-xs sm:text-sm md:text-base text-white/90 font-medium">
              Startups & Entreprises
            </div>
          </div>

          <!-- People Trained -->
          <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
              700+
            </div>
            <div class="text-xs sm:text-sm md:text-base text-white/90 font-medium">
              Personnes Formées
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="text-center mt-6 md:mt-8">
          <p class="text-xs sm:text-sm md:text-base text-white/80 max-w-3xl mx-auto">
            Formation en ligne et en présentiel • Partenariats locaux • Innovation continue
          </p>
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
  `
})
export default class Home {

}
