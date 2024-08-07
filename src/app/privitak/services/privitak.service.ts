import { Injectable } from '@angular/core';
import { apiURL } from '../../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PrivitakService {
  private readonly url = apiURL + '/privitak';

  constructor(private http: HttpClient) {}

  getPrivitci() {
    return this.http.get<any[]>(this.url);
  }

  getPrivitak(putanja: string) {
    return this.http.get<any>(`${this.url}/${putanja}`);
  }

  postPrivitak(dto: any) {
    return this.http.post<any>(this.url, dto);
  }

  deletePrivitak(putanja: string) {
    return this.http.delete<any>(`${this.url}/${putanja}`);
  }
}
