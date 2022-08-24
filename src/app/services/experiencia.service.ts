import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
private URL = environment.URL;
  constructor(private http:HttpClient) { }

  public getExperiencia():Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(`${this.URL}/api/experience`);
  }
  public addExperiencia(experiencia: Experiencia):Observable<Experiencia>{
    return this.http.post<Experiencia>(`${this.URL}/api/experience`,experiencia);
  }
  public updateExperiencia(experiencia: Experiencia):Observable<Experiencia>{
    return this.http.put<Experiencia>(`${this.URL}/api/experience`,experiencia);
  }
  public deleteExperiencia(experienciaId: number):Observable<void>{
    return this.http.delete<void>(`${this.URL}/api/experience/${experienciaId}`);
  }
}

