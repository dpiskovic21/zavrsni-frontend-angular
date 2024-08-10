import { Component } from '@angular/core';
import { AutorizacijaService } from '../../services/autorizacija.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { Router } from '@angular/router';
import { AppRute } from '../../../routes/app-rute';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-registracija',
  standalone: true,
  imports: [ReactiveFormsModule, PrimengModule],
  templateUrl: './registracija.component.html',
  styleUrl: './registracija.component.css',
})
export class RegistracijaComponent {
  forma!: FormGroup;
  constructor(
    private autorizacijaService: AutorizacijaService,
    private ruter: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.forma = new FormGroup({
      ime: new FormControl('', [Validators.required]),
      prezime: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      lozinka: new FormControl('', [Validators.required]),
      admin: new FormControl(false),
    });
  }

  registracija() {
    if (this.forma.invalid) return;

    this.autorizacijaService.registracija(this.forma.value).subscribe({
      next: (_) => {
        this.toast.showSuccess('Uspješna registracija');
        this.ruter.navigateByUrl(`${AppRute.Autorizacija}`);
      },
      error: (err) => this.toast.showError(err.error.message ?? 'Greška'),
    });
  }
}
