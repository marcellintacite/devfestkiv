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
}
