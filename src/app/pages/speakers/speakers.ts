import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { SpeakersService } from '../../service/speakers.service';
import { Speaker } from '../../models/speaker.model';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div class="mx-auto px-0 pb-12 relative">
      <section
        class="text-center max-w-full lg:max-w-7xl bg-orange-50 mx-auto mb-8 py-6 px-4 md:px-6"
      >
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-12">Nos Speakers</h1>

        <p class="text-lg text-gray-500 leading-relaxed">
          Découvrez les speakers du
          <span class="font-semibold text-primary">DevFest Kivu 2025</span> : des passionnés de
          technologie qui viendront partager leur expertise, leurs parcours et leurs visions pour
          inspirer et faire grandir toute la communauté.
        </p>
      </section>

      <!-- Grille responsive -->
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 max-w-7xl mx-auto px-4"
      >
        <!-- Boucle sur chaque speaker -->
        @for (speaker of speakers; track speaker.name) {
        <div
          class="bg-orange-100 rounded-2xl border border-gray-200 p-4 text-center border-md hover:border-lg transition-all duration-300"
        >
          <!-- Photo -->
          <img
            [ngSrc]="speaker.photo"
            [alt]="speaker.name"
            width="144"
            height="144"
            class="w-36 h-36 rounded-full mx-auto mb-4 object-cover cursor-pointer"
            (click)="selectSpeaker(speaker)"
            (keydown.enter)="selectSpeaker(speaker)"
            tabindex="0"
          />

          <h2 class="text-xl font-bold">{{ speaker.name }}</h2>
          <p class="text-gray-700">{{ speaker.title }}</p>

          <p class="text-gray-500 text-sm mt-2">
            {{ truncateBio(speaker.bio) }}
          </p>
        </div>
        }
      </div>

      <!-- Modale -->
      <dialog
        #speakerDialog
        class="m-8 mx-auto w-130 h-150 p-4 bg-transparent backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-zoom-in"
      >
        @if (selectedSpeaker) {
        <div
          (click)="$event.stopPropagation()"
          class="bg-orange-100  mx-auto rounded-2xl border border-gray-200 p-1 text-center  "
        >
          <!-- Contenu de la modale -->
          <div
            class="bg-white py-5 m-full grid grid-cols-2 lg:grid-cols-1 gap-2 items-center jystify-center "
          >
            <div>
              <img
                [ngSrc]="selectedSpeaker.photo"
                [alt]="selectedSpeaker.name"
                width="160"
                height="160"
                class="w-36 h-36  rounded-full mx-auto mb-4 object-cover border-4 border-primary"
              />
            </div>
            <div>
              <h2 class="text-3xl font-bold text-text">{{ selectedSpeaker.name }}</h2>
            </div>
          </div>
          <div p-4>
            <p class="text-primary font-semibold mb-4 p-4">{{ selectedSpeaker.title }}</p>
            <p class="text-gray-600 text-base leading-relaxed text-left  px-2 break-words">
              {{ selectedSpeaker.bio }}
            </p>

            <!-- Liens sociaux dans la modale -->
            <div class="flex justify-center space-x-6 mt-6">
              @if (selectedSpeaker.socials.twitter) {
              <a
                [href]="selectedSpeaker.socials.twitter"
                target="_blank"
                class="text-blue-500 hover:text-blue-700 text-2xl"
                aria-label="Twitter de {{ selectedSpeaker.name }}"
              >
                <i class="fab fa-twitter"></i>
              </a>
              } @if (selectedSpeaker.socials.linkedin) {
              <a
                [href]="selectedSpeaker.socials.linkedin"
                target="_blank"
                class="text-blue-700 hover:text-blue-900 text-2xl"
                aria-label="LinkedIn de {{ selectedSpeaker.name }}"
              >
                <i class="fab fa-linkedin"></i>
              </a>
              } @if (selectedSpeaker.socials.github) {
              <a
                [href]="selectedSpeaker.socials.github"
                target="_blank"
                class="text-gray-800 hover:text-black text-2xl"
                aria-label="GitHub de {{ selectedSpeaker.name }}"
              >
                <i class="fab fa-github"></i>
              </a>
              }
            </div>

            <div class="mt-8">
              <button (click)="closeModal()" class="btn btn-primary btn-md">Fermer</button>
            </div>
          </div>
        </div>
        }
      </dialog>
    </div>
  `,
  styles: `
  dialog::backdrop{
    display:flex;
    align-items:center;
    justify-content:center;
  }`,
})
export default class Speakers implements OnDestroy {
  speakersService = inject(SpeakersService);
  speakers: Speaker[] = this.speakersService.speakers;

  selectedSpeaker: Speaker | null = null;
  @ViewChild('speakerDialog') dialog!: ElementRef<HTMLDialogElement>;
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'overflow-hidden');
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.selectedSpeaker) {
      this.closeModal();
    }
  }

  selectSpeaker(speaker: Speaker) {
    this.selectedSpeaker = speaker;
    this.renderer.addClass(this.document.body, 'overflow-hidden');
    this.dialog.nativeElement.showModal();
  }

  closeModal() {
    this.dialog.nativeElement.close();
    this.renderer.removeClass(this.document.body, 'overflow-hidden');
    this.selectedSpeaker = null;
  }

  truncateBio(bio: string, maxLength: number = 80): string {
    if (bio.length <= maxLength) {
      return bio;
    }
    // Trouve le dernier espace avant la limite pour ne pas couper un mot
    const lastSpace = bio.lastIndexOf(' ', maxLength);
    return bio.substring(0, lastSpace > 0 ? lastSpace : maxLength) + '...';
  }
}
