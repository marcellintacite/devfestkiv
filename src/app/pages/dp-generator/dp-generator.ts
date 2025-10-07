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
  isDraggingOver = false; // Pour le style du drag & drop

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
      // On s'assure que c'est bien une image
      if (file.type.startsWith('image/')) {
        this.processFileWithPintura(file);
      }
    }
  }

  // --- Logique de gestion de fichier (refactorisée) ---
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

  // --- Autres méthodes ---
  suggestQuote() {
    this.quote = this.suggestedQuotes[this.quoteIndex];
    this.quoteIndex = (this.quoteIndex + 1) % this.suggestedQuotes.length;
  }

  private async captureElement(elementId: string, fileName: string) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`L'élément avec l'ID "${elementId}" n'a pas été trouvé.`);
      return;
    }

    await new Promise((res) => setTimeout(res, 120));

    const canvas = await html2canvas(element, { backgroundColor: null, scale: 2, useCORS: true });
    const imageData = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageData;
    link.download = `${fileName.replace(/\s+/g, '_')}.png`;
    link.click();
  }

  async captureProfileDP() {
    await this.captureElement('dp-capture-zone-profile', `${this.fullName || 'ma-photo'}-profil`);
  }

  async captureGeneratorDP() {
    await this.captureElement('dp-capture-zone-generator', `${this.fullName || 'mon-dp'}-devfest`);
  }
}
