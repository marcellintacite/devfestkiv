import { Injectable } from '@angular/core';
import { Speaker } from '../models/speaker.model';

@Injectable({
  providedIn: 'root',
})
export class SpeakersService {
  speakers: Speaker[] = Array.from({ length: 10 }, (_, i) => ({
    name: `Speaker ${i + 1}`,
    title: `Lorem ipsum ${i + 1}`,
    bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Speaker ${
      i + 1
    } partage son expérience et ses connaissances avec passion.`,
    photo: `https://randomuser.me/api/portraits/men/${i + 20}.jpg`,
    socials: {
      twitter: `https://twitter.com/speaker${i + 1}`,
      linkedin: `https://linkedin.com/in/speaker${i + 1}`,
      github: `https://github.com/speaker${i + 1}`,
    },
  }));
  constructor() {
    this.speakers[0] = {
      name: 'Dorcas Bagalwa',
      title: 'Développeuse web',
      bio: 'Passionnée par le développement frontend et les interfaces modernes  .',
      photo: './assets/IMG-20240101-WA0025.jpg',
      socials: {
        twitter: 'https://twitter.com/tabitabagalwa',
        linkedin: 'https://linkedin.com/in/tabitabagalwa',
        github: 'https://github.com/tabitabagalwa',
      },
    };
    this.speakers[7].name = 'Aksanti Bahiga';
    this.speakers[2].name = 'Georges Byona';
    this.speakers[7].photo = './assets/_MALAKISI0198 (227)~2.jpg';
    this.speakers[4].photo = './assets/IMG-20220625-WA0013.jpg';
    this.speakers[3].photo = './assets/IMG-20240101-WA0025.jpg';
    this.speakers[5].photo = './assets/DEMO DAY AND AWARDS EVENT0003 (329)~2.jpg';
    this.speakers[2].photo = './assets/DEMO DAY AND AWARDS EVENT0003 (338)~2.jpg';
    this.speakers[6].photo = './assets/DEMO DAY AND AWARDS EVENT0003 (400)~2.jpg';
    this.speakers[1].photo = './assets/IMG-20220625-WA0013.jpg';
    this.speakers[8].photo = './assets/IMG-20240101-WA0025.jpg';
    this.speakers[9].photo = './assets/IMG-20220625-WA0013.jpg';
  }
}
