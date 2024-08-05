import { Component, Input } from '@angular/core';
import { Projekt } from '../../../projekt/interfaces';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { ProjektService } from '../../../projekt/services/projekt.service';

interface GrafPodaci {
  labels: string[];
  datasets: [{ data: number[]; backgroundColor: string[] }];
}

@Component({
  selector: 'statistika-grafovi',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './statistika-grafovi.component.html',
  styleUrl: './statistika-grafovi.component.css',
})
export class StatistikaGrafoviComponent {
  brojZadatakaPoKorisniku!: GrafPodaci;
  zakasnjeliRokovi!: GrafPodaci;

  constructor(private projektServis: ProjektService) {}

  @Input() set odabraniProjekt(projekt: Projekt | null) {
    if (projekt == null) return;

    this.projektServis
      .getProjektStatistika(projekt.id)
      .subscribe((statistika) => {
        this.postaviPodatkeZaBrojZadatakaPoKorisniku(
          statistika.korisniciSaBrojemZadataka
        );
        this.postaviPodatkeZaZakasnjeljeRokove(statistika.zakasnjeliRokovi);
      });
  }

  postaviPodatkeZaBrojZadatakaPoKorisniku(korisniciSaBrojemZadataka: {
    [idKorisnika: string]: { naziv: string; brojZadataka: number };
  }) {
    this.brojZadatakaPoKorisniku = {
      labels: [],
      datasets: [{ data: [], backgroundColor: [] }],
    };
    for (const id in korisniciSaBrojemZadataka) {
      this.brojZadatakaPoKorisniku.labels.push(
        korisniciSaBrojemZadataka[id].naziv
      );
      this.brojZadatakaPoKorisniku.datasets[0].data.push(
        korisniciSaBrojemZadataka[id].brojZadataka
      );
      this.brojZadatakaPoKorisniku.datasets[0].backgroundColor.push(
        this.getNasumicnaBoja()
      );
    }
  }

  postaviPodatkeZaZakasnjeljeRokove(zakasnjeliRokovi: {
    [idKorisnika: string]: { naziv: string; brojZadataka: number };
  }) {
    this.zakasnjeliRokovi = {
      labels: [],
      datasets: [{ data: [], backgroundColor: [] }],
    };

    for (const id in zakasnjeliRokovi) {
      this.zakasnjeliRokovi.labels.push(zakasnjeliRokovi[id].naziv);
      this.zakasnjeliRokovi.datasets[0].data.push(
        zakasnjeliRokovi[id].brojZadataka
      );
      this.zakasnjeliRokovi.datasets[0].backgroundColor.push(
        this.getNasumicnaBoja()
      );
    }
  }

  getNasumicnaBoja() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + color;
  }
}
