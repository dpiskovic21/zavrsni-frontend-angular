import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { Column } from '../../../shared/interfaces';

@Component({
  selector: 'admin-tablica',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './admin-tablica.component.html',
  styleUrl: './admin-tablica.component.css',
})
export class AdminTablicaComponent {
  @Input() podaci!: unknown[];
  @Input() stupci!: Column[];
  @Output() obrisi = new EventEmitter<string>();

  podatakJeObjekt(podatak: unknown) {
    return typeof podatak === 'object';
  }
}
