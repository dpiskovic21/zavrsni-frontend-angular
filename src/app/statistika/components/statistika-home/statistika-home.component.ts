import { Component, OnInit } from '@angular/core';
import { Projekt } from '../../../projekt/interfaces';
import { ProjektService } from '../../../projekt/services/projekt.service';
import { AutorizacijaService } from '../../../autorizacija/services/autorizacija.service';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { StatistikaGrafoviComponent } from '../statistika-grafovi/statistika-grafovi.component';
import { StatistikaProjekta } from '../../interfaces';

interface GrafPodaci {
	labels: string[];
	datasets: [{ data: number[]; backgroundColor: string[] }];
}

@Component({
	selector: 'app-statistika-home',
	standalone: true,
	imports: [PrimengModule, FormsModule, StatistikaGrafoviComponent],
	templateUrl: './statistika-home.component.html',
	styleUrl: './statistika-home.component.css',
})
export class StatistikaHomeComponent implements OnInit {
	projekti!: Partial<Projekt>[];
	odabraniProjekt: Projekt | null = null;
	statistikaZaProjekte!: GrafPodaci;

	constructor(
		private projektService: ProjektService,
		private autorizacijaService: AutorizacijaService
	) {}

	ngOnInit(): void {
		this.projektService.getProjektiStatistika().subscribe((r) => {
			this.statistikaZaProjekte = {
				labels: [],
				datasets: [{ data: [], backgroundColor: [] }],
			};
			for (const oznaka in r) {
				this.statistikaZaProjekte.labels.push(oznaka);
				this.statistikaZaProjekte.datasets[0].data.push(
					r[oznaka as keyof StatistikaProjekta]
				);
				this.statistikaZaProjekte.datasets[0].backgroundColor.push(
					this.getNasumicnaBoja()
				);
			}
		});
		this.projektService.getProjekti().subscribe((projekti) => {
			if (this.autorizacijaService.prijavljeniKorisnik?.admin) {
				this.projekti = projekti;
				this.projekti.unshift({ naziv: 'Svi projekti', id: -1 });
			} else
				this.projekti = projekti.filter(
					(projekt) =>
						projekt.voditelji.find(
							(voditelj: { korisnikId: number }) =>
								voditelj.korisnikId ==
								this.autorizacijaService.prijavljeniKorisnik?.id!
						) != null
				);
		});
	}
	getNasumicnaBoja() {
		var color = Math.floor(0x1000000 * Math.random()).toString(16);
		return '#' + color;
	}
}
