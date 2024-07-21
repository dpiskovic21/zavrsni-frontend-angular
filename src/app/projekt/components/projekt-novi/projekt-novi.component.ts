import { Component } from '@angular/core';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { KorisnikService } from '../../../korisnik/services/korisnik.service';
import { map } from 'rxjs';
import { ProjektService } from '../../services/projekt.service';
import { ToastService } from '../../../shared/services/toast.service';
import { Router } from '@angular/router';
import { AppRute } from '../../../routes/app-rute';
import { ProjektRute } from '../../routes/projekt-rute';

@Component({
  selector: 'app-projekt-novi',
  standalone: true,
  imports: [PrimengModule, ReactiveFormsModule],
  templateUrl: './projekt-novi.component.html',
  styleUrl: './projekt-novi.component.css',
})
export class ProjektNoviComponent {
  forma!: FormGroup;
  korisnici$ = this.korisnikService.getKorisnici().pipe(
    map((korisnici) =>
      korisnici.map((korisnik) => {
        return {
          naziv: korisnik.ime + ' ' + korisnik.prezime,
          id: korisnik.id,
        };
      })
    )
  );

  constructor(
    private korisnikService: KorisnikService,
    private projektService: ProjektService,
    private toast: ToastService,
    private ruter: Router
  ) {}

  ngOnInit() {
    this.forma = new FormGroup({
      naziv: new FormControl('', [Validators.required]),
      voditelji: new FormControl(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
    });
  }

  dodajProjekt() {
    if (this.forma.invalid) {
      return;
    }

    this.projektService.createProjekt(this.forma.value).subscribe({
      next: (r) => {
        this.toast.showSuccess('Uspješno dodan projekt');
        this.ruter.navigateByUrl(`/${AppRute.Projekt}/${ProjektRute.Lista}`);
      },
      error: (err) => {
        console.log(err);
        this.toast.showError(
          err.error.message || 'Greška prilikom dodavanja projekta'
        );
      },
    });
  }
}
