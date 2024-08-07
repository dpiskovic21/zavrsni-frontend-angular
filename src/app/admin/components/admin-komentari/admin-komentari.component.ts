import { Component } from '@angular/core';
import { Komentar } from '../../../zadatak/interfaces';
import { Column } from '../../../shared/interfaces';
import { KomentarService } from '../../../zadatak/services/komentar.service';
import { AdminTablicaComponent } from '../admin-tablica/admin-tablica.component';

@Component({
  selector: 'admin-komentari',
  standalone: true,
  imports: [AdminTablicaComponent],
  templateUrl: './admin-komentari.component.html',
  styleUrl: './admin-komentari.component.css',
})
export class AdminKomentariComponent {
  komentari: Komentar[] = [];
  stupci!: Column[];

  constructor(private komentarServis: KomentarService) {}

  ngOnInit() {
    this.dohvatiSveKomentare();
  }

  dohvatiSveKomentare() {
    this.komentarServis.getKomentari().subscribe((komentari) => {
      this.stupci = [];
      for (let key of Object.keys(komentari[0])) {
        this.stupci.push({ field: key, header: key.toLocaleUpperCase() });
      }
      this.komentari = komentari;
    });
  }

  obrisiKomentar(id: string) {
    this.komentarServis.deleteKomentar(id).subscribe(() => {
      this.dohvatiSveKomentare();
    });
  }
}
