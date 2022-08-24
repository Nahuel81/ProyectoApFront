import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../models/skills';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
private URL = environment.URL;
  constructor(private http:HttpClient) { }

  public getSkill():Observable<Skill[]>{
    return this.http.get<Skill[]>(`${this.URL}/api/skill`);
  }
  public addSkill(skill: Skill):Observable<Skill>{
    return this.http.post<Skill>(`${this.URL}/api/skill`,skill);
  }
  public updateSkill(skill: Skill):Observable<Skill>{
    return this.http.put<Skill>(`${this.URL}/api/skill`,skill);
  }
  public deleteSkill(skillId: number):Observable<void>{
    return this.http.delete<void>(`${this.URL}/api/skill/${skillId}`);
  }
}

