import { Component, Input } from '@angular/core';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { Projekt } from '../../interfaces';
import { Router } from '@angular/router';
import { AppRute } from '../../../routes/app-rute';

@Component({
  selector: 'projekt-card',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './projekt-card.component.html',
  styleUrl: './projekt-card.component.css',
})
export class ProjektCardComponent {
  @Input() projekt!: Projekt;

  constructor(private ruter: Router) {}

  preusmjeriNaZadatke() {
    this.ruter.navigateByUrl(`${AppRute.Projekt}/${this.projekt.id}`);
  }
}
