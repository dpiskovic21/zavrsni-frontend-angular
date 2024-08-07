import { Component } from '@angular/core';
import { Zadatak } from '../../../zadatak/interfaces';
import { Column } from '../../../shared/interfaces';
import { ZadatakService } from '../../../zadatak/services/zadatak.service';
import { AdminTablicaComponent } from '../admin-tablica/admin-tablica.component';

@Component({
  selector: 'admin-zadatci',
  standalone: true,
  imports: [AdminTablicaComponent],
  templateUrl: './admin-zadatci.component.html',
  styleUrl: './admin-zadatci.component.css',
})
export class AdminZadatciComponent {
  zadatci: Zadatak[] = [];
  stupci!: Column[];

  constructor(private zadatakServis: ZadatakService) {}

  ngOnInit() {
    this.dohvatiSveZadatke();
  }

  dohvatiSveZadatke() {
    this.zadatakServis.getZadatci().subscribe((zadatci) => {
      this.stupci = [];
      for (let key of Object.keys(zadatci[0])) {
        this.stupci.push({ field: key, header: key.toLocaleUpperCase() });
      }
      this.zadatci = zadatci;
    });
  }

  obrisiZadatak(id: string) {
    this.zadatakServis.deleteZadatak(id).subscribe(() => {
      this.dohvatiSveZadatke();
    });
  }
}
