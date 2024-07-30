import { Component, Input, OnInit } from '@angular/core';
import { KomentarDTO, Zadatak } from '../../interfaces';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { ZadatakService } from '../../services/zadatak.service';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { KomentarService } from '../../services/komentar.service';
import { AutorizacijaService } from '../../../autorizacija/services/autorizacija.service';

@Component({
  selector: 'zadatak-detalji',
  standalone: true,
  imports: [PrimengModule, FormsModule],
  templateUrl: './zadatak-detalji.component.html',
  styleUrl: './zadatak-detalji.component.css',
})
export class ZadatakDetaljiComponent implements OnInit {
  zadatak!: Zadatak;
  noviKomentar = '';

  constructor(
    private config: DynamicDialogConfig,
    private zadatakService: ZadatakService,
    private komentarService: KomentarService,
    private autorizacijaService: AutorizacijaService
  ) {}

  ngOnInit() {
    this.dohvatiZadatak();
  }

  dohvatiZadatak() {
    this.zadatakService
      .getZadatak(this.config.data.id)
      .subscribe((zadatak) => (this.zadatak = zadatak));
  }

  dodajKomentar() {
    if (this.noviKomentar == '') return;

    const komentarDTO: KomentarDTO = {
      sadrzaj: this.noviKomentar,
      korisnikId: this.autorizacijaService.prijavljeniKorisnik.id,
      zadatakId: this.zadatak.id,
    };

    this.komentarService.postKomenatar(komentarDTO).subscribe({
      next: () => {
        this.dohvatiZadatak();
        this.noviKomentar = '';
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTagColor(prioritet: string): string {
    switch (prioritet) {
      case 'NIZAK':
        return 'green';
      case 'SREDNJI':
        return 'yellow';
      case 'VISOK':
        return 'orange';
      default:
        return 'red';
    }
  }
}
