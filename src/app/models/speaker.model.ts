export interface Speaker {
  name: string;
  title: string;
  bio: string;
  photo: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  day: 'jour1' | 'jour2';
  color?: {
    borderColor: string;
    bgColor: string;
    bgColorFull: string;
  };
}
