import { Component, OnInit } from '@angular/core';
import { Projekt } from '../../../projekt/interfaces';
import { ProjektService } from '../../../projekt/services/projekt.service';
import { AutorizacijaService } from '../../../autorizacija/services/autorizacija.service';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { StatistikaGrafoviComponent } from '../statistika-grafovi/statistika-grafovi.component';

@Component({
  selector: 'app-statistika-home',
  standalone: true,
  imports: [PrimengModule, FormsModule, StatistikaGrafoviComponent],
  templateUrl: './statistika-home.component.html',
  styleUrl: './statistika-home.component.css',
})
export class StatistikaHomeComponent implements OnInit {
  projekti!: Projekt[];
  odabraniProjekt: Projekt | null = null;

  constructor(
    private projektService: ProjektService,
    private autorizacijaService: AutorizacijaService
  ) {}

  ngOnInit(): void {
    this.projektService.getProjekti().subscribe((projekti) => {
      if (this.autorizacijaService.prijavljeniKorisnik?.admin) {
        this.projekti = projekti;
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
}
