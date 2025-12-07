import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@my-ds/button';

@Component({
  selector: 'lib-card',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {}
