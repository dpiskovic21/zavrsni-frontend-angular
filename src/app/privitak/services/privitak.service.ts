import { Injectable } from '@angular/core';
import { apiURL } from '../../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PrivitakService {
  private readonly url = apiURL + '/privitak';

  constructor(private http: HttpClient) {}

  getPrivitak(putanja: string) {
    return this.http.get<any>(`${this.url}/${putanja}`);
  }
}
