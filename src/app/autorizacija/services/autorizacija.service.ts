import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from '../../app.config';
import { PrijavaDTO, RegistracijaDTO } from '../interfaces';
import { Korisnik } from '../../korisnik/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AutorizacijaService {
  private readonly url = apiURL + '/autorizacija';

  constructor(private http: HttpClient) {}

  get prijavljeniKorisnik(): Korisnik | null {
    const korisnik = JSON.parse(localStorage.getItem('korisnik')!);

    if (!korisnik) {
      return null;
    }

    return korisnik;
  }

  prijava(dto: PrijavaDTO) {
    return this.http.post<Korisnik>(this.url + '/prijava', dto);
  }

  odjava() {
    localStorage.removeItem('korisnik');
  }

  registracija(dto: RegistracijaDTO) {
    return this.http.post<Korisnik>(this.url + '/registracija', dto);
  }
}
