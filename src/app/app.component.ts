import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimengModule } from './shared/modules/primeng/primeng.module';
import { NavigacijaComponent } from './shared/components/navigacija/navigacija.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PrimengModule, NavigacijaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
