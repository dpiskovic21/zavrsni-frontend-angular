import { Component, OnInit } from '@angular/core';
import { ProjektService } from '../../../projekt/services/projekt.service';
import { Observable, tap } from 'rxjs';
import { Projekt } from '../../../projekt/interfaces';
import { ActivatedRoute } from '@angular/router';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { ZadatakCardComponent } from '../zadatak-card/zadatak-card.component';

@Component({
  selector: 'zadatak-lista',
  standalone: true,
  imports: [PrimengModule, ZadatakCardComponent],
  templateUrl: './zadatak-lista.component.html',
  styleUrl: './zadatak-lista.component.css',
})
export class ZadatakListaComponent implements OnInit {
  projekt$!: Observable<Projekt>;

  constructor(
    private projektService: ProjektService,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit() {
    this.projekt$ = this.projektService.getProjekt(
      +this.ruta.snapshot.paramMap.get('id')!
    );
  }
}
