import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessionForm } from '../session-form/session-form';
import Questions from '../../questions/questions';
import { FirestoreService } from '../../../../services/firestore';
import { Timestamp } from '@angular/fire/firestore';
import {Session} from '../../../../models/session-model';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule, SessionForm, Questions],
  template: `
    <div
      class="cursor-pointer hover:shadow-lg transition-all duration-300 border rounded-lg p-4 shadow"
      [ngClass]="getBorderColor('Dev Track')"
    >
      <!-- Header -->
      <div class="pb-3">
        <div class="flex items-start justify-between gap-2 mb-2">
          <span
            class="text-xs font-bold px-2 py-1 rounded"
            [ngClass]="getBadgeColor(session.track)"
          >
            {{ session.track }}
          </span>
          <span class="text-xs text-gray-500 font-mono">{{ session.time }}</span>
        </div>

        <h3 class="text-lg font-semibold leading-tight mb-1">{{ session.theme }}</h3>

        <div class="text-sm text-gray-600 mb-2">
          <div class="flex items-center gap-1 mb-1">
            <span class="material-icons text-[16px]">person</span>
            <span class="font-medium">{{ session.speaker }}</span>
          </div>
          <span class="text-xs text-gray-500">{{ session.title }}</span>
        </div>
      </div>

      <!-- Description -->
      <div class="pt-0">
        <p class="text-sm text-gray-600 mb-4">{{ session.description }}</p>

        <!-- Session Controls -->
        <div class="space-y-3">
          <!-- Status Toggle -->
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium">Statut de la session</span>
            <div class="flex items-center gap-2 cursor-pointer" (click)="statusChange(session)">
              <div
                class="w-12 h-6 rounded-full transition-colors"
                [ngClass]="session.isActive ? 'bg-green-500' : 'bg-gray-300'"
              ></div>
              <span
                class="text-xs font-medium"
                [ngClass]="session.isActive ? 'text-green-600' : 'text-gray-500'"
              >
                {{ session.isActive ? 'Active' : 'Terminée' }}
              </span>
            </div>
          </div>

          <!-- Questions & Voir Button -->
          <div class="flex items-center justify-between pt-2 border-t">
            <div class="flex items-center gap-2 text-sm">
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
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>

              <span>{{ session.questions ? session.questions.length : 0 }} question(s)</span>
            </div>

            <button
              (click)="vieuwDialog(session)"
              class="text-sm text-blue-600 hover:underline flex items-center gap-1"
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
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              Voir
            </button>
            <button
              class="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
              (click)="editSession(session)"
            >
              Modifier
            </button>
            <button
              class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              (click)="deleteSession(session)"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
    @if(showForm){
    <app-session-form
      [sessionToEdit]="selectedSession"
      (closed)="onFormClosed()"
    ></app-session-form>
    } @if(dialogOuvert){
    <app-questions
      [sessionTitle]="sessionSelectionnee.title"
      [initialQuestions]="sessionSelectionnee.questions ? sessionSelectionnee.questions : []"
      (close)="dialogOuvert = false"
    ></app-questions>
    }
  `,
  styles: [``],
})
export class Card {
  @Input() session!: Session<Timestamp>;
  private fs = inject(FirestoreService);
  @Output() viewSession = new EventEmitter<Session<Timestamp>>();
  @Output() toggleStatus = new EventEmitter<string>();
  showForm: boolean = false;
  selectedSession?: any;
  dialogOuvert = false;
  sessionSelectionnee: any;

  getBadgeColor(track: string) {
    const colors: Record<string, string> = {
      'Tech Track': 'bg-blue-100 text-blue-600',
      'Dev Track': 'bg-purple-100 text-purple-600',
      'Cloud Track': 'bg-indigo-100 text-indigo-600',
      'Security Track': 'bg-red-100 text-red-600',
      'Fintech Track': 'bg-yellow-100 text-yellow-600',
      'Design Track': 'bg-green-100 text-green-600',
    };
    return colors[track] || 'bg-gray-100 text-gray-600';
  }

  statusChange(session: Session<Timestamp>) {
    session.isActive = !session.isActive;
    session.updateAt = new Date() as any;
    this.fs.setSession(session);
  }
  editSession(session: any) {
    this.showForm = true;
    this.selectedSession = session;
  }

  deleteSession(session: Session<Timestamp>) {
    this.fs.deleteSession(session.id);
  }
  onFormClosed() {
    this.showForm = false;
    this.selectedSession = undefined;
  }

  getBorderColor(track: string) {
    const colors: Record<string, string> = {
      'Tech Track': 'border-blue-200',
      'Dev Track': 'border-purple-200',
      'Cloud Track': 'border-indigo-200',
      'Security Track': 'border-red-200',
      'Fintech Track': 'border-yellow-200',
      'Design Track': 'border-green-200',
    };
    return colors[track] || 'border-gray-200';
  }

  vieuwDialog(session: any) {
    this.sessionSelectionnee = session;

    this.dialogOuvert = true;
  }
}
