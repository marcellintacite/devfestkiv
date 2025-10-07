import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { openDefaultEditor } from '@pqina/pintura';
import html2canvas from 'html2canvas-pro';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.html',
  styleUrls: ['./profil.css']
})
export class Profil {
  fullName = '';
  previewImage: string | ArrayBuffer | null = null;

  openPinturaEditor() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

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
    };

    input.click();
  }

  async captureDP() {
    const element = document.getElementById('dp-capture-zone');
    if (!element) return;

    await new Promise(res => setTimeout(res, 120));

    const canvas = await html2canvas(element, { backgroundColor: null, scale: 2, useCORS: true });
    const imageData = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageData;
    link.download = `${(this.fullName || 'ma-photo').replace(/\s+/g, '_')}.png`;
    link.click();
  }
}
