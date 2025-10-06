import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import PastEventsGallery from '../../components/past-events-gallery/past-events-gallery';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [PastEventsGallery, RouterLink],
  templateUrl: 'home.html',
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
export default class HomeComponent implements OnInit, OnDestroy {
  seconde = signal(0);
  minutes = signal(0);
  hours = signal(0);
  daysLeft = signal(0);

  targetDateTimeString = signal('2025-10-06T13:47:00');
  countdownRunning = signal(false);

  private countdownInterval: any;
  private endTime = 0;
  private readonly STORAGE_KEY = 'countdown_end_time';

  ngOnInit(): void {
    this.initializeCountdown();
    this.startCountdown();
  }

  private initializeCountdown(): void {
    const storedEndTime = localStorage.getItem(this.STORAGE_KEY);
    const now = Date.now();

    if (storedEndTime) {
      this.endTime = parseInt(storedEndTime, 10);
      if (this.endTime <= now) {
        this.finishCountdown();
      } else {
        this.countdownRunning.set(true);
        this.updateTimeDisplay();
        this.startInterval();
      }
    } else {
      this.countdownRunning.set(false);
    }
  }

  startCountdown(): void {
    const now = Date.now();
    if (!this.targetDateTimeString()) {
      alert('Veuillez choisir une date et une heure avant de démarrer !');
      return;
    }

    const target = new Date(this.targetDateTimeString()).getTime();
    if (isNaN(target) || target <= now) {
      alert('La date du jour J doit être dans le futur !');
      return;
    }
    this.endTime = target;
    localStorage.setItem(this.STORAGE_KEY, this.endTime.toString());

    this.updateEventDayFromTarget();

    this.countdownRunning.set(true);

    this.updateTimeDisplay();
    this.startInterval();
  }

  private startInterval(): void {
    this.stopInterval();
    this.countdownInterval = setInterval(() => this.updateTimeDisplay(), 1000);
  }

  private stopInterval(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }

  private updateTimeDisplay(): void {
    const now = Date.now();
    const remainingMs = this.endTime - now;

    if (remainingMs <= 0) {
      this.finishCountdown();
      return;
    }

    const totalSeconds = Math.floor(remainingMs / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.daysLeft.set(days);
    this.hours.set(hours);
    this.minutes.set(minutes);
    this.seconde.set(seconds);
  }

  private finishCountdown(): void {
    this.stopInterval();
    this.countdownRunning.set(false);

    this.daysLeft.set(0);
    this.hours.set(0);
    this.minutes.set(0);
    this.seconde.set(0);

    localStorage.removeItem(this.STORAGE_KEY);
  }

  formatTime(value: number): string {
    return String(value).padStart(2, '0');
  }

  ngOnDestroy(): void {
    this.stopInterval();
  }

  NowDate = new Date();
  eventDay = { start: signal(5), end: signal(6), month: signal('Décembre'), year: signal(2025) };

  updateEventDayFromTarget(): void {
    const dateValue = this.targetDateTimeString();
    if (!dateValue) return;

    const date = new Date(dateValue);

    const months = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ];

    this.eventDay.start.set(date.getDate());
    this.eventDay.end.set(date.getDate() + 1);
    this.eventDay.month.set(months[date.getMonth()]);
    this.eventDay.year.set(date.getFullYear());
  }

  engagementYear = 5;

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

  supports = [
    {
      name: 'DrcMind',
      role: 'Partenaire Principal',
      quote:
        "DrcMind accompagne le DevFest Kivu dans la promotion de l'innovation technologique et le développement des compétences numériques.",
    },
    {
      name: 'Jambo World',
      role: 'Partenaire Média',
      quote:
        'Jambo World contribue à la visibilité du DevFest Kivu à travers la couverture médiatique et la diffusion d’actualités tech.',
    },
    {
      name: 'Congo Cloud Computer',
      role: 'Partenaire Technique',
      quote:
        'Congo Cloud Computer fournit l’infrastructure cloud et le support technique pour assurer une expérience fluide durant l’événement.',
    },
  ];
}
