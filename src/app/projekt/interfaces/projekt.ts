import { Zadatak } from '../../zadatak/interfaces';

export interface Projekt {
  id: number;
  naziv: string;
  datumPocetka: Date;
  datumZavrsetka: Date | null;
  zadaci?: Zadatak[];
  status: 'U_TIJEKU' | 'ZAVRSEN' | 'OTKAZAN';
  voditelji: { korisnikId: number }[];
}
