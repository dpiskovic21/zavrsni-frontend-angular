import { Component, EventEmitter, Output } from '@angular/core';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';

export enum Prikaz {
  AKTIVNI,
  MOJI,
  SVI,
  ZAVRŠENI,
}

export enum Soritranje {
  DATUM_IZRADE,
  ROK,
  PRIORITET,
}

@Component({
  selector: 'zadatak-filter',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './zadatak-filter.component.html',
  styleUrl: './zadatak-filter.component.css',
})
export class ZadatakFilterComponent {
  @Output() prikaz = new EventEmitter<string>();
  @Output() pretraga = new EventEmitter<string>();
  @Output() sortiranje = new EventEmitter<string>();

  prikazi: { ime: string }[] = [
    { ime: 'Aktivni' },
    { ime: 'Moji' },
    { ime: 'Svi' },
    { ime: 'Završeni' },
  ];

  sortiranja: { ime: string }[] = [
    { ime: 'Datum izrade' },
    { ime: 'Rok' },
    { ime: 'Prioritet' },
  ];
}
