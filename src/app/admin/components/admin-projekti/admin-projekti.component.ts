import { Component } from '@angular/core';
import { Projekt } from '../../../projekt/interfaces';
import { Column } from '../../../shared/interfaces';
import { ProjektService } from '../../../projekt/services/projekt.service';
import { AdminTablicaComponent } from '../admin-tablica/admin-tablica.component';

@Component({
  selector: 'admin-projekti',
  standalone: true,
  imports: [AdminTablicaComponent],
  templateUrl: './admin-projekti.component.html',
  styleUrl: './admin-projekti.component.css',
})
export class AdminProjektiComponent {
  projekti: Projekt[] = [];
  stupci!: Column[];

  constructor(private projektServis: ProjektService) {}

  ngOnInit() {
    this.dohvatiSveProjekte();
  }

  dohvatiSveProjekte() {
    this.projektServis.getProjekti().subscribe((projekti) => {
      this.stupci = [];
      for (let key of Object.keys(projekti[0])) {
        this.stupci.push({ field: key, header: key.toLocaleUpperCase() });
      }
      this.projekti = projekti;
    });
  }

  obrisiProjekt(id: string) {
    this.projektServis.deleteProjekt(id).subscribe(() => {
      this.dohvatiSveProjekte();
    });
  }
}
