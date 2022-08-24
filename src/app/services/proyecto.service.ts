import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private URL = environment.URL;
  constructor(private http:HttpClient) { }

  public getProyecto():Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(`${this.URL}/api/project`);
  }
  public addProyecto(proyecto: Proyecto):Observable<Proyecto>{
    return this.http.post<Proyecto>(`${this.URL}/api/project`,proyecto);
  }
  public updateProyecto(proyecto: Proyecto):Observable<Proyecto>{
    return this.http.put<Proyecto>(`${this.URL}/api/project`,proyecto);
  }
  public deleteProyecto(proyectoId: number):Observable<void>{
    return this.http.delete<void>(`${this.URL}/api/project/${proyectoId}`);
  }
}
