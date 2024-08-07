import { Component, Input } from '@angular/core';
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
  ref: DynamicDialogRef | undefined;

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
  }
}
