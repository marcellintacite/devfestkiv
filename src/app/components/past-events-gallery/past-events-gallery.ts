import { Component } from '@angular/core';

@Component({
  selector: 'app-past-events-gallery',
  imports: [],
  template: `
    <section class="py-12 md:py-16 lg:py-20 overflow-hidden">
      <div class="max-w-7xl mx-auto px-md sm:px-lg lg:px-xl mb-8 md:mb-12">
        <!-- Section Header -->
        <div class="text-center">
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-3 md:mb-4">
            Nos Événements Passés
          </h2>
          <p class="text-sm sm:text-base md:text-lg text-text/80 max-w-2xl mx-auto">
            Découvrez les moments forts de nos précédentes éditions DevFest Kivu
          </p>
        </div>
      </div>

      <!-- First Row - Left to Right -->
      <div class="gallery-row mb-3">
        <div class="scroll-left-to-right">
          <!-- First set of images -->
          @for (item of firstRowImages; track $index) {
            <div class="gallery-item">
              <img 
                src="/assets/devfest-1.jpg" 
                alt="DevFest Kivu {{ $index + 1 }}" 
                class="gallery-image"
              >
              <!-- White bottom overlay -->
              <div class="white-overlay"></div>
              <div class="image-overlay">
                <div class="overlay-content">
                  <h4 class="text-white font-semibold text-sm md:text-base">
                    DevFest Kivu {{ 2019 + ($index % 5) }}
                  </h4>
                  <p class="text-white/80 text-xs md:text-sm">
                    {{ getEventDescription($index) }}
                  </p>
                </div>
              </div>
            </div>
          }
          <!-- Duplicate set for seamless loop -->
          @for (item of firstRowImages; track $index) {
            <div class="gallery-item">
              <img 
                src="/assets/devfest-1.jpg" 
                alt="DevFest Kivu {{ $index + 1 }}" 
                class="gallery-image"
              >
              <!-- White bottom overlay -->
              <div class="white-overlay"></div>
              <div class="image-overlay">
                <div class="overlay-content">
                  <h4 class="text-white font-semibold text-sm md:text-base">
                    DevFest Kivu {{ 2019 + ($index % 5) }}
                  </h4>
                  <p class="text-white/80 text-xs md:text-sm">
                    {{ getEventDescription($index) }}
                  </p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Second Row - Right to Left -->
      <div class="gallery-row">
        <div class="scroll-right-to-left">
          <!-- First set of images -->
          @for (item of secondRowImages; track $index) {
            <div class="gallery-item">
              <img 
                src="/assets/devfest-1.jpg" 
                alt="DevFest Kivu {{ $index + 11 }}" 
                class="gallery-image"
              >
              <!-- White bottom overlay -->
              <div class="white-overlay"></div>
              <div class="image-overlay">
                <div class="overlay-content">
                  <h4 class="text-white font-semibold text-sm md:text-base">
                    DevFest Kivu {{ 2020 + ($index % 4) }}
                  </h4>
                  <p class="text-white/80 text-xs md:text-sm">
                    {{ getEventDescription($index + 10) }}
                  </p>
                </div>
              </div>
            </div>
          }
          <!-- Duplicate set for seamless loop -->
          @for (item of secondRowImages; track $index) {
            <div class="gallery-item">
              <img 
                src="/assets/devfest-1.jpg" 
                alt="DevFest Kivu {{ $index + 11 }}" 
                class="gallery-image"
              >
              <!-- White bottom overlay -->
              <div class="white-overlay"></div>
              <div class="image-overlay">
                <div class="overlay-content">
                  <h4 class="text-white font-semibold text-sm md:text-base">
                    DevFest Kivu {{ 2020 + ($index % 4) }}
                  </h4>
                  <p class="text-white/80 text-xs md:text-sm">
                    {{ getEventDescription($index + 10) }}
                  </p>
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
      gap: 1rem;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      width: fit-content;
    }

    .scroll-left-to-right {
      animation: scrollLeftToRight 80s linear infinite;
    }

    .scroll-right-to-left {
      animation: scrollRightToLeft 70s linear infinite;
    }

    .gallery-item {
      position: relative;
      flex-shrink: 0;
      width: 280px;
      height: 380px;
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.4s ease-out;
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.12),
        0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .gallery-item:hover {
      transform: scale(1.05) translateY(-12px);
      box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.2),
        0 10px 20px rgba(0, 0, 0, 0.15);
    }

    .gallery-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease-out;
    }

    .gallery-item:hover .gallery-image {
      transform: scale(1.1);
    }

    .white-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 120px;
      background: linear-gradient(
        to top,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0.1) 50%,
        transparent 100%
      );
      pointer-events: none;
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
        rgba(0, 0, 0, 0.2) 60%,
        rgba(0, 0, 0, 0.7) 100%
      );
      opacity: 0;
      transition: opacity 0.4s ease-out;
      display: flex;
      align-items: flex-end;
      padding: 1.5rem;
    }

    .gallery-item:hover .image-overlay {
      opacity: 1;
    }

    .overlay-content {
      width: 100%;
    }

    /* Animations */
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

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .gallery-item {
        width: 220px;
        height: 300px;
      }

      .gallery-row {
        margin-bottom: 0.5rem;
      }

      .scroll-left-to-right {
        animation-duration: 60s;
      }

      .scroll-right-to-left {
        animation-duration: 50s;
      }

      .image-overlay {
        padding: 1rem;
      }

      .white-overlay {
        height: 100px;
      }
    }

    @media (max-width: 480px) {
      .gallery-item {
        width: 180px;
        height: 240px;
      }

      .gallery-row {
        margin-bottom: 0.25rem;
      }

      .scroll-left-to-right {
        animation-duration: 40s;
      }

      .scroll-right-to-left {
        animation-duration: 35s;
      }

      .white-overlay {
        height: 80px;
      }

      .image-overlay {
        padding: 0.75rem;
      }
    }
  `
})
export default class PastEventsGallery {
  firstRowImages = Array(12).fill(null);
  secondRowImages = Array(12).fill(null);

  getEventDescription(index: number): string {
    const descriptions = [
      'Conférences techniques',
      'Ateliers pratiques',
      'Networking session',
      'Démonstrations live',
      'Tables rondes',
      'Pitch startup',
      'Formations AI/ML',
      'Workshop mobile',
      'Cloud computing',
      'DevOps practices',
      'UI/UX Design',
      'Blockchain tech',
      'IoT innovations',
      'Cyber sécurité',
      'Data Science'
    ];
    
    return descriptions[index % descriptions.length];
  }
}