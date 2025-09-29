import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './qa.html',
})
export default class QaComponent {
  search = '';
  activeCategory: string = '';

  openId: number | null = null;

  qaItems: QaItem[] = [
    {
      id: 1,
      question: "Qu'est-ce que DevFest Kivu ?",
      answer:
        'DevFest Kivu rassemble la communauté tech locale autour de conférences, ateliers et networking. Objectif : partager savoirs et opportunités.',
      category: 'Autre',
      tags: ['festival', 'communauté'],
    },
    {
      id: 2,
      question: "Comment m'inscrire ?",
      answer:
        "Clique sur « S'inscrire maintenant » depuis la page d'accueil et suis la procédure. Tu recevras une confirmation par e-mail.",
      category: 'Inscription',
      tags: ['ticket', 'paiement'],
    },
    {
      id: 3,
      question: 'Puis-je proposer un talk ?',
      answer:
        'Oui. Soumets ta proposition via le formulaire « Call for Proposals » sur la page Speakers. Respecte les deadlines indiquées.',
      category: 'Speakers',
      tags: ['cfp'],
    },
    {
      id: 4,
      question: 'Ressources pour animer un workshop ?',
      answer:
        "L'équipe fournit des templates et guides. Contacte l'organisation via le formulaire Speakers/Sponsors pour obtenir les ressources.",
      category: 'Technique',
      tags: ['workshop', 'guide'],
    },
  ];

  categories = ['Tout', 'Inscription', 'Speakers', 'Technique', 'Logistique', 'Autre'];

  // toggler unique : ouvre la card et ferme les autres (si déjà ouvert, ferme)
  toggle(id: number) {
    this.openId = this.openId === id ? null : id;
  }

  isOpen(id: number) {
    return this.openId === id;
  }

  selectCategory(cat: string) {
    this.activeCategory = cat === 'Tout' ? '' : cat;
    this.openId = null; // fermer tout quand on change le filtre
  }

  // article click handler: ignore clicks on interactive elements
  onArticleClick(event: MouseEvent, id: number) {
    const target = event.target as HTMLElement;
    // ignore if user clicked a link, button, input, or other interactive control
    if (this.isInteractiveElement(target)) return;
    this.toggle(id);
  }

  // keyboard handler: Enter/Space on focused article should toggle
  onArticleKeydown(event: KeyboardEvent, id: number) {
    const code = event.key;
    if (code === 'Enter' || code === ' ') {
      event.preventDefault();
      this.toggle(id);
    }
  }

  private isInteractiveElement(el: HTMLElement | null): boolean {
    if (!el) return false;
    const tag = el.tagName.toLowerCase();
    if (['button', 'a', 'input', 'textarea', 'select', 'label'].includes(tag)) return true;
    // if clicked inside an interactive child (icon svg inside a button), walk up
    let node: HTMLElement | null = el;
    for (let depth = 0; depth < 6 && node; depth++) {
      if (
        ['button', 'a', 'input', 'textarea', 'select', 'label'].includes(node.tagName.toLowerCase())
      )
        return true;
      node = node.parentElement;
    }
    return false;
  }

  get filtered() {
    const q = this.search.trim().toLowerCase();
    return this.qaItems.filter((item) => {
      const matchesCategory = this.activeCategory ? item.category === this.activeCategory : true;
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        (item.answer && item.answer.toLowerCase().includes(q)) ||
        (item.tags && item.tags.join(' ').toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }
}
