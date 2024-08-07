import { Component } from '@angular/core';
import { KorisnikService } from '../../../korisnik/services/korisnik.service';
import { Korisnik } from '../../../korisnik/interfaces';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { Column } from '../../../shared/interfaces';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminRute } from '../../routes/admin-rute';

@Component({
  selector: 'admin-home',
  standalone: true,
  imports: [PrimengModule, RouterLink, RouterOutlet],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent {
  rute = AdminRute;
}
