import { Korisnik } from '../../korisnik/interfaces';

export interface Komentar {
  id: number;
  sadrzaj: string;
  korisnikId: number;
  zadatakId: number;
  datumIzrade: Date;
  korisnik: Korisnik;
}
