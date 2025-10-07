import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormsModule,NgForm } from '@angular/forms';
import {questionInterface} from '../../../models/session-model';
@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [FormsModule],
  template: `
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
      <!-- Dialog -->
      <div class="relative bg-white rounded-2xl shadow-xl p-6 animate-fade-in w-200">
        <!-- Bouton fermer -->
        <button
          (click)="onClose()"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
        >
          ✕
        </button>

        <!-- Titre -->
        <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">Posez votre question</h2>

        <!-- Ligne décorative -->
        <div class="flex justify-center my-6">
          <svg width="200" height="20" viewBox="0 0 200 20" fill="none" class="animate-pulse-slow">
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

        <!-- Infos de session -->
        @if (sessionTitle) {
          <div class="text-center mb-4">
            <p class="text-sm text-gray-500">
              Session : <span class="font-medium text-gray-700">{{ sessionTitle }}</span>
            </p>
          </div>
        }

        <!-- Liste des questions -->
        @if (questions.length > 0) {
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Questions déjà posées :</h3>

          <div
            class="space-y-3 max-h-48 overflow-y-auto pr-2"
          >
            @for (q of questions; track q) {
              <div
                class="question-card p-3 rounded-lg text-gray-800 shadow-sm bg-white"
              >
                <p class="text-sm text-gray-600 mb-1">[10:45]</p>
                {{ q.contenu }}
              </div>
            }
          </div>
        } @else {
          <p class="text-gray-500 italic">Aucune question posée pour l’instant.</p>
        }

        <form #QuestionForm= "ngForm" (ngSubmit)="addQuestion(QuestionForm)">
          <!-- Champ question -->
          <textarea
            [(ngModel)]="QuestionFormValue"
            #questionField = "ngModel"
            required
            rows="3"
            name="question"
            placeholder="Écrivez votre question ici..."
            class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 mt-6 focus:outline-none  resize-none"
          ></textarea>
          @if(errorMsg){<span class="text-red-600">{{errorMsg}}</span>}
          <!-- Bouton envoyer -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Envoyer
            </button>
          </div>
        </form>

      </div>
    </div>
  `,
  styles: [
    `
      .animate-fade-in {
        animation: fadeIn 0.25s ease-in-out;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      /* Cadre avec les 4 couleurs Google */
      .question-card {
        border: 1px solid transparent;
        border-radius: 5px;
        border-top: 2px solid #4285f4; /* bleu */
        border-right: 2px solid #ea4335; /* rouge */
        border-bottom: 2px solid #fbbc04; /* jaune */
        border-left: 2px solid #34a853; /* vert */
      }
    `,
  ],
})
export default class QuestionsDialog {
  /** ✅ Données passées lors de l’ouverture */
  @Input() sessionTitle: string = '';
  @Input() initialQuestions: questionInterface[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() questionSubmitted = new EventEmitter<questionInterface>();

  errorMsg:string = "";
  QuestionFormValue:string="" ;
  newQuestion!: questionInterface;
  questions: questionInterface[] = [];

  ngOnInit() {
    this.questions = [...this.initialQuestions];
  }

  addQuestion(form: NgForm) {
    if(form.valid){
      this.errorMsg = ""
      this.newQuestion = {
        contenu: this.QuestionFormValue,
        time: new Date().getTime().toString(),
      }
      if (this.newQuestion) {
        this.questions.unshift(this.newQuestion);
        this.questionSubmitted.emit(this.newQuestion);
        this.QuestionFormValue = '';
      }
    }else{
      this.errorMsg="veuillez remplir le champ avant d'envoyer la question"
    }
  }

  onClose() {
    this.close.emit();
  }
}
