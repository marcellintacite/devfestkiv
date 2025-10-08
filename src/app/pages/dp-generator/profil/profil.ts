import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil.html',
})
export class Profil {
  @Input() fullName: string = '';
  @Input() previewImage: string | ArrayBuffer | null = null;
  @Input() uiState: 'initial' | 'imageVisible' | 'templateVisible' = 'initial';
}
