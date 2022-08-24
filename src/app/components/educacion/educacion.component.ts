import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/models/educacion';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { EducacionService } from 'src/app/services/educacion.service';



@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public educations: Educacion[] = [];
  public editEducation: Educacion|undefined;
  public deleteEducation: Educacion|undefined;

  constructor(
    private educationService: EducacionService,
    public autenticacionService: AutenticacionService
  ) {}

  isloged = () => this.autenticacionService.loggedIn();

  ngOnInit(): void {
    this.getEducation();
  }

  public getEducation(): void {
    this.educationService.getEducation().subscribe({
      next: (response: Educacion[]) => {
        this.educations = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }

  public onOpenModal(mode: string, education?: Educacion): void {
    const container = document.getElementById('addEducationModal');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addEducationModal');
    } else if (mode === 'delete') {
      this.deleteEducation = education;
      button.setAttribute('data-bs-target', '#deleteEducationModal');
    } else if (mode === 'edit') {
      this.editEducation = education;
      button.setAttribute('data-bs-target', '#editEducationModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddEducation(addForm: NgForm): void {
    document.getElementById('add-education-form')?.click();
    this.educationService.addEducation(addForm.value).subscribe({
      next: (response: Educacion) => {
       /*  console.log(response); */
        this.getEducation();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }

public onUpdateEducation(education:Educacion){
  this.editEducation=education;
  document.getElementById('add-education-form')?.click();
  this.educationService.updateEducation(education).subscribe({
    next: (response:Educacion)=>{
     /*  console.log(response); */
      this.getEducation();
    },error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
}

public onDeleteEducation(idEdu: number): void {
  this.educationService.deleteEducation(idEdu).subscribe({
    next: (response: void) => {
     /*  console.log(response); */
      this.getEducation();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    },
  });
} 

}
