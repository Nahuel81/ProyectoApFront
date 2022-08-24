import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/models/experiencia';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ExperienciaService } from 'src/app/services/experiencia.service';



@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  public experiencias: Experiencia[] = [];
  public editExperiencia: Experiencia|undefined;
  public deleteExperiencia: Experiencia|undefined;

  constructor(
    private experienciaService: ExperienciaService,
    public autenticacionService: AutenticacionService
  ) {}

  isloged = () => this.autenticacionService.loggedIn();

  ngOnInit(): void {
    this.getExperiencia();
  }

  public getExperiencia(): void {
    this.experienciaService.getExperiencia().subscribe({
      next: (response: Experiencia[]) => {
        this.experiencias = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }

  public onOpenModal(mode: string, experiencia?: Experiencia): void {
    const container = document.getElementById('addExperienciaModal');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addExperienciaModal');
    } else if (mode === 'delete') {
      this.deleteExperiencia = experiencia;
      button.setAttribute('data-bs-target', '#deleteExperienciaModal');
    } else if (mode === 'edit') {
      this.editExperiencia = experiencia;
      button.setAttribute('data-bs-target', '#editExperienciaModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddEducation(addForm: NgForm): void {
    document.getElementById('add-experiencia-form')?.click();
    this.experienciaService.addExperiencia(addForm.value).subscribe({
      next: (response: Experiencia) => {
       /*  console.log(response); */
        this.getExperiencia();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }

public onUpdateEducation(experiencia:Experiencia){
  this.editExperiencia=experiencia;
  document.getElementById('add-experiencia-form')?.click();
  this.experienciaService.updateExperiencia(experiencia).subscribe({
    next: (response:Experiencia)=>{
     /*  console.log(response); */
      this.getExperiencia();
    },error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
}

public onDeleteEducation(idExp: number): void {
  this.experienciaService.deleteExperiencia(idExp).subscribe({
    next: (response: void) => {
     /*  console.log(response); */
      this.getExperiencia();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    },
  });
} 

}



