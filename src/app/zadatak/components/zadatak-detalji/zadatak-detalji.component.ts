import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
  noviKomentar = '';
  mozePoslatiNaPregled = false;
  mozeZatvoritiIliVratitiNaDoradu = false;
  trebaAzuriratiOpis = false;
  @ViewChild('editor', { static: false }) editor!: Editor;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private zadatakService: ZadatakService,
    private komentarService: KomentarService,
    private autorizacijaService: AutorizacijaService,
    private renderer: Renderer2
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
    }, 100);
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
          console.log('Zadatak natrag u izradi');
        },
        error: (err) => {
          console.log(err);
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
          this.ref.close(true);
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

  updateOpis() {
    if (!this.trebaAzuriratiOpis) return;
    const updateZadatakDTO: UpdateZadatakDTO = {
      opis: this.zadatak.opis,
    };
    this.zadatakService
      .updateZadatak(this.zadatak.id, updateZadatakDTO)
      .subscribe({
        next: () => {
          console.log('Zadatak opis ažuriran');
          this.trebaAzuriratiOpis = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
