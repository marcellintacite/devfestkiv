import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Profil } from './profil/profil';
import { Generator } from './generator/generator';
import html2canvas from 'html2canvas-pro';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { ChangeDetectorRef } from '@angular/core';
import { EventConfigService } from '../../config/event-config.service';

@Component({
  selector: 'app-dp-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, Profil, Generator, ImageCropperComponent],
  templateUrl: './dp-generator.html',
})
export default class DpGenerator implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  eventConfig = inject(EventConfigService);

  activeTab: 'profile' | 'dp' = 'profile';
  uiState: 'initial' | 'imageVisible' | 'templateVisible' = 'initial';

  fullName = '';
  quote = '';
  previewImage: string | ArrayBuffer | null = null;
  isDraggingOver = false;

  // === Recadrage ===
  showCropper = false;
  imageBase64: string | undefined = undefined;
  tempCroppedImage: string | null = null;

  // Thèmes pour Photo de Profil
  profileTheme: 'yellow' | 'blue' | 'green' | 'red' = 'yellow';
  profileStyle: 'classic' | 'minimalist' = 'classic';

  // NOUVEAU : Thèmes pour le Générateur de DP
  generatorTheme: 'default' | 'white' = 'default';

  suggestedQuotes = [
    'Coder est ma passion.',
    `${this.eventConfig.fullName}, j'arrive !`,
    'Prêt à networker et innover.',
    'Talk is cheap. Show me the code.',
    'Building the future, one line at a time.',
  ];
  private quoteIndex = 0;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  get isFormReadyForUpload(): boolean {
    if (this.activeTab === 'profile') return !!this.fullName.trim();
    return !!this.fullName.trim() && !!this.quote.trim();
  }

  // MODIFIÉ : Pour relancer les animations
  setActiveTab(tab: 'profile' | 'dp') {
    this.activeTab = tab;
    // Si une image est déjà chargée, on force le reset de l'animation
    if (this.previewImage) {
      this.uiState = 'imageVisible';
      setTimeout(() => {
        this.uiState = 'templateVisible';
      }, 10); // Un court délai suffit pour que le changement soit détecté
    } else {
      this.uiState = 'initial';
    }
  }

  setProfileTheme(theme: 'yellow' | 'blue' | 'green' | 'red') {
    this.profileTheme = theme;
  }

  toggleProfileStyle() {
    this.profileStyle = this.profileStyle === 'classic' ? 'minimalist' : 'classic';
  }

  // NOUVEAU : Fonction pour changer le thème du générateur
  setGeneratorTheme(theme: 'default' | 'white') {
    this.generatorTheme = theme;
  }

  // === Drag & Drop ===
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
    const file = event.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.openCropper(file);
    }
  }

  // === Fichier manuel ===
  openFileInput() {
    if (!this.isFormReadyForUpload) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) this.openCropper(file);
    };
    input.click();
  }

  // === Cropper ===
  openCropper(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = reader.result as string;
      this.showCropper = true;
      this.tempCroppedImage = null;
    };
    reader.readAsDataURL(file);
  }

  onImageCropped(event: ImageCroppedEvent) {
    this.tempCroppedImage = event.base64 ?? null;
    this.cdr.detectChanges();
  }

  confirmCrop() {
    if (this.tempCroppedImage) {
      this.previewImage = this.tempCroppedImage;
      this.uiState = 'imageVisible';
      setTimeout(() => {
        this.uiState = 'templateVisible';
      }, 100);
    }

    this.showCropper = false;
    this.tempCroppedImage = null;
  }

  imageCropperCancelled() {
    this.showCropper = false;
    this.tempCroppedImage = null;
  }

  suggestQuote() {
    this.quote = this.suggestedQuotes[this.quoteIndex];
    this.quoteIndex = (this.quoteIndex + 1) % this.suggestedQuotes.length;
  }

private async captureElement(elementId: string, fileName: string) {
  const el = document.getElementById(elementId);
  if (!el) {
    console.error(`Élément ${elementId} introuvable`);
    return;
  }

  // Clone pour éviter problèmes de style / state pendant la capture
  const clone = el.cloneNode(true) as HTMLElement;
  clone.style.position = 'absolute';
  clone.style.top = '0';
  clone.style.left = '-9999px';
  clone.style.zIndex = '-10';
  document.body.appendChild(clone);

  try {
    const canvas = await html2canvas(clone, {
      backgroundColor: null,
      useCORS: true,
      width: clone.offsetWidth || undefined,
      height: clone.offsetHeight || undefined,
      scale: 2,
    });

    canvas.toBlob((blob) => {
      if (!blob) {
        console.error('Échec de la conversion du canvas en blob');
        document.body.removeChild(clone);
        return;
      }

      const safeName = `${fileName.replace(/\s+/g, '_')}.png`;
      const url = URL.createObjectURL(blob);

      // Création d'un <a> pour le téléchargement
      const a = document.createElement('a');
      a.href = url;
      a.download = safeName;
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);

      try {
        a.click();
      } catch (err) {
        // si click() est bloqué, on tente la fallback d'ouverture dans un nouvel onglet
        const opened = window.open(url, '_blank', 'noopener noreferrer');
        if (!opened) {
          alert('Impossible de lancer le téléchargement automatiquement. Désactivez le bloqueur de pop-ups et essayez à nouveau.');
        }
      } finally {
        setTimeout(() => {
          try {
            document.body.removeChild(a);
          } catch (e) {}
          URL.revokeObjectURL(url);
        }, 1500);
      }
    }, 'image/png');
  } catch (e) {
    console.error('Erreur lors de html2canvas/capture:', e);
    alert('Une erreur est survenue lors de l’exportation. Vérifiez la console pour plus d’infos.');
  } finally {
    if (clone.parentNode) document.body.removeChild(clone);
  }
}


  // NOUVEAU : Fonction pour scroller
  private scrollToPreview() {
    const elementId =
      this.activeTab === 'profile' ? 'dp-capture-zone-profile' : 'dp-capture-zone-generator';
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  async captureProfileDP() {
    await this.captureElement('dp-capture-zone-profile', `${this.fullName || 'ma-photo'}-profil`);
    this.scrollToPreview(); // On ajoute le scroll ici
  }

  async captureGeneratorDP() {
    await this.captureElement('dp-capture-zone-generator', `${this.fullName || 'mon-dp'}-devfest`);
    this.scrollToPreview(); // Et ici aussi
  }
}
