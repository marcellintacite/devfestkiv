import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventConfigService } from '../../config/event-config.service';

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

  ngOnInit(): void {
    // Scroll to top when component initializes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Agenda data is coming soon - keeping minimal structure for future use
  // eventsData and related methods are commented out until agenda is ready

  /*
  currentDayIndex = 0;
  activeTab = signal<'web' | 'mobile'>('web');

  days = this.eventConfig.agenda.days;

  // Données avec colonnes Web/Mobile
  eventsData = {
    day1: {
      Web: [
        // Event data will be added here when agenda is ready
      ],
      Mobile: [
        // Event data will be added here when agenda is ready
      ],
    },
  };

  get currentDay() {
    return this.days[this.currentDayIndex];
  }

  selectDay(index: number) {
    this.currentDayIndex = 0;
    this.days[0].isActive = true;
  }

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
  */
}
