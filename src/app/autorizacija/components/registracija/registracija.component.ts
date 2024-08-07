import { Component } from '@angular/core';
import { AutorizacijaService } from '../../services/autorizacija.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';

@Component({
  selector: 'app-registracija',
  standalone: true,
  imports: [ReactiveFormsModule, PrimengModule],
  templateUrl: './registracija.component.html',
  styleUrl: './registracija.component.css',
})
export class RegistracijaComponent {
  forma!: FormGroup;
  constructor(private autorizacijaService: AutorizacijaService) {}

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
    console.log(this.forma.value);
  }
}
