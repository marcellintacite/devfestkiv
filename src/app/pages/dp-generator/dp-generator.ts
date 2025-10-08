import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Profil } from './profil/profil';
import { Generator } from './generator/generator';
import { openDefaultEditor } from '@pqina/pintura';
import html2canvas from 'html2canvas-pro';

@Component({
  selector: 'app-dp-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, Profil, Generator],
  templateUrl: './dp-generator.html',
})
export default class DpGenerator {
  activeTab: 'profile' | 'dp' = 'profile';

  // État partagé
  fullName = '';
  quote = '';
  previewImage: string | ArrayBuffer | null = null;
  isDraggingOver = false;

  suggestedQuotes = [
    'Le code est ma poésie.',
    "DevFest Kivu 2025, j'arrive !",
    'Prêt à networker et innover.',
    'Talk is cheap. Show me the code.',
    'Building the future, one line at a time.',
  ];
  private quoteIndex = 0;

  // --- Logique de Drag & Drop ---
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        this.processFileWithPintura(file);
      }
    }
  }

  openFileInput() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        this.processFileWithPintura(file);
      }
    };
    input.click();
  }

  private processFileWithPintura(file: File) {
    const editor: any = openDefaultEditor({
      src: file,
      imageCropAspectRatio: 1,
      locale: {
        labelButtonExport: 'Confirmer',
        labelButtonCancel: 'Annuler',
      },
    });

    editor.on('process', (imageState: any) => {
      const blob: Blob | undefined = imageState?.dest;
      if (!blob) return;

      const reader = new FileReader();
      reader.onload = () => (this.previewImage = reader.result);
      reader.readAsDataURL(blob);
    });
  }

  suggestQuote() {
    this.quote = this.suggestedQuotes[this.quoteIndex];
    this.quoteIndex = (this.quoteIndex + 1) % this.suggestedQuotes.length;
  }

  // --- NOUVELLE LOGIQUE DE CAPTURE ---
  private async captureElement(elementId: string, fileName: string) {
    const originalElement = document.getElementById(elementId);
    if (!originalElement) {
      console.error(`L'élément avec l'ID "${elementId}" n'a pas été trouvé.`);
      return;
    }

    // 1. Cloner l'élément
    const clone = originalElement.cloneNode(true) as HTMLElement;

    // 2. Appliquer les styles pour le rendre invisible mais capturable à 100%
    clone.style.position = 'absolute';
    clone.style.top = '0';
    clone.style.left = '-9999px'; // On le cache hors de l'écran
    clone.style.zIndex = '-10';
    clone.style.transform = 'none'; // TRÈS IMPORTANT : On annule le scale

    // 3. Ajouter le clone au body pour qu'il soit dans le DOM
    document.body.appendChild(clone);

    try {
      // 4. Lancer html2canvas sur le CLONE
      const canvas = await html2canvas(clone, {
        backgroundColor: null,
        useCORS: true,
        // On peut forcer la taille pour être sûr, même si ce n'est plus forcément nécessaire
        width: clone.offsetWidth,
        height: clone.offsetHeight,
        scale: 2, // On peut même augmenter la résolution pour une qualité encore meilleure
      });
      const imageData = canvas.toDataURL('image/png');

      // Le reste de la logique de téléchargement
      const link = document.createElement('a');
      link.href = imageData;
      link.download = `${fileName.replace(/\s+/g, '_')}.png`;
      link.click();
    } catch (error) {
      console.error("Erreur pendant la capture d'écran :", error);
    } finally {
      // 5. TRÈS IMPORTANT : Toujours supprimer le clone après l'opération
      document.body.removeChild(clone);
    }
  }

  async captureProfileDP() {
    await this.captureElement('dp-capture-zone-profile', `${this.fullName || 'ma-photo'}-profil`);
  }

  async captureGeneratorDP() {
    await this.captureElement('dp-capture-zone-generator', `${this.fullName || 'mon-dp'}-devfest`);
  }
}
