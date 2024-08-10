import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { Projekt } from '../../interfaces';
import { Router } from '@angular/router';
import { AppRute } from '../../../routes/app-rute';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProjektIzmjenaComponent } from '../projekt-izmjena/projekt-izmjena.component';

@Component({
  selector: 'projekt-card',
  standalone: true,
  imports: [PrimengModule],
  providers: [DialogService],
  templateUrl: './projekt-card.component.html',
  styleUrl: './projekt-card.component.css',
})
export class ProjektCardComponent {
  @Input() projekt!: Projekt;
  @Output() projektIzmjenjen = new EventEmitter<void>();
  ref: DynamicDialogRef | undefined;
  projekts: any;

  constructor(private ruter: Router, private dialog: DialogService) {}

  preusmjeriNaZadatke() {
    this.ruter.navigateByUrl(`${AppRute.Projekt}/${this.projekt.id}`);
  }

  otovriDialogZaDetalje() {
    this.ref = this.dialog.open(ProjektIzmjenaComponent, {
      header: 'Detalji projekta',
      width: '70%',
      height: '70%',
      data: this.projekt.id,
    });

    this.ref.onClose.subscribe((r) => {
      if (r) {
        this.projektIzmjenjen.emit();
      }
    });
  }

  getProjektStatusTagPozadina(
    status: string
  ): { [klass: string]: any } | null | undefined {
    switch (status) {
      case 'U_TIJEKU':
        return { background: 'green' };
      case 'ZAVRSEN':
        return { background: 'orange' };
      case 'OTKAZAN':
        return { background: 'red' };
      default:
        return { background: 'gray' };
    }
  }
  getProjektSatusVrijednostZaPrikaz(status: string) {
    switch (status) {
      case 'U_TIJEKU':
        return 'U tijeku';
      case 'ZAVRSEN':
        return 'Završen';
      case 'OTKAZAN':
        return 'Otkazan';
      default:
        return 'Nepoznat';
    }
  }
}
