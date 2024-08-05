import { Component, Input } from '@angular/core';
import { PrivitakService } from '../../services/privitak.service';
import { Privitak } from '../../../zadatak/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'privitak-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privitak-lista.component.html',
  styleUrl: './privitak-lista.component.css',
})
export class PrivitakListaComponent {
  @Input() privitci!: Privitak[];

  constructor(private privitakService: PrivitakService) {}

  preuzmiPrivitak(privitak: Privitak) {
    this.privitakService.getPrivitak(privitak.putanja).subscribe((r) => {
      const buff = new Uint8Array(r.data);
      const url = window.URL.createObjectURL(
        new Blob([buff], { type: privitak.mimetype })
      );
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = privitak.naziv;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }
}
