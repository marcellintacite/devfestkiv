import { Component, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FirestoreService } from '../../../services/firestore';
import { Subscription } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-presentation',
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="relative min-h-screen" id="slidesContainer">
      <!-- Slides -->
      <div class="absolute inset-0 z-0">
        <iframe [src]="safeSlideUrl" frameborder="0" class="w-full h-full"></iframe>
      </div>

      <!-- Bulle quand minimisé -->
      @if(isMinimized && isVisible){
      <div
        class="fixed z-10 cursor-move select-none"
        [ngStyle]="{ left: position.x + 'px', top: position.y + 'px' }"
        (mousedown)="startDrag($event)"
      >
        <div
          class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-orange-500 to-green-500 shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 border-4 border-white/20"
          (click)="isMinimized = false"
        >
          <span class="text-white font-bold">
            {{ selectedSession?.questions?.length || 0 }}
          </span>
        </div>
      </div>
      }

      <!-- Card Q&A -->
      @if(!isMinimized && isVisible){
      <div class="fixed top-4 right-4 z-10 w-96 max-h-[80vh] flex flex-col">
        <div class="bg-white rounded-lg shadow-2xl border-2 border-gray-200 backdrop-blur-sm">
          <div class="flex items-center justify-between p-3 border-gray-500">
            <div class="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                />
              </svg>
              <div>
                <h2 class="font-semibold text-sm">Questions en Direct</h2>
                <p class="text-xs text-gray-500">DevFest Kivu 2025</p>
              </div>
            </div>
            <div class="flex gap-2">
              <button
                (click)="openFullScreen()"
                class="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </button>
              <button
                (click)="isMinimized = true"
                class="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                </svg>
              </button>
              <button
                (click)="isVisible = false"
                routerLink="/live_q"
                class="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="p-3 space-y-3 overflow-y-auto">
            <div>
              <label class="text-xs text-gray-500">Session Active</label>
              <select
                [(ngModel)]="selectedSession"
                class="w-full border rounded p-2 text-sm"
                (ngModelChange)="onSessionChange($event)"
              >
                <option [ngValue]="null">Sélectionner une session</option>
                @for(s of sessions;track $index){
                <option [ngValue]="s">{{ s.title }} - {{ s.speaker }}</option>
                }
              </select>
            </div>

            @if(selectedSession){
            <div>
              <div class="p-3 bg-gray-100 rounded">
                <h3 class="font-medium text-sm">{{ selectedSession.title }}</h3>
                <p class="text-xs text-gray-600">{{ selectedSession.speaker }}</p>
                <p class="text-xs text-gray-500">{{ selectedSession.time }}</p>
              </div>

              <div>
                <h4 class="font-medium text-sm">
                  Questions ({{ selectedSession.questions.length }})
                </h4>
                @if(selectedSession.questions.length === 0){
                <div class="text-center py-4 text-gray-400">Aucune question reçue</div>
                } @for(q of selectedSession.questions;track $index){
                <div class="p-2 border rounded mb-2">
                  <div class="flex justify-between text-xs text-gray-500">
                    <span>Q{{ $index + 1 }}</span>
                    <span>{{ q.time }}</span>
                  </div>
                  <p class="text-sm mt-1">{{ q.contenu }}</p>
                </div>
                }
              </div>
            </div>
            } @if(!selectedSession){
            <div class="text-center text-gray-400 py-4">Sélectionnez une session active</div>
            }
          </div>
        </div>
      </div>
      }
    </div>
    <svg
      viewBox="0 0 800 400"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      style="width:100%; height:100%; position:absolute; top:0; left:0; z-index:-3;"
    >
      <!-- Formes Google animées -->
      <polygon class="move1" points="100,50 200,150 50,150" fill="#EA4335" fill-opacity="0.2" />
      <circle class="pulse" cx="600" cy="120" r="60" fill="#34A853" fill-opacity="0.3" />

      <!-- Icônes codeur -->
      <text
        class="float"
        x="350"
        y="300"
        font-family="monospace"
        font-size="50"
        fill="#F4B400"
        opacity="0.9"
      >
        &lt;/&gt;
      </text>
      <text
        class="float"
        x="100"
        y="350"
        font-family="monospace"
        font-size="30"
        fill="#EA4335"
        opacity="0.7"
      >
        &#123;DevFest&#125;
      </text>
      <text
        class="float"
        x="200"
        y="70"
        font-family="monospace"
        font-size="25"
        fill="#4285F4"
        opacity="0.7"
      >
        &#40;&#41;
      </text>
      <text
        class="float"
        x="650"
        y="250"
        font-family="monospace"
        font-size="35"
        fill="#34A853"
        opacity="0.7"
      >
        &lt;Kivu/&gt;
      </text>
      <text
        class="float"
        x="500"
        y="350"
        font-family="monospace"
        font-size="20"
        fill="#FBBC05"
        opacity="0.6"
      >
        ;
      </text>
      <text
        class="float"
        x="750"
        y="70"
        font-family="monospace"
        font-size="25"
        fill="#EA4335"
        opacity="0.6"
      >
        #
      </text>
      <text
        class="float"
        x="600"
        y="100"
        font-family="monospace"
        font-size="25"
        fill="#EA4335"
        opacity="0.6"
      >
        ?
      </text>
    </svg>
  `,
  styles: `
   @keyframes moveX {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
}
.move1 { animation: moveX 6s ease-in-out infinite; }
.move2 { animation: moveX 8s ease-in-out infinite reverse; }

/* Pulser le cercle */
@keyframes pulseAnim {
  0%, 100% { r: 60; opacity:0.7; }
  50% { r: 70; opacity:1; }
}
.pulse { animation: pulseAnim 4s ease-in-out infinite; }

/* Flotter verticalement les symboles de code */
@keyframes floatY {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
.float { animation: floatY 5s ease-in-out infinite; }

/* Rotation douce pour motifs africains */
@keyframes rotateAnim {
  0% { transform: rotate(0deg); transform-origin: 620px 300px; }
  50% { transform: rotate(15deg); }
  100% { transform: rotate(0deg); }
}
  `,
})
export default class Presentation {
  sessions: any[] = [];
  private fs = inject(FirestoreService);
  speakersSub!: Subscription;
  selectedSlide: string = '';

  selectedSession: Session<Timestamp> | null = null;
  isMinimized = false;
  isVisible = true;
  popupWindow: Window | null = null;

  // Position de la bulle
  position = { x: 20, y: 20 };
  dragging = false;
  dragOffset = { x: 0, y: 0 };
  private sanitizer = inject(DomSanitizer);
  safeSlideUrl: SafeResourceUrl | null = null;

  ngOnInit(): void {
    const active = this.sessions.find((s) => s.isActive);
    if (active) this.selectedSession = active;

    this.speakersSub = this.fs.getSessions().subscribe((sessions: any) => {
      this.sessions = sessions;
    });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnDestroy(): void {
    if (this.popupWindow && !this.popupWindow.closed) {
      this.popupWindow.close();
    }
    if (this.speakersSub) this.speakersSub.unsubscribe();
  }

  // Drag events
  startDrag(event: MouseEvent) {
    if (this.isMinimized) {
      this.dragging = true;
      this.dragOffset = {
        x: event.clientX - this.position.x,
        y: event.clientY - this.position.y,
      };
    }
  }
  onSessionChange(session: Session<Timestamp> | null) {
    this.selectedSlide = this.getUrl(session?.slides!)!;
    console.log('url', this.selectedSession);
    this.safeSlideUrl = this.selectedSlide
      ? this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedSlide)
      : null;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.dragging && this.isMinimized) {
      this.position = {
        x: event.clientX - this.dragOffset.x,
        y: event.clientY - this.dragOffset.y,
      };
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.dragging = false;
  }

  getUrl(url: string) {
    const srcMatch = url.match(/src="([^"]+)"/);

    const src = srcMatch ? srcMatch[1] : null;
    return src;
  }

  // Popup
  openPopup() {
    const popup = window.open(
      '/presenter/popup',
      'devfest-qa-popup',
      'width=400,height=600,top=100,left=100,resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no'
    );
    if (popup) {
      this.popupWindow = popup;
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          this.popupWindow = null;
          clearInterval(checkClosed);
        }
      }, 1000);
    }
  }

  openFullScreen() {
    const elem = document.getElementById('slidesContainer');
    if (elem && elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as any).webkitRequestFullscreen) {
      // Safari
      (elem as any).webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) {
      // IE/Edge
      (elem as any).msRequestFullscreen();
    }
  }
}
