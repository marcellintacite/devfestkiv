import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventConfigService } from '../../config/event-config.service';

interface Event {
  time: string;
  title: string;
  speaker?: string;
  category: string;
}

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.html',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
      opacity: 0;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `],
})
export default class AgendaComponent implements OnInit {
  eventConfig = inject(EventConfigService);

  currentDayIndex = 0;
  activeTab = signal<'web' | 'mobile'>('web');

  ngOnInit(): void {
    // Scroll to top when component initializes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  days = this.eventConfig.agenda.days;

  // Données avec colonnes Web/Mobile
  eventsData = {
    day1: {
      Web: [
        { time: '07:00 - 08:00', title: 'Breakfast (Petit)', speaker: '', category: 'Break' },
        {
          time: '08:00 - 09:00',
          title: 'Introduction and Overview',
          speaker: 'John Doe, Google Developer',
          category: 'Conference',
        },
        {
          time: '09:30 - 10:00',
          title: 'Breaking the Barriers: Building the Future People',
          speaker: 'Sarah Johnson',
          category: 'Keynote',
        },
        { time: '10:00 - 10:15', title: 'Coffee Break', speaker: '', category: 'Break' },
        {
          time: '10:15 - 11:30',
          title: 'Modern Web Frameworks',
          speaker: 'Alex Wilson',
          category: 'Workshop',
        },
        {
          time: '11:30 - 12:15',
          title: 'Progressive Web Apps',
          speaker: 'Maria Rodriguez',
          category: 'Talk',
        },
        { time: '12:15 - 01:00', title: 'Lunch', speaker: '', category: 'Break' },
        {
          time: '01:00 - 02:00',
          title: 'Web Performance Optimization',
          speaker: 'David Kim',
          category: 'Workshop',
        },
        { time: '02:45 - 03:15', title: 'Q&A Session', speaker: '', category: 'Discussion' },
        { time: '03:15 - 03:30', title: 'Networking Break', speaker: '', category: 'Break' },
        { time: '03:30 - 03:45', title: 'Day 1 Wrap-up', speaker: '', category: 'Closing' },
      ],
      Mobile: [
        { time: '07:00 - 08:00', title: 'Breakfast (Mobile)', speaker: '', category: 'Break' },
        {
          time: '08:00 - 09:00',
          title: 'Mobile Development Overview',
          speaker: 'Emma Thompson',
          category: 'Conference',
        },
        {
          time: '09:30 - 10:00',
          title: 'Flutter vs React Native',
          speaker: 'Michael Chen',
          category: 'Keynote',
        },
        { time: '10:00 - 10:15', title: 'Coffee Break', speaker: '', category: 'Break' },
        {
          time: '10:15 - 11:30',
          title: 'Native iOS Development',
          speaker: 'Lisa Park',
          category: 'Workshop',
        },
        {
          time: '11:30 - 12:15',
          title: 'Android Jetpack Compose',
          speaker: 'Robert Taylor',
          category: 'Talk',
        },
        { time: '12:15 - 01:00', title: 'Lunch Break', speaker: '', category: 'Break' },
        {
          time: '01:00 - 02:00',
          title: 'Mobile App Security',
          speaker: 'Jennifer White',
          category: 'Workshop',
        },
        { time: '02:45 - 03:15', title: 'Mobile Q&A', speaker: '', category: 'Discussion' },
        { time: '03:15 - 03:30', title: 'Networking', speaker: '', category: 'Break' },
        { time: '03:30 - 03:45', title: 'Mobile Wrap-up', speaker: '', category: 'Closing' },
      ],
    },
  };

  get currentDay() {
    return this.days[this.currentDayIndex];
  }

  selectDay(index: number) {
    // Un seul jour disponible, pas besoin de logique complexe
    this.currentDayIndex = 0;
    this.days[0].isActive = true;
  }

  // Couleurs Google pour les badges à modifier si besoin

  getBadgeColor(category: string): string {
    const colors: { [key: string]: string } = {
      Break: 'bg-gray-500 text-white border border-gray-600',
      Conference: 'bg-blue-500 text-white border border-blue-600',
      Keynote: 'bg-green-500 text-white border border-green-600',
      Workshop: 'bg-yellow-500 text-white border border-yellow-600',
      Talk: 'bg-red-500 text-white border border-red-600',
      Discussion: 'bg-purple-500 text-white border border-purple-600',
      Closing: 'bg-orange-500 text-white border border-orange-600',
    };
    return colors[category] || 'bg-gray-500 text-white border border-gray-600';
  }

  // Méthodes pour récupérer les événements depuis json
  getWebEvents(): Event[] {
    if (this.currentDay.id === 'day1') {
      const day1Data = this.eventsData['day1'] as Record<string, Event[]>;
      return day1Data['Web'] || [];
    }
    return [];
  }

  getMobileEvents(): Event[] {
    if (this.currentDay.id === 'day1') {
      const day1Data = this.eventsData['day1'] as Record<string, Event[]>;
      return day1Data['Mobile'] || [];
    }
    return [];
  }
}
