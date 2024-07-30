import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from '../../app.config';
import { UpdateZadatakDTO, Zadatak } from '../interfaces';
import { ZadatakDTO } from '../interfaces/zadatak-dto';

@Injectable({
  providedIn: 'root',
})
export class ZadatakService {
  private readonly url = apiURL + '/zadatak';

  constructor(private http: HttpClient) {}

  getZadatak(id: number) {
    return this.http.get<Zadatak>(`${this.url}/${id}`);
  }

  postZadatak(zadatak: ZadatakDTO) {
    return this.http.post<Zadatak>(this.url, zadatak);
  }

  updateZadatak(id: number, updateZadatakDTO: UpdateZadatakDTO) {
    return this.http.patch<Zadatak>(`${this.url}/${id}`, updateZadatakDTO);
  }
}
