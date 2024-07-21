import { Zadatak } from '../../zadatak/interfaces';

export interface Projekt {
  id: number;
  naziv: string;
  datumPocetka: Date;
  datumZavrsetka: Date | null;
  zadaci?: Zadatak[];
}
