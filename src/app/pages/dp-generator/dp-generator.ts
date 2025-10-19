import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Profil } from './profil/profil';
import { Generator } from './generator/generator';
import html2canvas from 'html2canvas-pro';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dp-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, Profil, Generator, ImageCropperComponent],
  templateUrl: './dp-generator.html',
})
export default class DpGenerator implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
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

  profileTheme: 'yellow' | 'blue' | 'green' | 'red' = 'yellow';
  profileStyle: 'classic' | 'minimalist' = 'classic';

  suggestedQuotes = [
    'Le code est ma poésie.',
    "DevFest Kivu 2025, j'arrive !",
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

  setActiveTab(tab: 'profile' | 'dp') {
    this.activeTab = tab;
    this.uiState = this.previewImage ? 'templateVisible' : 'initial';
  }

  setProfileTheme(theme: 'yellow' | 'blue' | 'green' | 'red') {
    this.profileTheme = theme;
  }

  toggleProfileStyle() {
    this.profileStyle = this.profileStyle === 'classic' ? 'minimalist' : 'classic';
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
  if (!el) return console.error(`Élément ${elementId} introuvable`);

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
      width: clone.offsetWidth,
      height: clone.offsetHeight,
      scale: 2,
    });

    // ✅ Convertir le canvas en blob pour compatibilité mobile
    canvas.toBlob((blob) => {
      if (!blob) return console.error('Échec de la conversion du canvas en blob');

      const fileNameSafe = `${fileName.replace(/\s+/g, '_')}.png`;
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      // ✅ iOS ne gère pas link.click() → on ouvre une nouvelle fenêtre
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isIOS) {
        const newTab = window.open();
        if (newTab) {
          newTab.document.write('<title>Téléchargement...</title>');
          newTab.document.body.innerHTML = `<img src="${url}" style="width:100%;height:auto" />`;
        } else {
          alert("Impossible d'ouvrir le visuel. Désactivez le bloqueur de pop-ups et réessayez.");
        }
      } else {
        link.href = url;
        link.download = fileNameSafe;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setTimeout(() => URL.revokeObjectURL(url), 2000);
    }, 'image/png');
  } catch (e) {
    console.error('Erreur de capture', e);
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
