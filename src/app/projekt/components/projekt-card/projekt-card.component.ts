import { Component, Input } from '@angular/core';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { Projekt } from '../../interfaces';

@Component({
  selector: 'projekt-card',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './projekt-card.component.html',
  styleUrl: './projekt-card.component.css',
})
export class ProjektCardComponent {
  @Input() projekt!: Projekt;
}
