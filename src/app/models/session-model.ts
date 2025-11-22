
export interface FloatingReaction {
  id: string;
  emoji: string;
  startX: number;
  startY: number;
  animationClass: string;
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
  reactions?: FloatingReaction;
}

export interface questionInterface {
  contenu: string;
  time: string;
  reactions?: { emoji: string; count: number }[];
  showReactions?: boolean; // Pour gérer l'affichage du panel de réactions
}
