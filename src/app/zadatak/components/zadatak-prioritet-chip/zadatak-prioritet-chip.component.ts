import { Component, Input } from '@angular/core';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';

@Component({
  selector: 'zadatak-prioritet-chip',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './zadatak-prioritet-chip.component.html',
  styleUrl: './zadatak-prioritet-chip.component.css',
})
export class ZadatakPrioritetChipComponent {
  @Input() prioritet!: string;

  getTagColor(prioritet: string): string {
    switch (prioritet) {
      case 'NIZAK':
        return 'green';
      case 'SREDNJI':
        return 'yellow';
      case 'VISOK':
        return 'orange';
      default:
        return 'red';
    }
  }
}
