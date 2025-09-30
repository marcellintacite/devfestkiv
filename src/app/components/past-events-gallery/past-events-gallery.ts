import { Component } from '@angular/core';

@Component({
  selector: 'app-past-events-gallery',
  imports: [],
  template: `
    <section
      class="py-12 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-primary-pastel/20 to-white"
    >
      <div class="max-w-7xl mx-auto px-md sm:px-lg lg:px-xl mb-8 md:mb-12">
        <!--Section Header -->
        <div class="text-center">
          <div class="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 mb-4">
            <svg
              class="w-4 h-4 text-primary mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span class="text-primary text-sm font-medium">Galerie Photos</span>
          </div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-3 md:mb-4">
            Nos Événements Passés
          </h2>
          <p class="text-sm sm:text-base md:text-lg text-text/80 max-w-2xl mx-auto">
            Découvrez les moments forts de nos précédentes éditions DevFest Kivu et revivez
            l'ambiance unique de notre communauté tech
          </p>
        </div>
      </div>

      <!-- First Row - Left to Right -->
      <div class="gallery-row mb-3 md:mb-4">
        <div class="scroll-left-to-right">
          @for (item of firstRowEvents; track $index) {
          <div class="gallery-item group">
            <!-- Dynamic image based on event type -->
            <img [src]="item.image" [alt]="item.title" class="gallery-image" />

            <!-- Category Badge -->
            <div class="absolute top-4 left-4 z-10">
              <span
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm"
                [class]="item.badgeColor"
              >
                <div class="w-2 h-2 rounded-full mr-1" [class]="item.dotColor"></div>
                {{ item.category }}
              </span>
            </div>

            <!-- Participants Count -->
            <div class="absolute top-4 right-4 z-10">
              <div
                class="flex items-center bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs"
              >
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"
                  ></path>
                </svg>
                {{ item.participants }}
              </div>
            </div>

            <!-- Enhanced gradient overlay -->
            <div class="enhanced-overlay"></div>

            <!-- Content overlay with more details -->
            <div class="image-overlay">
              <div class="overlay-content">
                <!-- Date and location -->
                <div class="flex items-center text-white/80 text-xs mb-2">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span>{{ item.date }} • {{ item.location }}</span>
                </div>

                <!-- Title -->
                <h4 class="text-white font-bold text-sm md:text-base mb-2">
                  {{ item.title }}
                </h4>

                <!-- Description -->
                <p class="text-white/90 text-xs md:text-sm mb-3 line-clamp-2">
                  {{ item.description }}
                </p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-1 mb-3">
                  @for (tag of item.tags; track $index) {
                  <span class="inline-block bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                    {{ tag }}
                  </span>
                  }
                </div>

                <!-- Action button -->
                <button
                  class="w-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
                >
                  Voir les photos
                </button>
              </div>
            </div>
          </div>
          }

          <!-- Duplicate set for seamless loop -->
          @for (item of firstRowEvents; track $index) {
          <div class="gallery-item group">
            <img [src]="item.image" [alt]="item.title" class="gallery-image" />
            <div class="absolute top-4 left-4 z-10">
              <span
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm"
                [class]="item.badgeColor"
              >
                <div class="w-2 h-2 rounded-full mr-1" [class]="item.dotColor"></div>
                {{ item.category }}
              </span>
            </div>
            <div class="absolute top-4 right-4 z-10">
              <div
                class="flex items-center bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs"
              >
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"
                  ></path>
                </svg>
                {{ item.participants }}
              </div>
            </div>
            <div class="enhanced-overlay"></div>
            <div class="image-overlay">
              <div class="overlay-content">
                <div class="flex items-center text-white/80 text-xs mb-2">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span>{{ item.date }} • {{ item.location }}</span>
                </div>
                <h4 class="text-white font-bold text-sm md:text-base mb-2">{{ item.title }}</h4>
                <p class="text-white/90 text-xs md:text-sm mb-3 line-clamp-2">
                  {{ item.description }}
                </p>
                <div class="flex flex-wrap gap-1 mb-3">
                  @for (tag of item.tags; track $index) {
                  <span
                    class="inline-block bg-white/20 text-white text-xs px-2 py-1 rounded-full"
                    >{{ tag }}</span
                  >
                  }
                </div>
                <button
                  class="w-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
                >
                  Voir les photos
                </button>
              </div>
            </div>
          </div>
          }
        </div>
      </div>

      <!-- Second Row - Right to Left -->
      <div class="gallery-row">
        <div class="scroll-right-to-left">
          @for (item of secondRowEvents; track $index) {
          <div class="gallery-item group">
            <img [src]="item.image" [alt]="item.title" class="gallery-image" />
            <div class="absolute top-4 left-4 z-10">
              <span
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm"
                [class]="item.badgeColor"
              >
                <div class="w-2 h-2 rounded-full mr-1" [class]="item.dotColor"></div>
                {{ item.category }}
              </span>
            </div>
            <div class="absolute top-4 right-4 z-10">
              <div
                class="flex items-center bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs"
              >
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"
                  ></path>
                </svg>
                {{ item.participants }}
              </div>
            </div>
            <div class="enhanced-overlay"></div>
            <div class="image-overlay">
              <div class="overlay-content">
                <div class="flex items-center text-white/80 text-xs mb-2">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span>{{ item.date }} • {{ item.location }}</span>
                </div>
                <h4 class="text-white font-bold text-sm md:text-base mb-2">{{ item.title }}</h4>
                <p class="text-white/90 text-xs md:text-sm mb-3 line-clamp-2">
                  {{ item.description }}
                </p>
                <div class="flex flex-wrap gap-1 mb-3">
                  @for (tag of item.tags; track $index) {
                  <span
                    class="inline-block bg-white/20 text-white text-xs px-2 py-1 rounded-full"
                    >{{ tag }}</span
                  >
                  }
                </div>
                <button
                  class="w-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
                >
                  Voir les photos
                </button>
              </div>
            </div>
          </div>
          }

          <!-- Duplicate set -->
          @for (item of secondRowEvents; track $index) {
          <div class="gallery-item group">
            <img [src]="item.image" [alt]="item.title" class="gallery-image" />
            <div class="absolute top-4 left-4 z-10">
              <span
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm"
                [class]="item.badgeColor"
              >
                <div class="w-2 h-2 rounded-full mr-1" [class]="item.dotColor"></div>
                {{ item.category }}
              </span>
            </div>
            <div class="absolute top-4 right-4 z-10">
              <div
                class="flex items-center bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs"
              >
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"
                  ></path>
                </svg>
                {{ item.participants }}
              </div>
            </div>
            <div class="enhanced-overlay"></div>
            <div class="image-overlay">
              <div class="overlay-content">
                <div class="flex items-center text-white/80 text-xs mb-2">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span>{{ item.date }} • {{ item.location }}</span>
                </div>
                <h4 class="text-white font-bold text-sm md:text-base mb-2">{{ item.title }}</h4>
                <p class="text-white/90 text-xs md:text-sm mb-3 line-clamp-2">
                  {{ item.description }}
                </p>
                <div class="flex flex-wrap gap-1 mb-3">
                  @for (tag of item.tags; track $index) {
                  <span
                    class="inline-block bg-white/20 text-white text-xs px-2 py-1 rounded-full"
                    >{{ tag }}</span
                  >
                  }
                </div>
                <button
                  class="w-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
                >
                  Voir les photos
                </button>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .gallery-row {
      position: relative;
      width: 100%;
    }

    .scroll-left-to-right,
    .scroll-right-to-left {
      display: flex;
      gap: 1.5rem;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      width: fit-content;
    }

    .scroll-left-to-right {
      animation: scrollLeftToRight 100s linear infinite;
    }

    .scroll-right-to-left {
      animation: scrollRightToLeft 90s linear infinite;
    }

    .gallery-item {
      position: relative;
      flex-shrink: 0;
      width: 320px;
      height: 420px;
      border-radius: 20px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 
        0 10px 40px rgba(0, 0, 0, 0.1),
        0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .gallery-item:hover {
      transform: scale(1.05) translateY(-15px) rotateX(2deg);
      box-shadow: 
        0 30px 60px rgba(0, 0, 0, 0.25),
        0 12px 24px rgba(0, 0, 0, 0.15);
    }

    .gallery-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease-out, filter 0.3s ease;
    }

    .gallery-item:hover .gallery-image {
      transform: scale(1.1);
      filter: brightness(1.1) contrast(1.05);
    }

    .enhanced-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        transparent 0%,
        rgba(0, 0, 0, 0.1) 30%,
        rgba(0, 0, 0, 0.4) 70%,
        rgba(0, 0, 0, 0.8) 100%
      );
      opacity: 0;
      transition: opacity 0.6s ease-out;
      pointer-events: none;
    }

    .gallery-item:hover .enhanced-overlay {
      opacity: 1;
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(0, 0, 0, 0.1) 40%,
        rgba(0, 0, 0, 0.6) 80%,
        rgba(0, 0, 0, 0.9) 100%
      );
      opacity: 0;
      transition: opacity 0.6s ease-out;
      display: flex;
      align-items: flex-end;
      padding: 2rem 1.5rem 1.5rem;
    }

    .gallery-item:hover .image-overlay {
      opacity: 1;
    }

    .overlay-content {
      width: 100%;
      transform: translateY(20px);
      transition: transform 0.6s ease-out;
    }

    .gallery-item:hover .overlay-content {
      transform: translateY(0);
    }

    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Enhanced Animations */
    @keyframes scrollLeftToRight {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    @keyframes scrollRightToLeft {
      0% {
        transform: translateX(-50%);
      }
      100% {
        transform: translateX(0);
      }
    }

    /* Pause on hover */
    .gallery-row:hover .scroll-left-to-right,
    .gallery-row:hover .scroll-right-to-left {
      animation-play-state: paused;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .gallery-item {
        width: 260px;
        height: 340px;
      }

      .scroll-left-to-right {
        animation-duration: 70s;
        gap: 1rem;
      }

      .scroll-right-to-left {
        animation-duration: 60s;
        gap: 1rem;
      }

      .image-overlay {
        padding: 1.5rem 1rem 1rem;
      }
    }

    @media (max-width: 480px) {
      .gallery-item {
        width: 220px;
        height: 280px;
      }

      .scroll-left-to-right {
        animation-duration: 50s;
        gap: 0.75rem;
      }

      .scroll-right-to-left {
        animation-duration: 45s;
        gap: 0.75rem;
      }

      .image-overlay {
        padding: 1rem 0.75rem 0.75rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .scroll-left-to-right,
      .scroll-right-to-left,
      .gallery-item {
        animation: none;
      }
      
      .gallery-item:hover {
        transform: none;
      }
    }
  `,
})
export default class PastEventsGallery {
  firstRowEvents = [
    {
      image: '/assets/devfest-1.jpg',
      title: 'DevFest Kivu 2024',
      description:
        'Grande conférence annuelle avec des speakers internationaux et des workshops innovants sur les dernières technologies.',
      date: 'Mars 2024',
      location: 'Bukavu',
      category: 'Conférence',
      participants: '400+',
      tags: ['AI/ML', 'Cloud', 'Mobile'],
      badgeColor: 'text-blue-700 bg-blue-100',
      dotColor: 'bg-blue-500',
    },
    {
      image: '/assets/devfest-1.jpg',
      title: 'Workshop Flutter',
      description:
        'Atelier pratique de développement mobile avec Flutter, de la conception à la publication sur les stores.',
      date: 'Février 2024',
      location: 'Bukavu',
      category: 'Workshop',
      participants: '50+',
      tags: ['Flutter', 'Mobile', 'UI/UX'],
      badgeColor: 'text-green-700 bg-green-100',
      dotColor: 'bg-green-500',
    },
    {
      image: '/assets/devfest-1.jpg',
      title: 'AI/ML Meetup',
      description:
        "Rencontre dédiée à l'intelligence artificielle et au machine learning avec des cas d'usage africains.",
      date: 'Janvier 2024',
      location: 'Bukavu',
      category: 'Meetup',
      participants: '80+',
      tags: ['AI', 'Machine Learning', 'Data'],
      badgeColor: 'text-purple-700 bg-purple-100',
      dotColor: 'bg-purple-500',
    },
    {
      image: '/assets/devfest-1.jpg',
      title: 'Startup Pitch Night',
      description:
        "Soirée de présentation de startups locales devant un jury d'investisseurs et d'experts du secteur.",
      date: 'Décembre 2023',
      location: 'Bukavu',
      category: 'Pitch',
      participants: '120+',
      tags: ['Startup', 'Innovation', 'Business'],
      badgeColor: 'text-orange-700 bg-orange-100',
      dotColor: 'bg-orange-500',
    },
    {
      image: '/assets/devfest-1.jpg',
      title: 'Web Dev Bootcamp',
      description:
        'Formation intensive de développement web moderne avec React, Node.js et les meilleures pratiques.',
      date: 'Novembre 2023',
      location: 'Bukavu',
      category: 'Formation',
      participants: '60+',
      tags: ['React', 'Node.js', 'Full Stack'],
      badgeColor: 'text-indigo-700 bg-indigo-100',
      dotColor: 'bg-indigo-500',
    },
    {
      image: '/assets/devfest-1.jpg',
      title: 'Cloud Computing Day',
      description:
        'Journée dédiée aux technologies cloud, AWS, Azure et Google Cloud avec des certifications.',
      date: 'Octobre 2023',
      location: 'Bukavu',
      category: 'Conférence',
      participants: '200+',
      tags: ['AWS', 'Azure', 'DevOps'],
      badgeColor: 'text-blue-700 bg-blue-100',
      dotColor: 'bg-blue-500',
    },
  ];

  secondRowEvents = [
    {
      image: '/assets/devfest-1.jpg',
      title: 'Women in Tech',
      description:
        'Événement dédié aux femmes dans la technologie avec des témoignages inspirants et du networking.',
      date: 'Mars 2023',
      location: 'Bukavu',
      category: 'Networking',
      participants: '150+',
      tags: ['Diversité', 'Leadership', 'Tech'],
      badgeColor: 'text-pink-700 bg-pink-100',
      dotColor: 'bg-pink-500',
    },
    {
      image: '/assets/devfest-1.jpg',
      title: 'Blockchain Workshop',
      description:
        'Formation sur la blockchain, les cryptomonnaies et le développement de smart contracts.',
      date: 'Février 2023',
      location: 'Bukavu',
      category: 'Workshop',
      participants: '70+',
      tags: ['Blockchain', 'Crypto', 'Smart Contracts'],
      badgeColor: 'text-green-700 bg-green-100',
      dotColor: 'bg-green-500',
    },
    {
      image: '/assets/devfest-1.jpg',
      title: 'Cybersécurité Summit',
      description:
        'Sommet sur la cybersécurité avec des experts internationaux et des cas pratiques de protection.',
      date: 'Janvier 2023',
      location: 'Bukavu',
      category: 'Summit',
      participants: '180+',
      tags: ['Sécurité', 'Ethical Hacking', 'Protection'],
      badgeColor: 'text-red-700 bg-red-100',
      dotColor: 'bg-red-500',
    },
    {
      image: '/assets/devfest-1.jpg',
      title: 'UI/UX Design Day',
      description:
        "Journée complète dédiée au design d'interface et d'expérience utilisateur avec des ateliers pratiques.",
      date: 'Décembre 2022',
      location: 'Bukavu',
      category: 'Design',
      participants: '90+',
      tags: ['UI/UX', 'Design', 'Figma'],
      badgeColor: 'text-teal-700 bg-teal-100',
      dotColor: 'bg-teal-500',
    },
    {
      image: '/assets/devfest-1.jpg',
      title: 'DevOps Conference',
      description:
        "Conférence sur les pratiques DevOps, l'intégration continue et le déploiement automatisé.",
      date: 'Novembre 2022',
      location: 'Bukavu',
      category: 'Conférence',
      participants: '160+',
      tags: ['DevOps', 'CI/CD', 'Docker'],
      badgeColor: 'text-blue-700 bg-blue-100',
      dotColor: 'bg-blue-500',
    },
    {
      image: '/assets/devfest-1.jpg',
      title: 'Data Science Bootcamp',
      description:
        "Formation intensive en science des données avec Python, R et des projets réels d'analyse.",
      date: 'Octobre 2022',
      location: 'Bukavu',
      category: 'Formation',
      participants: '85+',
      tags: ['Python', 'Data Science', 'Analytics'],
      badgeColor: 'text-indigo-700 bg-indigo-100',
      dotColor: 'bg-indigo-500',
    },
  ];
}
