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
      zadatak.komentari = zadatak.komentari.sort(
        (a, b) =>
          new Date(b.datumIzrade).getTime() - new Date(a.datumIzrade).getTime()
      );
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

  azurirajZadatak(
    dto: UpdateZadatakDTO,
    zatvoriDialog = false,
    azuriranOpis = false
  ) {
    this.zadatakService.updateZadatak(this.zadatak.id, dto).subscribe({
      next: () => {
        if (zatvoriDialog) this.ref.close(true);
        this.toast.showSuccess('Zadatak ažuriran');
        if (azuriranOpis) {
          this.trebaAzuriratiOpis = false;
        }
      },
      error: (err) => {
        this.toast.showError('Greška pri ažuriranju zadatka');
      },
    });
  }

  vratiNaDoradu() {
    this.azurirajZadatak({ status: 'U_IZRADI' }, true);
  }

  zatvori() {
    this.azurirajZadatak({ status: 'ZATVOREN' }, true);
  }
  posaljiNaPregled() {
    this.azurirajZadatak({ status: 'NA_PREGLEDU' }, true);
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
    this.azurirajZadatak({ opis: this.zadatak.opis }, false, true);
  }

  promjeniIzvrsitelja() {
    this.azurirajZadatak({ izvrsiteljId: this.zadatak.izvrsiteljId });
  }
}
