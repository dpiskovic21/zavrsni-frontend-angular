import { Component, OnInit } from '@angular/core';
import { ProjektService } from '../../../projekt/services/projekt.service';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { Projekt } from '../../../projekt/interfaces';
import { ActivatedRoute } from '@angular/router';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { ZadatakCardComponent } from '../zadatak-card/zadatak-card.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ZadatakNoviComponent } from '../zadatak-novi/zadatak-novi.component';
import {
  Prikaz,
  Soritranje,
  ZadatakFilterComponent,
} from '../zadatak-filter/zadatak-filter.component';
import { Zadatak } from '../../interfaces';
import { AutorizacijaService } from '../../../autorizacija/services/autorizacija.service';

@Component({
  selector: 'zadatak-lista',
  standalone: true,
  imports: [PrimengModule, ZadatakCardComponent, ZadatakFilterComponent],
  providers: [DialogService],
  templateUrl: './zadatak-lista.component.html',
  styleUrl: './zadatak-lista.component.css',
})
export class ZadatakListaComponent implements OnInit {
  zadaci$!: Observable<Zadatak[]>;
  dohvatiProjekte$!: Subject<void>;
  prikaz$!: BehaviorSubject<string>;
  sortiranje$!: BehaviorSubject<string>;
  pretraga$!: BehaviorSubject<string>;

  ref: DynamicDialogRef | undefined;

  constructor(
    private projektService: ProjektService,
    private ruta: ActivatedRoute,
    private dialog: DialogService,
    private autorizacijaServce: AutorizacijaService
  ) {}

  ngOnInit() {
    this.dohvatiProjekte$ = new Subject();
    this.prikaz$ = new BehaviorSubject('Aktivni');
    this.sortiranje$ = new BehaviorSubject('Datum izrade');
    this.pretraga$ = new BehaviorSubject('');

    this.zadaci$ = this.dohvatiProjekte$.pipe(
      startWith(null),
      switchMap(() =>
        this.projektService.getProjekt(+this.ruta.snapshot.paramMap.get('id')!)
      ),
      filter((projekt) => !!projekt),
      map((projekt) => projekt?.zadaci!),
      map((zadaci) =>
        zadaci.filter((zadatak) =>
          this.prikaz$.value === 'Aktivni'
            ? zadatak.datumZavrsetka == null
            : this.prikaz$.value === 'Završeni'
            ? zadatak.datumZavrsetka != null
            : this.prikaz$.value === 'Moji'
            ? zadatak.izvrsiteljId ==
              this.autorizacijaServce.prijavljeniKorisnik.id
            : true
        )
      ),
      map((zadaci) =>
        zadaci.filter((zadatak) =>
          zadatak.naziv
            .toLowerCase()
            .includes(this.pretraga$.value.toLowerCase())
        )
      ),
      map((zadaci) =>
        zadaci.sort((a, b) =>
          this.sortiranje$.value === 'Rok'
            ? new Date(a.rok).getMilliseconds() -
              new Date(b.rok).getMilliseconds()
            : this.sortiranje$.value === 'Prioritet'
            ? this.dohvatiVrijednostPrioriteta(a) -
              this.dohvatiVrijednostPrioriteta(b)
            : new Date(a.datumIzrade).getMilliseconds() -
              new Date(b.datumIzrade).getMilliseconds()
        )
      )
    );
  }

  dohvatiVrijednostPrioriteta(zadatak: Zadatak) {
    return zadatak.prioritet === 'NIZAK'
      ? 0
      : zadatak.prioritet === 'SREDNJI'
      ? 1
      : zadatak.prioritet === 'VISOK'
      ? 2
      : 3;
  }

  onPretragaChange($event: string) {
    this.pretraga$.next($event);
    this.dohvatiProjekte$.next();
  }
  onSortiranjeChange($event: string) {
    this.sortiranje$.next($event);
    this.dohvatiProjekte$.next();
  }
  onPrikazChange($event: string) {
    this.prikaz$.next($event);
    this.dohvatiProjekte$.next();
  }

  otvoriDialogZaIzraduZadatka() {
    this.ref = this.dialog.open(ZadatakNoviComponent, {});

    this.ref.onClose.subscribe((dodanNovi) => {
      if (dodanNovi) this.dohvatiProjekte$.next();
    });
  }
}
