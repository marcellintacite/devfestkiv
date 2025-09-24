import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.html',
  standalone: true,
  imports: [CommonModule],
})
export default class AgendaComponent {
  // Jour actuellement sélectionné
  currentDayIndex = 0;

  // Configuration des jours
  days = [
    {
      id: 'thursday',
      name: 'Thursday',
      date: '23',
      fullDate: 'Thursday, October 23, 2025',
      isActive: true,
    },
    {
      id: 'friday',
      name: 'Friday',
      date: '24',
      fullDate: 'Friday, October 24, 2025',
      isActive: false,
    },
  ];

  // Créneaux horaires (identiques pour les deux jours)
  timeSlots = [
    { time: '08:30 - 09:20', display: '08:30' },
    { time: '09:30 - 10:20', display: '09:30' },
    { time: '10:30 - 11:20', display: '10:30' },
    { time: '11:00 - 11:40', display: '11:00' },
    { time: '12:00 - 12:50', display: '12:00' },
  ];

  // Salles/Colonnes
  halls = ['Conférences', 'Workshops', 'Networking'];

  // Événements organisés par jour
  eventsData = {
    thursday: [
      {
        hall: 'Conférences',
        title: 'Breakfast & Registration',
        speaker: '',
        timeSlot: '08:30 - 09:20',
        category: 'Beyond IT',
      },
      {
        hall: 'Conférences',
        title: 'Kick Off',
        speaker: 'Opening Speaker',
        timeSlot: '09:30 - 10:20',
        category: 'Beyond IT',
      },
      {
        hall: 'Conférences',
        title: 'Break',
        speaker: '',
        timeSlot: '10:30 - 11:20',
        category: 'Beyond IT',
      },
      {
        hall: 'Conférences',
        title: 'Quantum Computing: A Threat to Internet Security and Bitcoin?',
        speaker: 'Tomáš Sušánka, Trezor',
        timeSlot: '11:00 - 11:40',
        category: 'Cybersecurity',
      },
      {
        hall: 'Workshops',
        title: 'LLMs on GKE in no time',
        speaker: 'Fatos Hoti, Google',
        timeSlot: '11:00 - 11:40',
        category: 'Cloud',
      },
      {
        hall: 'Networking',
        title: 'Hype Driven Development: How I learned to stop worrying and love the failures',
        speaker: 'Ashley Davies, Independent',
        timeSlot: '11:00 - 11:40',
        category: 'Mobile',
      },
      {
        hall: 'Conférences',
        title: 'Lunch & Networking',
        speaker: '',
        timeSlot: '12:00 - 12:50',
        category: 'Beyond IT',
      },
    ],
    friday: [
      {
        hall: 'Networking',
        title: 'Morning Coffee & Networking',
        speaker: '',
        timeSlot: '08:30 - 09:20',
        category: 'Beyond IT',
      },
      {
        hall: 'Conférences',
        title: 'Future of Web Development',
        speaker: 'Tech Speaker 2',
        timeSlot: '09:30 - 10:20',
        category: 'Web',
      },
      {
        hall: 'Networking',
        title: 'Coffee Break',
        speaker: '',
        timeSlot: '10:30 - 11:20',
        category: 'Beyond IT',
      },
      {
        hall: 'Conférences',
        title: 'Machine Learning in Production',
        speaker: 'ML Engineer',
        timeSlot: '11:00 - 11:40',
        category: 'AI/ML',
      },
      {
        hall: 'Workshops',
        title: 'DevOps Best Practices',
        speaker: 'DevOps Lead',
        timeSlot: '11:00 - 11:40',
        category: 'Cloud',
      },
      {
        hall: 'Networking',
        title: 'Mobile App Performance & Networking Session',
        speaker: 'Mobile Dev',
        timeSlot: '11:00 - 11:40',
        category: 'Mobile',
      },
      {
        hall: 'Networking',
        title: 'Closing & Final Networking',
        speaker: '',
        timeSlot: '12:00 - 12:50',
        category: 'Beyond IT',
      },
    ],
  };

  // Récupère les événements du jour actuel
  get currentDayEvents() {
    const currentDay = this.days[this.currentDayIndex];
    return this.eventsData[currentDay.id as keyof typeof this.eventsData];
  }

  // Récupère le jour actuel
  get currentDay() {
    return this.days[this.currentDayIndex];
  }

  // Navigation entre les jours
  selectDay(index: number) {
    this.currentDayIndex = index;
    // Mettre à jour l'état actif
    this.days.forEach((day, i) => {
      day.isActive = i === index;
    });
  }

  // Navigation précédent/suivant
  previousDay() {
    if (this.currentDayIndex > 0) {
      this.selectDay(this.currentDayIndex - 1);
    }
  }

  nextDay() {
    if (this.currentDayIndex < this.days.length - 1) {
      this.selectDay(this.currentDayIndex + 1);
    }
  }

  // Méthodes pour le template (utilisant les événements du jour actuel)
  getEventsByTimeSlot(timeSlot: string) {
    return this.currentDayEvents.filter((event: any) => event.timeSlot === timeSlot);
  }

  getEventByTimeSlotAndHall(timeSlot: string, hall: string) {
    return this.currentDayEvents.find(
      (event: any) => event.timeSlot === timeSlot && event.hall === hall
    );
  }

  // Vérifie s'il n'y a qu'un seul événement dans ce créneau
  hasSingleEventInTimeSlot(timeSlot: string): boolean {
    return this.getEventsByTimeSlot(timeSlot).length === 1;
  }

  // Récupère le premier événement du créneau (pour les événements étendus)
  getFirstEventInTimeSlot(timeSlot: string) {
    const events = this.getEventsByTimeSlot(timeSlot);
    return events.length > 0 ? events[0] : null;
  }

  // Vérifie si c'est la première salle pour ce créneau (pour éviter la duplication)
  isFirstHallInTimeSlot(timeSlot: string, hall: string): boolean {
    const events = this.getEventsByTimeSlot(timeSlot);
    if (events.length !== 1) return false;
    return events[0].hall === hall;
  }
}
