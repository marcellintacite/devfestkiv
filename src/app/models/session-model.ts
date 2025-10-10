export interface questionInterface{
  contenu: string;
  time: string
}

export interface Session<T> {
  id: string;
  title: string;
  speaker: string;
  theme: string;
  time: string;
  track: string;
  slides: string;
  questions: questionInterface[];
  description: string;
  isActive: boolean;
  createAt: T;
  updateAt: T;
}
