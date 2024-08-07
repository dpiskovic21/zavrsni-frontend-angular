import { Component, Input, OnInit } from '@angular/core';
import { KorisnikService } from '../../../korisnik/services/korisnik.service';
import { KorisnikNaziv } from '../../../korisnik/interfaces';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Projekt } from '../../interfaces';
import { ProjektService } from '../../services/projekt.service';

@Component({
  selector: 'app-projekt-izmjena',
  standalone: true,
  imports: [PrimengModule, FormsModule],
  templateUrl: './projekt-izmjena.component.html',
  styleUrl: './projekt-izmjena.component.css',
})
export class ProjektIzmjenaComponent implements OnInit {
  korisnici!: KorisnikNaziv[];
  projekt!: Projekt;
  voditelji: number[] = [];
  moguciStatusi = [
    { label: 'U tijeku', value: 'U_TIJEKU' },
    { label: 'Završen', value: 'ZAVRSEN' },
    { label: 'Otkazan', value: 'OTKAZAN' },
  ];
  constructor(
    private korisniciService: KorisnikService,
    private projektService: ProjektService,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.korisniciService.getKorisnici().subscribe((korisnici) => {
      this.korisnici = korisnici.map((korisnik) => ({
        naziv: korisnik.ime + ' ' + korisnik.prezime,
        ...korisnik,
      }));
    });
    this.projektService.getProjekt(this.config.data).subscribe((projekt) => {
      this.projekt = projekt;
      this.voditelji = projekt.voditelji.map((voditelj) => voditelj.korisnikId);
    });
  }

  spremiIzmjene() {
    this.projektService
      .updateProjekt(this.projekt.id, {
        status: this.projekt.status,
        naziv: this.projekt.naziv,
        voditelji: this.voditelji,
      })
      .subscribe({
        next: (r) => {
          console.log(r);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
