import { Component } from '@angular/core';

@Component({
  selector: 'app-past-events-gallery',
  imports: [],
  templateUrl: 'past-events-gallery.html',
  styleUrl: 'past-events-gallery.css',
})
export default class PastEventsGallery {
  firstRowEvents = [
    {
      title: 'DevFest Kivu 2024',
      description:
        'Grand festival annuel avec des speakers internationaux et des workshops innovants sur les dernières technologies.',
      date: 'Décembre 2024',
      location: 'Bukavu',
      category: 'Festival',
      participants: '400+',
      tags: ['AI/ML', 'Web', 'Mobile'],
      badgeColor: 'text-blue-700 bg-blue-100',
      dotColor: 'bg-blue-500',
    },
    //edit
    {
      title: 'DevFest Kivu 2023',
      description:
        'Grand festival annuel avec des speakers internationaux et des workshops innovants sur les dernières technologies.',
      date: 'Décembre 2023',
      location: 'Bukavu',
      category: 'Festival',
      participants: '400+',
      tags: ['AI/ML', 'Cloud', 'Mobile'],
      badgeColor: 'text-blue-700 bg-blue-100',
      dotColor: 'bg-blue-500',
    },
    //edit
    {
      title: 'DevFest Kivu 2022',
      description:
        'Grand festival annuel avec des speakers internationaux et des workshops innovants sur les dernières technologies.',
      date: 'Décembre 2022',
      location: 'Bukavu',
      category: 'Festival',
      participants: '400+',
      tags: ['AI/ML', 'Cloud', 'Mobile'],
      badgeColor: 'text-blue-700 bg-blue-100',
      dotColor: 'bg-blue-500',
    },
    //edit
    {
      title: 'DevFest Kivu 2021',
      description:
        'Grand festival annuel avec des speakers internationaux et des workshops innovants sur les dernières technologies.',
      date: 'Décembre 2021',
      location: 'Bukavu',
      category: 'Festival',
      participants: '400+',
      tags: ['AI/ML', 'Cloud', 'Mobile'],
      badgeColor: 'text-blue-700 bg-blue-100',
      dotColor: 'bg-blue-500',
    },
    //edit
    {
      title: 'DevFest Kivu 2020',
      description:
        'Grand festival annuel avec des speakers internationaux et des workshops innovants sur les dernières technologies.',
      date: 'Décembre 2020',
      location: 'Bukavu',
      category: 'Festival',
      participants: '400+',
      tags: ['AI/ML', 'Cloud', 'Mobile'],
      badgeColor: 'text-blue-700 bg-blue-100',
      dotColor: 'bg-blue-500',
    },
    {
      title: 'AI/ML Meetup',
      description:
        "Rencontre dédiée à l'intelligence artificielle et au machine learning avec des cas d'usage africains.",
      date: 'Juillet 2025',
      location: 'Bukavu',
      category: 'Meetup',
      participants: '80+',
      tags: ['AI', 'Machine Learning', 'Data'],
      badgeColor: 'text-purple-700 bg-purple-100',
      dotColor: 'bg-purple-500',
    },
  ];

  secondRowEvents = [
    {
      title: 'Malakisi-Lancement',
      description:
        'Formation intensive de développement web et mobile moderne avec Angular, Kotlin, Firebase et les meilleures pratiques.',
      date: 'Novembre 2024',
      location: 'Bukavu',
      category: 'Formation',
      participants: '100+',
      tags: ['Angular', 'Kotlin', 'Firebase'],
      badgeColor: 'text-indigo-700 bg-indigo-100',
      dotColor: 'bg-indigo-500',
    },
    {
      title: 'Build With AI',
      description: "Rencontre dédiée à l'intelligence artificielle",
      date: 'Juillet 2025',
      location: 'Bukavu',
      category: 'Meetup',
      participants: '80+',
      tags: ['AI', 'Machine Learning', 'Data'],
      badgeColor: 'text-purple-700 bg-purple-100',
      dotColor: 'bg-purple-500',
    },
    {
      title: 'Web Dev Bootcamp',
      description:
        'Formation intensive de développement web moderne avec Angular, Firebase et les meilleures pratiques.',
      date: 'Novembre 2024',
      location: 'Bukavu',
      category: 'Formation',
      participants: '100+',
      tags: ['Angular', 'Malakisi', 'Firebase'],
      badgeColor: 'text-indigo-700 bg-indigo-100',
      dotColor: 'bg-indigo-500',
    },
    {
      title: 'Malakisi-Evenement de cloture',
      description: "Journée de cloture et remise de certificat d'achevement Malakisi.",
      date: 'Juillet 2025',
      location: 'Bukavu',
      category: 'Event',
      participants: '70+',
      tags: ['Angular', 'Kotlin', 'Firebase'],
      badgeColor: 'text-teal-700 bg-teal-100',
      dotColor: 'bg-teal-500',
    },
    {
      title: 'Mobile Dev Bootcamp',
      description:
        'Formation intensive de développement mobile moderne avec Kotlin, Firebase et les meilleures pratiques.',
      date: 'Janvier 2025',
      location: 'Bukavu',
      category: 'Formation',
      participants: '100+',
      tags: ['Malakisi', 'Kotlin', 'Firebase'],
      badgeColor: 'text-indigo-700 bg-indigo-100',
      dotColor: 'bg-indigo-500',
    },
    {
      title: 'Malakisi-Evenement de cloture',
      description: "Journée de cloture et remise de certificat d'achevement Malakisi.",
      date: 'Juillet 2025',
      location: 'Bukavu',
      category: 'Event',
      participants: '70+',
      tags: ['Angular', 'Kotlin', 'Firebase'],
      badgeColor: 'text-teal-700 bg-teal-100',
      dotColor: 'bg-teal-500',
    },
  ];
}
