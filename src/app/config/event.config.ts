export interface EventConfig {
  edition: number;
  year: number;
  name: string;
  fullName: string;
  date: {
    start: Date;
    end: Date;
    display: {
      start: number;
      end: number;
      month: string;
      year: number;
    };
  };
  venue: {
    city: string;
    country: string;
    fullLocation: string;
    conferenceCenter: string;
  };
  theme: string;
  description: string;
  registrationUrl: string;
  contact: {
    email: string;
    phone: string;
  };
  impactStats: Array<{
    number: string;
    rawNumber: number;
    label: string;
    description: string;
  }>;
  engagementYear: number;
  supports: Array<{
    name: string;
    role: string;
    quote: string;
  }>;
  pastEvents: Array<{
    title: string;
    description: string;
    date: string;
    location: string;
    category: string;
    participants: string;
    tags: string[];
    badgeColor: string;
    dotColor: string;
  }>;
  agenda: {
    days: Array<{
      id: string;
      name: string;
      date: string;
      fullDate: string;
      location: string;
      isActive: boolean;
    }>;
  };
  firebase: {
    projectId: string;
    appId: string;
    storageBucket: string;
    apiKey: string;
    authDomain: string;
    messagingSenderId: string;
    measurementId: string;
  };
  liveQuestion: {
    defaultPin: string;
  };
}

export const EVENT_CONFIG: EventConfig = {
  edition: 2025,
  year: 2025,
  name: 'DevFest Kivu',
  fullName: 'DevFest Kivu 2025',
  date: {
    start: new Date('2025-11-29T10:00:00'),
    end: new Date('2025-11-29T18:00:00'),
    display: {
      start: 29,
      end: 29,
      month: 'Novembre',
      year: 2025,
    },
  },
  venue: {
    city: 'Bukavu',
    country: 'RD Congo',
    fullLocation: 'Bukavu, RD Congo',
    conferenceCenter: 'Hotel Panorama',
  },
  theme: 'Innovation & Tech',
  description: 'Le plus grand rassemblement tech de la région des Grands Lacs, réunissant développeurs, étudiants, élèves, entrepreneurs, etc.',
  registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-kivu-presents-devfest-kivu-2025/cohost-gdg-kivu',
  contact: {
    email: 'gdgkivu@gmail.com',
    phone: '+243999537410',
  },
  impactStats: [
    {
      number: '80+',
      rawNumber: 80,
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
  ],
  engagementYear: 5,
  supports: [
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
        'Jambo World contribue à la visibilité du DevFest Kivu à travers la couverture médiatique et la diffusion d\'actualités tech.',
    },
    {
      name: 'Congo Cloud Computer',
      role: 'Partenaire Technique',
      quote:
        'Congo Cloud Computer fournit l\'infrastructure cloud et le support technique pour assurer une expérience fluide durant l\'événement.',
    },
  ],
  pastEvents: [
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
      title: 'DevFest Kivu 2019',
      description:
        'Première édition du DevFest Kivu, marquant le début d\'une tradition technologique dans la région.',
      date: 'Décembre 2019',
      location: 'Bukavu',
      category: 'Festival',
      participants: '200+',
      tags: ['Web', 'Mobile', 'Community'],
      badgeColor: 'text-green-700 bg-green-100',
      dotColor: 'bg-green-500',
    },
    {
      title: 'Web Development Bootcamp',
      description:
        'Bootcamp intensif de développement web pour les débutants, avec focus sur les technologies modernes.',
      date: 'Janvier 2025',
      location: 'Bukavu',
      category: 'Formation',
      participants: '50+',
      tags: ['Web', 'JavaScript', 'HTML/CSS'],
      badgeColor: 'text-orange-700 bg-orange-100',
      dotColor: 'bg-orange-500',
    },
    {
      title: 'Mobile App Challenge',
      description:
        'Concours de développement d\'applications mobiles avec des prix et des mentors experts.',
      date: 'Juillet 2025',
      location: 'Bukavu',
      category: 'Challenge',
      participants: '30+',
      tags: ['Mobile', 'Android', 'iOS'],
      badgeColor: 'text-red-700 bg-red-100',
      dotColor: 'bg-red-500',
    },
  ],
  agenda: {
    days: [
      {
        id: 'day1',
        name: 'DevFest Kivu',
        date: '29 Nov',
        fullDate: 'Samedi 29 Novembre 2025',
        location: 'Centre de Conférences DevFest',
        isActive: true,
      },
    ],
  },
  firebase: {
    projectId: `devfestkivu${2025}`,
    appId: '1:142493229043:web:2e7e063847140023c83c86',
    storageBucket: `devfestkivu${2025}.firebasestorage.app`,
    apiKey: 'AIzaSyDs1NHP5Fcwqb4G9_07eaQmNe8zrrbmqXY',
    authDomain: `devfestkivu${2025}.firebaseapp.com`,
    messagingSenderId: '142493229043',
    measurementId: 'G-JGFQPBQ6WY',
  },
  liveQuestion: {
    defaultPin: `dev${2025}`,
  },
};