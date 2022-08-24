import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private URL = environment.URL;

  constructor(private http: HttpClient) {}

  public getInfo(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.URL}/api/usuario/1`);
  }
  public updateInfo(info: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.URL}/api/usuario`, info);
  }

}
