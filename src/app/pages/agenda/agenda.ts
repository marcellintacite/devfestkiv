import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Event {
  hall: string;
  title: string;
  speaker: string;
  speakerAvatar?: string;
  timeSlot: string;
  category: string;
}

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
      name: 'Jeudi',
      date: '23',
      fullDate: 'Jeudi 23 Octobre 2025',
      track: 'web',
      isActive: true,
    },
    {
      id: 'friday',
      name: 'Vendredi',
      date: '24',
      fullDate: 'Vendredi 24 Octobre 2025',
      track: 'all',
      isActive: false,
    },
  ];

  // Configuration des tracks du jeudi avec couleurs Tailwind
  thursdayTracks = [
    {
      id: 'web',
      name: 'Web Development',
      icon: 'M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z',
      color: 'blue',
      active: true,
    },
    {
      id: 'mobile',
      name: 'Mobile Development',
      icon: 'M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z',
      color: 'green',
      active: false,
    },
    {
      id: 'general',
      name: 'Track Général',
      icon: 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4Z',
      color: 'red',
      active: false,
    },
  ];

  // Track actuellement sélectionné pour le jeudi
  currentThursdayTrack = 'web';

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

  // Événements organisés par jour et track
  eventsData = {
    'thursday-web': [
      {
        hall: 'Conférences',
        title: 'Accueil & Inscription - Track Web',
        speaker: '',
        timeSlot: '08:30 - 09:20',
        category: 'Conference',
      },
      {
        hall: 'Workshops',
        title: 'Web Security Fundamentals',
        speaker: 'Security Expert',
        speakerAvatar: '/assets/speakers/security-expert.jpg',
        timeSlot: '08:30 - 09:20',
        category: 'Workshop',
      },
      {
        hall: 'Conférences',
        title: 'Modern Web Development - Keynote',
        speaker: 'Web Expert',
        speakerAvatar: '/assets/speakers/web-expert.jpg',
        timeSlot: '09:30 - 10:20',
        category: 'Conference',
      },
      {
        hall: 'Conférences',
        title: 'Pause Café',
        speaker: '',
        timeSlot: '10:30 - 11:20',
        category: 'Conference',
      },
      {
        hall: 'Conférences',
        title: "React 19: What's New and Exciting",
        speaker: 'React Expert',
        speakerAvatar: '/assets/speakers/react-expert.jpg',
        timeSlot: '11:00 - 11:40',
        category: 'Talk',
      },
      {
        hall: 'Workshops',
        title: 'Progressive Web Apps Workshop',
        speaker: 'PWA Specialist',
        speakerAvatar: '/assets/speakers/pwa-specialist.jpg',
        timeSlot: '11:00 - 11:40',
        category: 'Workshop',
      },
      {
        hall: 'Networking',
        title: 'Web Performance Optimization',
        speaker: 'Ashley Davies',
        speakerAvatar: '/assets/speakers/ashley-davies.jpg',
        timeSlot: '11:00 - 11:40',
        category: 'Talk',
      },
      {
        hall: 'Conférences',
        title: 'Déjeuner & Networking',
        speaker: '',
        timeSlot: '12:00 - 12:50',
        category: 'Conference',
      },
    ],
    'thursday-mobile': [
      {
        hall: 'Conférences',
        title: 'Accueil & Inscription - Track Mobile',
        speaker: '',
        timeSlot: '08:30 - 09:20',
        category: 'Conference',
      },
      {
        hall: 'Workshops',
        title: 'Mobile Security Best Practices',
        speaker: 'Mobile Security Expert',
        speakerAvatar: '/assets/speakers/mobile-security.jpg',
        timeSlot: '08:30 - 09:20',
        category: 'Workshop',
      },
      {
        hall: 'Conférences',
        title: 'Future of Mobile Development - Keynote',
        speaker: 'Mobile Expert',
        speakerAvatar: '/assets/speakers/mobile-expert.jpg',
        timeSlot: '09:30 - 10:20',
        category: 'Conference',
      },
      {
        hall: 'Conférences',
        title: 'Pause Café',
        speaker: '',
        timeSlot: '10:30 - 11:20',
        category: 'Conference',
      },
      {
        hall: 'Conférences',
        title: 'Flutter vs React Native: The Ultimate Comparison',
        speaker: 'Cross-Platform Expert',
        speakerAvatar: '/assets/speakers/cross-platform.jpg',
        timeSlot: '11:00 - 11:40',
        category: 'Talk',
      },
      {
        hall: 'Workshops',
        title: 'Building Native iOS Apps with Swift',
        speaker: 'iOS Developer',
        speakerAvatar: '/assets/speakers/ios-dev.jpg',
        timeSlot: '11:00 - 11:40',
        category: 'Workshop',
      },
      {
        hall: 'Networking',
        title: 'Android Jetpack Compose Deep Dive',
        speaker: 'Android Expert',
        speakerAvatar: '/assets/speakers/android-expert.jpg',
        timeSlot: '11:00 - 11:40',
        category: 'Talk',
      },
      {
        hall: 'Conférences',
        title: 'Déjeuner & Networking',
        speaker: '',
        timeSlot: '12:00 - 12:50',
        category: 'Conference',
      },
    ],
    'thursday-general': [
      {
        hall: 'Conférences',
        title: 'Accueil & Inscription - Track Général',
        speaker: '',
        timeSlot: '08:30 - 09:20',
        category: 'Conference',
      },
      {
        hall: 'Workshops',
        title: 'Introduction au Cloud Computing',
        speaker: 'Cloud Architect',
        speakerAvatar: '/assets/speakers/cloud-architect.jpg',
        timeSlot: '08:30 - 09:20',
        category: 'Workshop',
      },
      {
        hall: 'Conférences',
        title: "DevFest Kivu 2025 - Keynote d'Ouverture",
        speaker: 'Keynote Speaker',
        speakerAvatar: '/assets/speakers/keynote-speaker.jpg',
        timeSlot: '09:30 - 10:20',
        category: 'Conference',
      },
      {
        hall: 'Conférences',
        title: 'Pause Café',
        speaker: '',
        timeSlot: '10:30 - 11:20',
        category: 'Conference',
      },
      {
        hall: 'Conférences',
        title: "L'Intelligence Artificielle au Service du Développement",
        speaker: 'AI Researcher',
        speakerAvatar: '/assets/speakers/ai-researcher.jpg',
        timeSlot: '11:00 - 11:40',
        category: 'Talk',
      },
      {
        hall: 'Workshops',
        title: 'DevOps et CI/CD: Les Fondamentaux',
        speaker: 'DevOps Lead',
        speakerAvatar: '/assets/speakers/devops-lead.jpg',
        timeSlot: '11:00 - 11:40',
        category: 'Workshop',
      },
      {
        hall: 'Networking',
        title: 'Entrepreneuriat Tech en Afrique',
        speaker: 'Tech Entrepreneur',
        speakerAvatar: '/assets/speakers/entrepreneur.jpg',
        timeSlot: '11:00 - 11:40',
        category: 'Talk',
      },
      {
        hall: 'Conférences',
        title: 'Déjeuner & Networking',
        speaker: '',
        timeSlot: '12:00 - 12:50',
        category: 'Conference',
      },
    ],
    friday: [
      {
        hall: 'Networking',
        title: 'Morning Coffee & Networking',
        speaker: '',
        timeSlot: '08:30 - 09:20',
        category: 'Conference',
      },
      {
        hall: 'Conférences',
        title: 'Mobile Development Bootcamp',
        speaker: 'Mobile Expert',
        speakerAvatar: '/assets/speakers/mobile-expert.jpg',
        timeSlot: '08:30 - 09:20',
        category: 'Workshop',
      },
      {
        hall: 'Conférences',
        title: 'Future of Mobile Development - Keynote',
        speaker: 'Tech Speaker 2',
        speakerAvatar: '/assets/speakers/tech-speaker-2.jpg',
        timeSlot: '09:30 - 10:20',
        category: 'Conference',
      },
      {
        hall: 'Networking',
        title: 'Coffee Break',
        speaker: '',
        timeSlot: '10:30 - 11:20',
        category: 'Conference',
      },
      {
        hall: 'Conférences',
        title: 'Machine Learning in Production',
        speaker: 'ML Engineer',
        speakerAvatar: '/assets/speakers/ml-engineer.jpg',
        timeSlot: '11:00 - 11:40',
        category: 'Talk',
      },
      {
        hall: 'Workshops',
        title: 'DevOps Best Practices',
        speaker: 'DevOps Lead',
        speakerAvatar: '/assets/speakers/devops-lead.jpg',
        timeSlot: '11:00 - 11:40',
        category: 'Workshop',
      },
      {
        hall: 'Networking',
        title: 'Mobile App Performance & Networking Session',
        speaker: 'Mobile Dev',
        timeSlot: '11:00 - 11:40',
        category: 'Talk',
      },
      {
        hall: 'Networking',
        title: 'Closing & Final Networking',
        speaker: '',
        timeSlot: '12:00 - 12:50',
        category: 'Conference',
      },
    ],
  };

  // Récupère les événements du jour actuel
  get currentDayEvents() {
    const currentDay = this.days[this.currentDayIndex];
    if (currentDay.id === 'thursday') {
      const trackKey = `thursday-${this.currentThursdayTrack}`;
      return this.eventsData[trackKey as keyof typeof this.eventsData];
    }
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

  // Vérifie s'il y a des événements dans un créneau (pour mobile)
  hasEventsInTimeSlot(timeSlot: string): boolean {
    return this.getEventsByTimeSlot(timeSlot).length > 0;
  }

  // Récupère les événements non-vides pour mobile
  getEventsForMobileTimeSlot(timeSlot: string) {
    return this.halls
      .map((hall) => this.getEventByTimeSlotAndHall(timeSlot, hall))
      .filter((event) => event !== undefined);
  }

  // Méthodes pour gérer les tracks du jeudi
  selectThursdayTrack(trackId: string) {
    this.currentThursdayTrack = trackId;
    // Mettre à jour l'état actif des tracks
    this.thursdayTracks.forEach((track) => {
      track.active = track.id === trackId;
    });
  }

  // Vérifie si le jeudi est sélectionné
  get isThursdaySelected(): boolean {
    return this.currentDay.id === 'thursday';
  }
}
