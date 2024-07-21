import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from '../../app.config';
import { PrijavaDTO } from '../interfaces';
import { Korisnik } from '../../korisnik/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AutorizacijaService {
  private readonly url = apiURL + '/autorizacija';

  constructor(private http: HttpClient) {}

  prijava(dto: PrijavaDTO) {
    return this.http.post<Korisnik>(this.url + '/prijava', dto);
  }
}
