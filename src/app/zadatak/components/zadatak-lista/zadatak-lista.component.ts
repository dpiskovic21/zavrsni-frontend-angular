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
	mozeDodatiZadatak = false;
	ref: DynamicDialogRef | undefined;

	constructor(
		private projektService: ProjektService,
		private ruta: ActivatedRoute,
		private dialog: DialogService,
		private autorizacijaService: AutorizacijaService
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
			tap((projekt) => {
				this.mozeDodatiZadatak =
					projekt.voditelji.find(
						(voditelj) =>
							this.autorizacijaService.prijavljeniKorisnik?.id ==
							voditelj.korisnikId
					) != null;
			}),
			map((projekt) => projekt?.zadaci!),
			map((zadaci) =>
				zadaci.filter((zadatak) =>
					this.prikaz$.value === 'Aktivni'
						? zadatak.status === 'U_IZRADI'
						: this.prikaz$.value === 'Završeni'
						? zadatak.status === 'ZATVOREN'
						: this.prikaz$.value === 'Moji'
						? zadatak.izvrsiteljId ==
						  this.autorizacijaService.prijavljeniKorisnik?.id
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
						? new Date(a.rok).getTime() - new Date(b.rok).getTime()
						: this.sortiranje$.value === 'Prioritet'
						? this.dohvatiVrijednostPrioriteta(b) -
						  this.dohvatiVrijednostPrioriteta(a)
						: new Date(a.datumIzrade).getTime() -
						  new Date(b.datumIzrade).getTime()
				)
			),
			map((zadaci) =>
				zadaci.sort((a, b) => {
					return (
						this.dohvatiVrijednostZaStatus(a.status) -
						this.dohvatiVrijednostZaStatus(b.status)
					);
				})
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
		this.ref = this.dialog.open(ZadatakNoviComponent, {
			width: '75vw',
		});

		this.ref.onClose.subscribe((dodanNovi) => {
			if (dodanNovi) this.dohvatiProjekte$.next();
		});
	}

	dohvatiVrijednostZaStatus(status: string) {
		switch (status) {
			case 'U_IZRADI':
				return 1;
			case 'NA_PREGLEDU':
				return 2;
			default:
				return 3;
		}
	}
}
