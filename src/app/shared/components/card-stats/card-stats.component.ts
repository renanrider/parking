import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-stats',
  templateUrl: './card-stats.component.html',
  styleUrl: './card-stats.component.css',
})
export class CardStatsComponent {
  @Input() title = '';
  @Input() stats = '';
  @Input() icon = '';
  @Input() iconColor = '';
  @Input() backgroundColor = '#3b82f6';
}
