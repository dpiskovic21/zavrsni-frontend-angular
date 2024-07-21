import { Component } from '@angular/core';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { AutorizacijaService } from '../../services/autorizacija.service';
import { ToastService } from '../../../shared/services/toast.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppRute } from '../../../routes/app-rute';

@Component({
  selector: 'app-prijava',
  standalone: true,
  imports: [PrimengModule, ReactiveFormsModule],
  templateUrl: './prijava.component.html',
  styleUrl: './prijava.component.css',
})
export class PrijavaComponent {
  forma!: FormGroup;

  constructor(
    private autorizacijaService: AutorizacijaService,
    private toast: ToastService,
    private ruter: Router
  ) {}

  ngOnInit() {
    this.forma = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      lozinka: new FormControl('', [Validators.required]),
    });
  }

  prijaviSe() {
    if (this.forma.invalid) {
      return;
    }

    this.autorizacijaService.prijava(this.forma.value).subscribe({
      next: (r) => {
        localStorage.setItem('korisnik', JSON.stringify(r));
        this.ruter.navigateByUrl(`${AppRute.Projekt}`);
      },
      error: (err) => {
        this.toast.showError(err.error.message);
      },
    });
  }
}
