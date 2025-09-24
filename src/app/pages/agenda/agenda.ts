import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.html',
  standalone: true,
  imports: [CommonModule],
})
export default class AgendaComponent {
  timeSlots = [
    { time: '08:30 - 09:20', display: '08:30' },
    { time: '09:30 - 10:20', display: '09:30' },
    { time: '10:30 - 11:20', display: '10:30' },
    { time: '11:00 - 11:40', display: '11:00' },
    { time: '12:00 - 12:50', display: '12:00' },
  ];

  halls = ['Lorem Ipsum', 'Dolor Sit', 'Amet Consectetur'];

  events = [
    {
      hall: 'Lorem Ipsum',
      title: 'Accueil : mot d\'ouverture',
      speaker: '',
      timeSlot: '08:30 - 09:20',
      category: 'Beyond IT',
    },
    {
      hall: 'Lorem Ipsum',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      speaker: 'Speaker Principal',
      timeSlot: '09:30 - 10:20',
      category: 'Beyond IT',
    },
    {
      hall: 'Lorem Ipsum',
      title: 'Pause café',
      speaker: '',
      timeSlot: '10:30 - 11:20',
      category: 'Beyond IT',
    },
    {
      hall: 'Lorem Ipsum',
      title: 'Recalibrate - How AI shakes up software teams',
      speaker: 'Sven Peters, Atlassian',
      timeSlot: '11:00 - 11:40',
      category: 'Beyond IT',
    },
    {
      hall: 'Dolor Sit',
      title: 'LLMs on GKE in no time',
      speaker: 'Fatos Hoti, Google',
      timeSlot: '11:00 - 11:40',
      category: 'Cloud',
    },
    {
      hall: 'Amet Consectetur',
      title: 'Hype Driven Development',
      speaker: 'Ashley Davies, Independent',
      timeSlot: '11:00 - 11:40',
      category: 'Mobile',
    },
    {
      hall: 'Lorem Ipsum',
      title: 'Pause et réseautage',
      speaker: '',
      timeSlot: '12:00 - 12:50',
      category: 'Beyond IT',
    },
  ];

  getEventsByTimeSlot(timeSlot: string) {
    return this.events.filter((event) => event.timeSlot === timeSlot);
  }

  getEventByTimeSlotAndHall(timeSlot: string, hall: string) {
    return this.events.find((event) => event.timeSlot === timeSlot && event.hall === hall);
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
