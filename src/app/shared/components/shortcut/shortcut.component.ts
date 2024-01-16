import { ColorService } from './../../services/color.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss'],
})
export class ShortcutComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() icon = '';
  @Input() iconColor = '';
  @Input() link = '';
  @Input() backgroundColor = '#3b82f6';

  constructor(public colorService: ColorService) {}
}
