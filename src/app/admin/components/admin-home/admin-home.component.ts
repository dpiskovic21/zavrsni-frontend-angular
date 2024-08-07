import { Component } from '@angular/core';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminRute } from '../../routes/admin-rute';

@Component({
  selector: 'admin-home',
  standalone: true,
  imports: [PrimengModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent {
  rute = AdminRute;
}
