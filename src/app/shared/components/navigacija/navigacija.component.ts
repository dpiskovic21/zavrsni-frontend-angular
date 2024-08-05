import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AppRute } from '../../../routes/app-rute';
import { AutorizacijaService } from '../../../autorizacija/services/autorizacija.service';

@Component({
  selector: 'app-navigacija',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigacija.component.html',
  styleUrl: './navigacija.component.css',
})
export class NavigacijaComponent {
  rute = AppRute;

  constructor(
    private autorizacijaServis: AutorizacijaService,
    private ruter: Router
  ) {}

  odjava() {
    this.autorizacijaServis.odjava();
    this.ruter.navigateByUrl(this.rute.Autorizacija);
  }
}
