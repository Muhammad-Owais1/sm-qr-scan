import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-review',
  // imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
  imports: [CommonModule],
})
export class ReviewComponent {
  stars = Array(5).fill(0);
  rating = 0;
  hovered = 0;

  setRating(value: number) {
    this.rating = value;
  }

  hoverRating(value: number) {
    this.hovered = value;
  }
}
