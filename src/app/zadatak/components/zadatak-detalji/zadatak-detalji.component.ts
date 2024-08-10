import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { KomentarDTO, UpdateZadatakDTO, Zadatak } from '../../interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ZadatakService } from '../../services/zadatak.service';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { KomentarService } from '../../services/komentar.service';
import { AutorizacijaService } from '../../../autorizacija/services/autorizacija.service';
import { PrivitakListaComponent } from '../../../privitak/components/privitak-lista/privitak-lista.component';
import { ZadatakPrioritetChipComponent } from '../zadatak-prioritet-chip/zadatak-prioritet-chip.component';
import { Editor } from 'primeng/editor';
import { KorisnikService } from '../../../korisnik/services/korisnik.service';
import { KorisnikNaziv } from '../../../korisnik/interfaces';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'zadatak-detalji',
  standalone: true,
  imports: [
    PrimengModule,
    FormsModule,
    PrivitakListaComponent,
    ZadatakPrioritetChipComponent,
  ],
  templateUrl: './zadatak-detalji.component.html',
  styleUrl: './zadatak-detalji.component.css',
})
export class ZadatakDetaljiComponent implements OnInit {
  zadatak!: Zadatak;
  korisnici: KorisnikNaziv[] = [];
  noviKomentar = '';
  mozePoslatiNaPregled = false;
  mozeZatvoritiIliVratitiNaDoradu = false;
  mozeDodatiPrivitak = false;
  trebaAzuriratiOpis = false;
  mozePromjenitiIzvrsitelja = false;
  @ViewChild('editor', { static: false }) editor!: Editor;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private zadatakService: ZadatakService,
    private komentarService: KomentarService,
    private autorizacijaService: AutorizacijaService,
    private renderer: Renderer2,
    private korisnikService: KorisnikService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.dohvatiZadatak();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const editorElement = this.editor.getQuill().root;
      this.renderer.listen(editorElement, 'blur', () => {
        this.updateOpis();
      });
    }, 500);
  }

  dohvatiZadatak() {
    this.zadatakService.getZadatak(this.config.data.id).subscribe((zadatak) => {
      this.zadatak = zadatak;
      this.mozePoslatiNaPregled =
        this.zadatak.status == 'U_IZRADI' &&
        this.zadatak.izvrsiteljId ==
          this.autorizacijaService.prijavljeniKorisnik?.id;
      this.mozeZatvoritiIliVratitiNaDoradu =
        this.zadatak.status == 'NA_PREGLEDU' &&
        this.zadatak.izvjestiteljId ==
          this.autorizacijaService.prijavljeniKorisnik?.id;
      this.mozeDodatiPrivitak =
        this.zadatak.izvjestiteljId ==
          this.autorizacijaService.prijavljeniKorisnik?.id ||
        this.zadatak.izvrsiteljId ==
          this.autorizacijaService.prijavljeniKorisnik?.id;
      this.mozePromjenitiIzvrsitelja =
        this.zadatak.izvjestiteljId ==
        this.autorizacijaService.prijavljeniKorisnik?.id;

      if (this.mozePromjenitiIzvrsitelja) {
        this.korisnikService.getKorisnici().subscribe((korisnici) => {
          this.korisnici = korisnici.map((korisnik) => {
            const naziv = korisnik.ime + ' ' + korisnik.prezime;
            return { ...korisnik, naziv };
          });
        });
      }
    });
  }

  vratiNaDoradu() {
    const updateZadatakDTO: UpdateZadatakDTO = {
      status: 'U_IZRADI',
    };
    this.zadatakService
      .updateZadatak(this.zadatak.id, updateZadatakDTO)
      .subscribe({
        next: () => {
          this.ref.close(true);
          this.toast.showSuccess('Zadatak natrag u izradi');
        },
        error: (err) => {
          this.toast.showError('Greška pri vraćanju zadatka na doradu');
        },
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
          this.ref.close(true);
          this.toast.showSuccess('Zadatak zatvoren');
        },
        error: (err) => {
          this.toast.showError('Greška pri zatvaranju zadatka');
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
          this.ref.close(true);
          this.toast.showSuccess('Zadatak poslan na pregled');
        },
        error: (err) => {
          this.toast.showError('Greška pri slanju zadatka na pregled');
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
        this.toast.showSuccess('Komentar dodan');
      },
      error: (err) => {
        this.toast.showError('Greška pri dodavanju komentara');
      },
    });
  }

  updateOpis() {
    if (!this.trebaAzuriratiOpis) return;
    const updateZadatakDTO: UpdateZadatakDTO = {
      opis: this.zadatak.opis,
    };
    this.zadatakService
      .updateZadatak(this.zadatak.id, updateZadatakDTO)
      .subscribe({
        next: () => {
          this.toast.showSuccess('Opis ažuriran');
          this.trebaAzuriratiOpis = false;
        },
        error: (err) => {
          this.toast.showError('Greška pri ažuriranju opisa');
        },
      });
  }

  promjeniIzvrsitelja() {
    const updateZadatakDTO: UpdateZadatakDTO = {
      izvrsiteljId: this.zadatak.izvrsiteljId,
    };
    this.zadatakService
      .updateZadatak(this.zadatak.id, updateZadatakDTO)
      .subscribe({
        next: () => {
          this.toast.showSuccess('Izvršitelj ažuriran');
        },
        error: (err) => {
          this.toast.showError('Greška pri ažuriranju izvršitelja');
        },
      });
  }
}
