import { Component } from '@angular/core';
import { AdminTablicaComponent } from '../admin-tablica/admin-tablica.component';
import { Column } from '../../../shared/interfaces';
import { PrivitakService } from '../../../privitak/services/privitak.service';

@Component({
  selector: 'admin-privitci',
  standalone: true,
  imports: [AdminTablicaComponent],
  templateUrl: './admin-privitci.component.html',
  styleUrl: './admin-privitci.component.css',
})
export class AdminPrivitciComponent {
  privitci: any[] = [];
  stupci!: Column[];

  constructor(private privitakServis: PrivitakService) {}

  ngOnInit() {
    this.dohvatiSvePrivitke();
  }

  dohvatiSvePrivitke() {
    this.privitakServis.getPrivitci().subscribe((privitci) => {
      this.stupci = [];
      for (let key of Object.keys(privitci[0])) {
        this.stupci.push({ field: key, header: key.toLocaleUpperCase() });
      }
      this.privitci = privitci;
    });
  }

  obrisiPrivitak(id: string) {
    this.privitakServis.deletePrivitak(id).subscribe(() => {
      this.dohvatiSvePrivitke();
    });
  }
}
