import { Component, Input } from '@angular/core';
import { Zadatak } from '../../interfaces';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';

@Component({
  selector: 'zadatak-card',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './zadatak-card.component.html',
  styleUrl: './zadatak-card.component.css',
})
export class ZadatakCardComponent {
  @Input() zadatak!: Zadatak;
}
