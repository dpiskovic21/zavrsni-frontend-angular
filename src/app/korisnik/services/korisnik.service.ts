import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from '../../app.config';
import { Korisnik } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class KorisnikService {
  private readonly url = apiURL + 'korisnik';

  constructor(private http: HttpClient) {}

  getKorisnici() {
    return this.http.get<Korisnik[]>(this.url);
  }

  getKorisnik(id: number) {
    return this.http.get<Korisnik>(`${this.url}/${id}`);
  }
}
