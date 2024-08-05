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
    datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }],
  };
  options: any;
  @Input() set odabraniProjekt(p: Projekt | null) {
    console.log(p);
    if (p != null) {
      this.projekt = p;
      this.projektServis
        .getProjektStatistika(this.projekt?.id!)
        .subscribe((statistika) => {
          console.log(statistika);
          for (const id in statistika.korisniciSaBrojemZadataka) {
            this.data.labels.push(
              statistika.korisniciSaBrojemZadataka[id].naziv
            );
            this.data.datasets[0].data.push(
              statistika.korisniciSaBrojemZadataka[id].brojZadataka
            );
            this.data.datasets[0].backgroundColor.push('red');
            this.data.datasets[0].hoverBackgroundColor.push('blue');
          }
          console.log(this.data);
        });
    }
  }

  constructor(private projektServis: ProjektService) {}

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

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
  }
}
