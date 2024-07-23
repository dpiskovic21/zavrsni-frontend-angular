import { Component, OnInit } from '@angular/core';
import { ProjektService } from '../../../projekt/services/projekt.service';
import { Observable, startWith, Subject, switchMap, tap } from 'rxjs';
import { Projekt } from '../../../projekt/interfaces';
import { ActivatedRoute } from '@angular/router';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { ZadatakCardComponent } from '../zadatak-card/zadatak-card.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ZadatakNoviComponent } from '../zadatak-novi/zadatak-novi.component';

@Component({
  selector: 'zadatak-lista',
  standalone: true,
  imports: [PrimengModule, ZadatakCardComponent],
  providers: [DialogService],
  templateUrl: './zadatak-lista.component.html',
  styleUrl: './zadatak-lista.component.css',
})
export class ZadatakListaComponent implements OnInit {
  projekt$!: Observable<Projekt>;
  dohvatiProjekte$!: Subject<void>;
  ref: DynamicDialogRef | undefined;

  constructor(
    private projektService: ProjektService,
    private ruta: ActivatedRoute,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.dohvatiProjekte$ = new Subject();
    this.projekt$ = this.dohvatiProjekte$.pipe(
      startWith(null),
      switchMap(() =>
        this.projektService.getProjekt(+this.ruta.snapshot.paramMap.get('id')!)
      )
    );
  }

  otvoriDialogZaIzraduZadatka() {
    this.ref = this.dialog.open(ZadatakNoviComponent, {});

    this.ref.onClose.subscribe((dodanNovi) => {
      if (dodanNovi) this.dohvatiProjekte$.next();
    });
  }
}
