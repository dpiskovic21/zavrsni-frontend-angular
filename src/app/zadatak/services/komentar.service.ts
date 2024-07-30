import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from '../../app.config';
import { Komentar, KomentarDTO } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class KomentarService {
  private readonly url = apiURL + '/komentar';

  constructor(private http: HttpClient) {}

  postKomenatar(komentar: KomentarDTO) {
    return this.http.post<Komentar>(this.url, komentar);
  }
}
