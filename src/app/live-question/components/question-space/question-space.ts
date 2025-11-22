import {
  Component,
  inject,
  signal,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Session, questionInterface } from '../../../models/session-model';
import { FirestoreService } from '../../../services/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

interface FloatingReaction {
  id: string;
  emoji: string;
  startX: number;
  startY: number;
  animationClass: string;
}

@Component({
  selector: 'app-question-space',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './question-space.component.html',
  styles: [
    `
     
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
export default class QuestionSpace implements AfterViewChecked, OnDestroy {
  private fs = inject(FirestoreService);

  @ViewChild('questionsContainer') questionsContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef<HTMLDivElement>;

  sessions = signal<Session<Timestamp>[]>([]);
  selectedSession = signal<Session<Timestamp> | null>(null);
  questionText = signal('');
  showEmojiPanel = signal(false);
  showReactEmojiPanel = signal(false);
  shouldScrollToBottom = signal(true);
  showReactionPicker = false;
  activeReactions = signal<FloatingReaction[]>([]);

  // Emojis disponibles pour les réactions
  availableEmojis = ['👍', '👎', '❤️', '🔥', '🎉', '👀', '😄', '🤔', '🚀'];

  // Animations disponibles pour les réactions flottantes
  private animationClasses = [
    'animate-float-slow',
    'animate-float-medium',
    'animate-float-fast',
    'animate-float-left',
    'animate-float-right',
  ];

  speakersSub!: Subscription;

  ngOnInit(): void {
    this.speakersSub = this.fs.getSessions().subscribe((sessions: any) => {
      this.sessions.set(sessions);
    });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom()) {
      this.scrollToBottom();
      this.shouldScrollToBottom.set(false);
    }
  }

  selectSession(s: Session<Timestamp>) {
    if (s.isActive) {
      this.selectedSession.set(s);
      this.shouldScrollToBottom.set(true);
    }
  }

  onMobileSessionSelect(event: any) {
    const sessionId = event.target.value;
    if (!sessionId) {
      this.selectedSession.set(null);
      return;
    }

    const session = this.sessions().find((s) => s.id === sessionId && s.isActive);
    if (session) {
      this.selectedSession.set(session);
      this.shouldScrollToBottom.set(true);
    }
  }

  submitQuestion() {
    const content = this.questionText().trim();
    if (!content) return;

    const s = this.selectedSession();
    if (!s) return;

    const newQuestion: questionInterface = {
      contenu: content,
      time: Date.now().toString(),
      reactions: [],
    };

    s.questions.push(newQuestion);
    this.fs.setSession(s);
    this.selectedSession.set({ ...s });
    this.questionText.set('');
    this.showEmojiPanel.set(false);
    this.shouldScrollToBottom.set(true);
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.scrollAnchor) {
        this.scrollAnchor.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    }, 100);
  }

  triggerFloatingReaction(emoji: string): void {
    // Position de départ aléatoire en bas de l'écran
    const startX = Math.random() * (window.innerWidth - 100) + 50;
    const startY = 100; // Commence en bas

    // Animation aléatoire
    const randomAnimation =
      this.animationClasses[Math.floor(Math.random() * this.animationClasses.length)];

    const reaction: FloatingReaction = {
      id: Date.now().toString() + Math.random(),
      emoji,
      startX,
      startY,
      animationClass: randomAnimation,
    };

    this.fs.setEmojis(reaction);

    // Ajouter la réaction
    this.activeReactions.update((reactions) => [...reactions, reaction]);

    // Supprimer après l'animation (3-5 secondes)
    setTimeout(() => {
      this.activeReactions.update((reactions) => reactions.filter((r) => r.id !== reaction.id));
    }, 3000 + Math.random() * 2000);
  }

  addReaction(question: questionInterface, emoji: string) {
    if (!question.reactions) {
      question.reactions = [];
    }

    const existingReaction = question.reactions.find((r) => r.emoji === emoji);

    if (existingReaction) {
      existingReaction.count++;
    } else {
      question.reactions.push({ emoji, count: 1 });
    }

    // Déclencher aussi une réaction flottante
    this.triggerFloatingReaction(emoji);
  }

  toggleEmojiPanel() {
    this.showEmojiPanel.set(!this.showEmojiPanel());
  }

  toggleReactEmojiPanel() {
    this.showReactEmojiPanel.set(!this.showReactEmojiPanel());
  }

  addEmojiToText(emoji: string) {
    this.questionText.set(this.questionText() + emoji);
  }

  formatTime(timestamp: string): string {
    const date = new Date(parseInt(timestamp));
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) {
      return "À l'instant";
    }

    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `Il y a ${minutes} min`;
    }

    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }

    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  ngOnDestroy(): void {
    if (this.speakersSub) {
      this.speakersSub.unsubscribe();
    }
  }
}
