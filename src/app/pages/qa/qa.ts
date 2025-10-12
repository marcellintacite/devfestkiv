import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type QaItem = {
  id: number;
  question: string;
  answer: string;
  category?: 'Logistique' | 'Inscription' | 'Speakers' | 'Technique' | 'Autre';
  tags?: string[];
};

@Component({
  selector: 'app-qa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qa.html',
})
export default class QaComponent implements OnInit {
  // Only state we need for now
  openId: number | null = null;

  ngOnInit(): void {
    // Scroll to top when component initializes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  qaItems: QaItem[] = [
    {
      id: 1,
      question: "Qu'est-ce que DevFest Kivu ?",
      answer:
        'DevFest Kivu rassemble la communauté tech locale autour de conférences, ateliers et networking. Objectif : partager savoirs et opportunités.',
    },
    {
      id: 2,
      question: "Comment m'inscrire ?",
      answer:
        "Clique sur « S'inscrire maintenant » depuis la page d'accueil et suis la procédure. Tu recevras une confirmation par e-mail.",
    },
    {
      id: 3,
      question: 'Puis-je proposer un talk ?',
      answer:
        'Oui. Soumets ta proposition via le formulaire « Call for Proposals » sur la page Speakers. Respecte les deadlines indiquées.',
    },
    {
      id: 4,
      question: 'Ressources pour animer un workshop ?',
      answer:
        "L'équipe fournit des templates et guides. Contacte l'organisation via le formulaire Speakers/Sponsors pour obtenir les ressources.",
    },
    {
      id: 5,
      question: "Qu'est-ce que DevFest Kivu ?",
      answer:
        'DevFest Kivu rassemble la communauté tech locale autour de conférences, ateliers et networking. Objectif : partager savoirs et opportunités.',
    },
    {
      id: 6,
      question: "Comment m'inscrire ?",
      answer:
        "Clique sur « S'inscrire maintenant » depuis la page d'accueil et suis la procédure. Tu recevras une confirmation par e-mail.",
    },
    {
      id: 7,
      question: 'Puis-je proposer un talk ?',
      answer:
        'Oui. Soumets ta proposition via le formulaire « Call for Proposals » sur la page Speakers. Respecte les deadlines indiquées.',
    },
    {
      id: 8,
      question: 'Ressources pour animer un workshop ?',
      answer:
        "L'équipe fournit des templates et guides. Contacte l'organisation via le formulaire Speakers/Sponsors pour obtenir les ressources.",
    },
  ];

  // Open only one card at a time
  toggle(id: number) {
    this.openId = this.openId === id ? null : id;
  }

  isOpen(id: number) {
    return this.openId === id;
  }

  // Article click handler: ignore clicks on interactive elements
  onArticleClick(event: MouseEvent, id: number) {
    const target = event.target as HTMLElement;
    if (this.isInteractiveElement(target)) return;
    this.toggle(id);
  }

  // Keyboard handler: Enter/Space on focused article should toggle
  onArticleKeydown(event: KeyboardEvent, id: number) {
    const code = event.key;
    if (code === 'Enter' || code === ' ') {
      event.preventDefault();
      this.toggle(id);
    }
  }

  private isInteractiveElement(el: HTMLElement | null): boolean {
    if (!el) return false;
    const interactive = ['button', 'a', 'input', 'textarea', 'select', 'label'];
    let node: HTMLElement | null = el;
    for (let depth = 0; depth < 6 && node; depth++) {
      if (interactive.includes(node.tagName.toLowerCase())) return true;
      node = node.parentElement;
    }
    return false;
  }

  // Filtered list (no UI for search/filter in this refactor) — keep it simple
  get filtered() {
    return this.qaItems;
  }
}
