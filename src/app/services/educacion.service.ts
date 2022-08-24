import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
private URL = environment.URL;
  constructor(private http:HttpClient) { }

  public getEducation():Observable<Educacion[]>{
    return this.http.get<Educacion[]>(`${this.URL}/api/educacion`);
  }
  public addEducation(education: Educacion):Observable<Educacion>{
    return this.http.post<Educacion>(`${this.URL}/api/educacion`,education);
  }
  public updateEducation(education: Educacion):Observable<Educacion>{
    return this.http.put<Educacion>(`${this.URL}/api/educacion`,education);
  }
  public deleteEducation(educationId: number):Observable<void>{
    return this.http.delete<void>(`${this.URL}/api/educacion/${educationId}`);
  }
}
