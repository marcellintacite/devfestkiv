import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
})
export default class AgendaComponent {
  currentDayIndex = 0;

  days = [
    {
      id: 'day1',
      name: 'DevFest Kivu',
      date: '23 Oct',
      fullDate: 'Jeudi 23 Octobre 2025',
      location: 'Centre de Conférences DevFest',
      isActive: true,
    },
  ];

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
      Break: 'bg-gray-100 text-gray-700 border border-gray-300',
      Conference: 'bg-blue-100 text-blue-700 border border-blue-300',
      Keynote: 'bg-green-100 text-green-700 border border-green-300',
      Workshop: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
      Talk: 'bg-red-100 text-red-700 border border-red-300',
      // Discussion: 'bg-red-100 text-red-700 border border-red-300',
      // Closing: 'bg-orange-100 text-orange-700 border border-orange-300',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border border-gray-300';
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
