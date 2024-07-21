export interface Zadatak {
  id: number;
  naziv: string;
  opis: string;
  projektId: number;
  izvrsiteljId: number;
  izvjestiteljId: number;
  prioritet: string;
  rok: Date;
  status: string;
  datumIzrade: Date;
  datumZavrsetka: Date | null;
}
