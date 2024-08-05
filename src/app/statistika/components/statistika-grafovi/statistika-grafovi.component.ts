import { Component, Input } from '@angular/core';
import { Projekt } from '../../../projekt/interfaces';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { ProjektService } from '../../../projekt/services/projekt.service';

@Component({
  selector: 'statistika-grafovi',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './statistika-grafovi.component.html',
  styleUrl: './statistika-grafovi.component.css',
})
export class StatistikaGrafoviComponent {
  projekt: Projekt | null = null;
  data: any = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  };
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  options: any;
  @Input() set odabraniProjekt(p: Projekt | null) {
    console.log(p);
    if (p != null) {
      this.projekt = p;
      this.projektServis
        .getProjektStatistika(this.projekt?.id!)
        .subscribe((statistika) => {
          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--text-color');
          for (const id in statistika.korisniciSaBrojemZadataka) {
            this.data.labels.push(
              statistika.korisniciSaBrojemZadataka[id].naziv
            );
            this.data.datasets[0].data.push(
              statistika.korisniciSaBrojemZadataka[id].brojZadataka
            );
            this.data.datasets[0].backgroundColor.push(this.getRandomColor());
          }
          this.options = {
            plugins: {
              legend: {
                labels: {
                  usePointStyle: true,
                  color: textColor,
                },
              },
            },
          };
        });
    }
  }

  constructor(private projektServis: ProjektService) {}

  ngOnInit() {}
}
