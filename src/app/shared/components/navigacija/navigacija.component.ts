import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AppRute } from '../../../routes/app-rute';
import { AutorizacijaService } from '../../../autorizacija/services/autorizacija.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigacija',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navigacija.component.html',
  styleUrl: './navigacija.component.css',
})
export class NavigacijaComponent {
  rute = AppRute;

  constructor(
    private autorizacijaServis: AutorizacijaService,
    private ruter: Router
  ) {}

  prijavljeniKorisnikJeAdmin() {
    return this.autorizacijaServis.prijavljeniKorisnik?.admin == true;
  }

  odjava() {
    this.autorizacijaServis.odjava();
    this.ruter.navigateByUrl(this.rute.Autorizacija);
  }
}
