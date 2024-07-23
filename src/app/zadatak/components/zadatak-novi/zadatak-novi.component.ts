import { Component } from '@angular/core';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { KorisnikService } from '../../../korisnik/services/korisnik.service';
import { map, Observable } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ZadatakService } from '../../services/zadatak.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { Zadatak } from '../../interfaces';
import { AutorizacijaService } from '../../../autorizacija/services/autorizacija.service';
import { ZadatakDTO } from '../../interfaces/zadatak-dto';
@Component({
  selector: 'zadatak-novi',
  standalone: true,
  imports: [PrimengModule, ReactiveFormsModule, FormsModule],
  templateUrl: './zadatak-novi.component.html',
  styleUrl: './zadatak-novi.component.css',
})
export class ZadatakNoviComponent {
  korisnici$!: Observable<{ prikaz: string; vrijednost: number }[]>;
  forma!: FormGroup;
  editor = '';
  constructor(
    private korisnikService: KorisnikService,
    private zadatakService: ZadatakService,
    private ref: DynamicDialogRef,
    private ruta: ActivatedRoute,
    private autorizacijaService: AutorizacijaService
  ) {}

  ngOnInit() {
    this.forma = new FormGroup({
      naziv: new FormControl('', [Validators.required]),
      opis: new FormControl('', [Validators.required]),
      rok: new FormControl(this.dohvatiDanjasniDatum(), {
        validators: [Validators.required],
      }),
      prioritet: new FormControl('NIZAK', [Validators.required]),
      izvrsitelj: new FormControl(null, [Validators.required]),
    });

    this.korisnici$ = this.korisnikService.getKorisnici().pipe(
      map((korisnici) =>
        korisnici.map((korisnik) => {
          return {
            prikaz: korisnik.ime + ' ' + korisnik.prezime,
            vrijednost: korisnik.id,
          };
        })
      )
    );
  }

  prioriteti = [
    { prikaz: 'Nizak', vrijednost: 'NIZAK' },
    { prikaz: 'Srednji', vrijednost: 'SREDNJI' },
    { prikaz: 'Visok', vrijednost: 'VISOK' },
    { prikaz: 'Kritičan', vrijednost: 'KRITICAN' },
  ];

  dohvatiDanjasniDatum(): Date | null | undefined {
    return new Date();
  }

  dodajZadatak() {
    if (this.forma.invalid) return;
    const { naziv, rok, opis, prioritet, izvrsitelj } = this.forma.value;
    const dto: ZadatakDTO = {
      projektId: +this.ruta.snapshot.paramMap.get('id')!,
      izvjestiteljId: this.autorizacijaService.prijavljeniKorisnik.id,
      naziv,
      opis,
      rok,
      prioritet,
      izvrsiteljId: izvrsitelj,
    };

    this.zadatakService.postZadatak(dto).subscribe({
      next: () => {
        this.ref.close(true);
      },
      error: () => {
        console.log('error adding new task');
      },
    });
  }
}
