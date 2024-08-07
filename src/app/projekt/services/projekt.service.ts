import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from '../../app.config';
import { CreateProjektDTO, Projekt, ProjektStatistika } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProjektService {
  private readonly url = apiURL + '/projekt';

  constructor(private http: HttpClient) {}

  createProjekt(dto: CreateProjektDTO) {
    return this.http.post(this.url, dto);
  }

  getProjekti() {
    return this.http.get<Projekt[]>(this.url);
  }

  getProjekt(id: number) {
    return this.http.get<Projekt>(`${this.url}/${id}`);
  }

  getProjektStatistika(id: number, datum: Date | null = null) {
    let datumQuery = '';
    if (datum) {
      datumQuery = `?datum=${datum.toISOString()}`;
    }
    return this.http.get<ProjektStatistika>(
      `${this.url}/${id}/statistika${datumQuery}`
    );
  }

  deleteProjekt(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateProjekt(id: number, dto: any) {
    return this.http.patch(`${this.url}/${id}`, dto);
  }
}
