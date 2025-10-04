import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type QaItem = {
  id: number;
  question: string;
  answer: string;
  category?: 'Logistique' | 'Inscription' | 'Speakers' | 'Technique' | 'Autre';
  tags?: string[];
  updatedAt?: string;
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
  openIds = new Set<number>();

  qaItems: QaItem[] = [
    {
      id: 1,
      question: "Qu'est-ce que DevFest Kivu ?",
      answer:
        'DevFest Kivu rassemble la communauté tech locale autour de conférences, ateliers et networking. Objectif : partager savoirs et opportunités.',
      category: 'Autre',
      tags: ['festival', 'communauté'],
      updatedAt: '2025-08-01',
    },
    {
      id: 2,
      question: "Comment m'inscrire ?",
      answer:
        "Clique sur « S'inscrire maintenant » depuis la page d'accueil et suis la procédure. Tu recevras une confirmation par e-mail.",
      category: 'Inscription',
      tags: ['ticket', 'paiement'],
      updatedAt: '2025-08-10',
    },
    {
      id: 3,
      question: 'Puis-je proposer un talk ?',
      answer:
        'Oui. Soumets ta proposition via le formulaire « Call for Proposals » sur la page Speakers. Respecte les deadlines indiquées.',
      category: 'Speakers',
      tags: ['cfp'],
      updatedAt: '2025-08-15',
    },
    {
      id: 4,
      question: 'Ressources pour animer un workshop ?',
      answer:
        "L'équipe fournit des templates et guides. Contacte l'organisation via le formulaire Speakers/Sponsors pour obtenir les ressources.",
      category: 'Technique',
      tags: ['workshop', 'guide'],
      updatedAt: '2025-08-20',
    },
  ];

  categories = ['Tout', 'Inscription', 'Speakers', 'Technique', 'Logistique', 'Autre'];

  toggle(id: number) {
    if (this.openIds.has(id)) this.openIds.delete(id);
    else this.openIds.add(id);
  }

  isOpen(id: number) {
    return this.openIds.has(id);
  }

  selectCategory(cat: string) {
    this.activeCategory = cat === 'Tout' ? '' : cat;
    this.openIds.clear();
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

  addPlaceholderQuestion() {
    const id = Math.max(0, ...this.qaItems.map((i) => i.id)) + 1;
    this.qaItems.unshift({
      id,
      question: `Question placeholder #${id}`,
      answer: `Réponse placeholder pour la question ${id}.`,
      category: 'Autre',
      updatedAt: new Date().toISOString().slice(0, 10),
    });
  }
}
