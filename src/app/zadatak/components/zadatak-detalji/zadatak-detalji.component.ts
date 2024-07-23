import { Component, Input } from '@angular/core';
import { Zadatak } from '../../interfaces';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ZadatakService } from '../../services/zadatak.service';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';

@Component({
  selector: 'zadatak-detalji',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './zadatak-detalji.component.html',
  styleUrl: './zadatak-detalji.component.css',
})
export class ZadatakDetaljiComponent {
  zadatak$: Observable<Zadatak>;
  constructor(
    private config: DynamicDialogConfig,
    private zadatakService: ZadatakService
  ) {
    this.zadatak$ = this.zadatakService.getZadatak(this.config.data.id);
  }

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
