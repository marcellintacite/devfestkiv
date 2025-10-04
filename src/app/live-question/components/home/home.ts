import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import Questions from '../questions/questions';
import {questionInterface, Session} from '../../../models/session-model';
import {Timestamp} from '@angular/fire/firestore';
import {FirestoreService} from '../../../services/firestore';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Questions],

  template: `
    <main class="container mx-auto px-4 py-8 relative z-10">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16 relative">
          <div class="relative z-10">
            <div class="mb-6">
              <h2 class="text-5xl md:text-6xl font-bold mb-4 text-balance">
                <span class="text-foreground/9"> Posez vos questions </span>
                <br/>
                <span class="text-foreground/90">anonymement</span>
              </h2>
            </div>
            <div class="flex justify-center my-6">
              <svg
                width="200"
                height="20"
                viewBox="0 0 200 20"
                fill="none"
                className="animate-pulse-slow"
              >
                <path
                  d="M20,10 L40,5 L60,10 L80,5 L100,10 L120,5 L140,10 L160,5 L180,10"
                  stroke="#FBBC04"
                  stroke-width="2"
                  fill="none"
                />
                <circle cx="30" cy="10" r="2" fill="#4285F4"/>
                <circle cx="70" cy="10" r="2" fill="#EA4335"/>
                <circle cx="110" cy="10" r="2" fill="#34A853"/>
                <circle cx="150" cy="10" r="2" fill="#FBBC04"/>
              </svg>
            </div>
            <p
              class="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Sélectionnez une session ci-dessous et posez votre question de manière anonyme. Vos
              questions seront transmises directement aux intervenants en temps réel.
            </p>
            <div class="flex justify-center gap-4 flex-wrap">
              <!-- Badge sessions actives -->
              <div
                class="flex items-center text-base px-4 py-2 border border-[#34A853]/30 bg-[#34A853]/10 rounded-md"
              >
                <div class="w-2 h-2 bg-[#34A853] rounded-full animate-pulse-google mr-2"></div>
                {{ activeSessions.length }} session(s) active(s)
              </div>

              <!-- Badge questions en temps réel -->
              <div
                class="flex items-center text-base px-4 py-2 border border-[#4285F4]/30 bg-[#4285F4]/10 rounded-md"
              >
                <!-- Icône MessageSquare en SVG -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77
               9.77 0 01-4-.8l-4 1 1-3.6A7.7 7.7 0 013 12c0-4.418 4.03-8 9-8s9
               3.582 9 8z"
                  />
                </svg>
                Questions en temps réel
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <svg
      viewBox="0 0 800 400"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      style="width:100%; height:100%; position:absolute; top:0; left:0; z-index:-3;"
    >
      <!-- Formes Google animées -->
      <polygon class="move1" points="100,50 200,150 50,150" fill="#EA4335" fill-opacity="0.2"/>
      <circle class="pulse" cx="600" cy="120" r="60" fill="#34A853" fill-opacity="0.3"/>

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
    <main class="container mx-auto px-4 py-8 relative z-10">
      <h2 class="text-4xl font-bold mb-8 text-center text-gray-900">Speakers en live</h2>
      <div class="flex justify-center my-6">
        <svg
          width="200"
          height="20"
          viewBox="0 0 200 20"
          fill="none"
          className="animate-pulse-slow"
        >
          <path
            d="M20,10 L40,5 L60,10 L80,5 L100,10 L120,5 L140,10 L160,5 L180,10"
            stroke="#FBBC04"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="30" cy="10" r="2" fill="#4285F4"/>
          <circle cx="70" cy="10" r="2" fill="#EA4335"/>
          <circle cx="110" cy="10" r="2" fill="#34A853"/>
          <circle cx="150" cy="10" r="2" fill="#FBBC04"/>
        </svg>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        @for (session of activeSessions; track $index) {
          <div
            (click)="openDialog(session)"
            class="card-session p-6 rounded-xl shadow-lg flex flex-col items-center relative overflow-hidden"
          >
            <!-- Fond léger -->
            <div class="absolute inset-0 bg-gray-50 opacity-20 z-0"></div>

            <!-- Contenu -->
            <div class="relative z-10 flex flex-col items-center">
              <!-- Nom du speaker -->
              <h3 class="text-xl font-bold mb-1 text-center">{{ session.speaker }}</h3>

              <!-- Titre de la session -->
              <p class="text-sm text-gray-700 mb-4 text-center">{{ session.title }}</p>

              <!-- Bouton Question -->
              <button
                class="px-4 py-2 rounded-md text-white font-semibold transition transform hover:scale-105"
                [ngStyle]="{ 'background-color': getTrackColor('Infrastructure') }"
                (click)="openDialog(session)"
              >
                Question
              </button>
            </div>
          </div>
        }
      </div>
    </main>

    @if (dialogOuvert) {
      <app-questions
        [sessionTitle]="SelectedSession.title"
        [initialQuestions]="SelectedSession.questions"
        (close)="dialogOuvert= false"
        (questionSubmitted)="onQuestionSubmit($event)"
      ></app-questions>
    }
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
.card-session {
  position: relative;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  overflow: hidden;
}

/* Bordure du bas avec 4 couleurs distinctes de Google */
.card-session::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px; /* épaisseur de la bordure */
  background: linear-gradient(
    to right,
    #4285F4 0%, #4285F4 25%,    /* bleu */
    #34A853 25%, #34A853 50%,   /* vert */
    #FBBC05 50%, #FBBC05 75%,   /* jaune */
    #EA4335 75%, #EA4335 100%   /* rouge */
  );
}

  `,
})
export default class Home implements OnInit {
  ngOnInit(): void {
    let sessionListRef = this.FireStore.getSessions();
    let sessionList :Session<Timestamp>[] = [];
    sessionListRef.forEach((e:Session<Timestamp>[]) =>this.activeSessions= e)
  }
  private readonly FireStore = inject(FirestoreService);
  // Fake data pour tester
  dialogOuvert = false;

  activeSessions: Session<Timestamp>[] = [];

  getTrackColor(track: string): string {
    switch (track.toLowerCase()) {
      case 'tech':
        return '#4285F4'; // bleu
      case 'développement':
        return '#34A853'; // vert
      case 'infrastructure':
        return '#EA4335'; // rouge
      default:
        return '#FBBC05'; // jaune
    }
  }

  getQrOptions() {
    return {
      width: 150,
      height: 150,
      type: 'canvas',
      colorDark: ['#4285F4', '#34A853', '#FBBC05', '#EA4335'], // couleurs Google
      colorLight: '#ffffff',
      dotsOptions: { type: 'rounded' },
      cornersSquareOptions: { type: 'extra-rounded' },
    };
  }

  SelectedSession! :Session<Timestamp>;

  openDialog(session:Session<Timestamp>) {
    this.SelectedSession = session;
    this.dialogOuvert = true;
  }

  onQuestionSubmit(question: questionInterface) {
    this.SelectedSession.questions.push(question);
    //console.log(this.SelectedSession.questions);
    this.FireStore.setSession(this.SelectedSession)
  }

}
