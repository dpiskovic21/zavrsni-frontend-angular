import { Component } from '@angular/core';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { ProjektService } from '../../services/projekt.service';
import { ProjektCardComponent } from '../projekt-card/projekt-card.component';

@Component({
  selector: 'projekt-lista',
  standalone: true,
  imports: [PrimengModule, ProjektCardComponent],
  templateUrl: './projekt-lista.component.html',
  styleUrl: './projekt-lista.component.css',
})
export class ProjektListaComponent {
  projekti$ = this.projektService.getProjekti();

  constructor(private projektService: ProjektService) {}
}
