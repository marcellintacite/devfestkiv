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

  // NOUVEL ÉTAT POUR L'UX
  uiState: 'initial' | 'imageVisible' | 'templateVisible' = 'initial';

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

  // Getter pour la validation du formulaire
  get isFormReadyForUpload(): boolean {
    if (this.activeTab === 'profile') {
      return !!this.fullName.trim();
    }
    // Pour le DP Generator, le nom ET la citation sont requis
    return !!this.fullName.trim() && !!this.quote.trim();
  }

  // Méthode pour changer d'onglet et réinitialiser l'état
  setActiveTab(tab: 'profile' | 'dp') {
    this.activeTab = tab;
    // On réinitialise l'animation si on change d'onglet
    if (!this.previewImage) {
      this.uiState = 'initial';
    } else {
      this.uiState = 'templateVisible';
    }
  }

  // --- Logique de Drag & Drop (avec validation) ---
  onDragOver(event: DragEvent) {
    if (!this.isFormReadyForUpload) return;
    event.preventDefault();
    this.isDraggingOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOver = false;
  }

  onDrop(event: DragEvent) {
    if (!this.isFormReadyForUpload) return;
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

  // --- Logique de gestion de fichier (avec validation) ---
  openFileInput() {
    if (!this.isFormReadyForUpload) return;
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

  // --- MISE À JOUR DE LA LOGIQUE D'ANIMATION ---
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
      reader.onload = () => {
        this.previewImage = reader.result;
        // ACTE III : On affiche SEULEMENT l'image
        this.uiState = 'imageVisible';

        // On attend un court instant pour que l'image s'affiche...
        setTimeout(() => {
          // ACTE IV : On déclenche l'animation du template
          this.uiState = 'templateVisible';
        }, 200); // 200ms, c'est parfait pour l'effet
      };
      reader.readAsDataURL(blob);
    });
  }

  suggestQuote() {
    this.quote = this.suggestedQuotes[this.quoteIndex];
    this.quoteIndex = (this.quoteIndex + 1) % this.suggestedQuotes.length;
  }

  private async captureElement(elementId: string, fileName: string) {
    const originalElement = document.getElementById(elementId);
    if (!originalElement) {
      console.error(`L'élément avec l'ID "${elementId}" n'a pas été trouvé.`);
      return;
    }
    const clone = originalElement.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.top = '0';
    clone.style.left = '-9999px';
    clone.style.zIndex = '-10';
    clone.style.transform = 'none';
    document.body.appendChild(clone);
    try {
      const canvas = await html2canvas(clone, {
        backgroundColor: null,
        useCORS: true,
        width: clone.offsetWidth,
        height: clone.offsetHeight,
        scale: 2,
      });
      const imageData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageData;
      link.download = `${fileName.replace(/\s+/g, '_')}.png`;
      link.click();
    } catch (error) {
      console.error("Erreur pendant la capture d'écran :", error);
    } finally {
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
