import { Component, Input, OnInit } from '@angular/core';
import { KomentarDTO, UpdateZadatakDTO, Zadatak } from '../../interfaces';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ZadatakService } from '../../services/zadatak.service';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { KomentarService } from '../../services/komentar.service';
import { AutorizacijaService } from '../../../autorizacija/services/autorizacija.service';
import { PrivitakListaComponent } from '../../../privitak/components/privitak-lista/privitak-lista.component';

@Component({
  selector: 'zadatak-detalji',
  standalone: true,
  imports: [PrimengModule, FormsModule, PrivitakListaComponent],
  templateUrl: './zadatak-detalji.component.html',
  styleUrl: './zadatak-detalji.component.css',
})
export class ZadatakDetaljiComponent implements OnInit {
  zadatak!: Zadatak;
  noviKomentar = '';
  mozePoslatiNaPregled = false;
  mozeZatvoriti = false;

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
    this.zadatakService.getZadatak(this.config.data.id).subscribe((zadatak) => {
      this.zadatak = zadatak;
      this.mozePoslatiNaPregled =
        this.zadatak.status == 'U_IZRADI' &&
        this.zadatak.izvrsiteljId ==
          this.autorizacijaService.prijavljeniKorisnik?.id;
      this.mozeZatvoriti =
        this.zadatak.status == 'NA_PREGLEDU' &&
        this.zadatak.izvrsiteljId ==
          this.autorizacijaService.prijavljeniKorisnik?.id;
    });
  }

  zatvori() {
    const updateZadatakDTO: UpdateZadatakDTO = {
      status: 'ZATVOREN',
    };
    this.zadatakService
      .updateZadatak(this.zadatak.id, updateZadatakDTO)
      .subscribe({
        next: () => {
          console.log('Zadatak zatvoren');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  posaljiNaPregled() {
    const updateZadatakDTO: UpdateZadatakDTO = {
      status: 'NA_PREGLEDU',
    };
    this.zadatakService
      .updateZadatak(this.zadatak.id, updateZadatakDTO)
      .subscribe({
        next: () => {
          console.log('Zadatak na pregledu');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  dodajKomentar() {
    if (this.noviKomentar == '') return;

    const komentarDTO: KomentarDTO = {
      sadrzaj: this.noviKomentar,
      korisnikId: this.autorizacijaService.prijavljeniKorisnik?.id!,
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
