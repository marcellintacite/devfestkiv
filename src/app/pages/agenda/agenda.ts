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

  // Configuration des jours avec tracks spécifiques
  days = [
    {
      id: 'thursday',
      name: 'Jeudi - Track Web',
      date: '23',
      fullDate: 'Jeudi 23 Octobre 2025 - Track Web Development',
      track: 'web',
      description: 'Focus sur les technologies Web, Cloud et Cybersécurité',
      isActive: true,
    },
    {
      id: 'friday',
      name: 'Vendredi - Track Mobile',
      date: '24',
      fullDate: 'Vendredi 24 Octobre 2025 - Track Mobile Development',
      track: 'mobile',
      description: 'Focus sur le développement Mobile, AI/ML et DevOps',
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
        title: 'Modern Web Frameworks: React vs Angular vs Vue',
        speaker: 'Ashley Davies, Independent',
        timeSlot: '11:00 - 11:40',
        category: 'Web',
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
        title: 'Future of Mobile Development',
        speaker: 'Tech Speaker 2',
        timeSlot: '09:30 - 10:20',
        category: 'Mobile',
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
