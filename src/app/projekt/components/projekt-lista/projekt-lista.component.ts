import { Component } from '@angular/core';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { ProjektService } from '../../services/projekt.service';
import { ProjektCardComponent } from '../projekt-card/projekt-card.component';
import { Router } from '@angular/router';
import { ProjektRute } from '../../routes/projekt-rute';
import { AppRute } from '../../../routes/app-rute';

@Component({
  selector: 'projekt-lista',
  standalone: true,
  imports: [PrimengModule, ProjektCardComponent],
  templateUrl: './projekt-lista.component.html',
  styleUrl: './projekt-lista.component.css',
})
export class ProjektListaComponent {
  projekti$ = this.projektService.getProjekti();

  constructor(private projektService: ProjektService, private ruter: Router) {}

  navigirajNaIzraduProjekta() {
    this.ruter.navigateByUrl(`/${AppRute.Projekt}/${ProjektRute.Novi}`);
  }
}
