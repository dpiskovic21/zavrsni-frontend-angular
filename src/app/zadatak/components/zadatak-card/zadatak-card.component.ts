import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Zadatak } from '../../interfaces';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ZadatakDetaljiComponent } from '../zadatak-detalji/zadatak-detalji.component';

@Component({
  selector: 'zadatak-card',
  standalone: true,
  imports: [PrimengModule],
  providers: [DialogService],
  templateUrl: './zadatak-card.component.html',
  styleUrl: './zadatak-card.component.css',
})
export class ZadatakCardComponent {
  @Input() zadatak!: Zadatak;
  @Output() zadatakIzmjenjen = new EventEmitter<void>();
  ref: DynamicDialogRef | undefined;

  constructor(private dialog: DialogService) {}

  otvoriDetalje() {
    this.ref = this.dialog.open(ZadatakDetaljiComponent, {
      header: this.zadatak.naziv,
      data: this.zadatak,
    });

    this.ref.onClose.subscribe((r) => {
      if (r) {
        this.zadatakIzmjenjen.emit();
      }
    });
  }
}
