import { Component } from '@angular/core';
import { Korisnik } from '../../../korisnik/interfaces';
import { KorisnikService } from '../../../korisnik/services/korisnik.service';
import { Column } from '../../../shared/interfaces';
import { AdminTablicaComponent } from '../admin-tablica/admin-tablica.component';

@Component({
  selector: 'admin-korisnici',
  standalone: true,
  imports: [AdminTablicaComponent],
  templateUrl: './admin-korisnici.component.html',
  styleUrl: './admin-korisnici.component.css',
})
export class AdminKorisniciComponent {
  korisnici: Korisnik[] = [];
  stupci!: Column[];

  constructor(private korisnikServis: KorisnikService) {}

  ngOnInit() {
    this.dohvatiSveKorisnike();
  }

  dohvatiSveKorisnike() {
    this.korisnikServis.getKorisnici().subscribe((korisnici) => {
      this.stupci = [];
      for (let key of Object.keys(korisnici[0])) {
        this.stupci.push({ field: key, header: key.toLocaleUpperCase() });
      }
      this.korisnici = korisnici;
    });
  }

  obrisiKorisnika(id: string) {
    this.korisnikServis.deleteKorisnik(id).subscribe(() => {
      this.dohvatiSveKorisnike();
    });
  }
}
