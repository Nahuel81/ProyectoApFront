import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Proyecto } from 'src/app/models/proyecto';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ProyectoService } from 'src/app/services/proyecto.service';



@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})

export class ProyectoComponent implements OnInit {

  public proyectos: Proyecto[] = [];
  public editProyecto: Proyecto|undefined;
  public deleteProyecto: Proyecto|undefined;

  constructor(
    private projectService: ProyectoService,
    public autenticacionService: AutenticacionService
  ) {}

  isloged = () => this.autenticacionService.loggedIn();

  ngOnInit(): void {
    this.getProyecto();
  }

  public getProyecto(): void {
    this.projectService.getProyecto().subscribe({
      next: (response: Proyecto[]) => {
        this.proyectos = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }

  public onOpenModal(mode: string, proyecto?: Proyecto): void {
    const container = document.getElementById('addProyectoModal');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addProyectoModal');
    } else if (mode === 'delete') {
      this.deleteProyecto = proyecto;
      button.setAttribute('data-bs-target', '#deleteProyectoModal');
    } else if (mode === 'edit') {
      this.editProyecto = proyecto;
      button.setAttribute('data-bs-target', '#editProyectoModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddProyecto(addForm: NgForm): void {
    document.getElementById('add-proyecto-form')?.click();
    this.projectService.addProyecto(addForm.value).subscribe({
      next: (response: Proyecto) => {
       /*  console.log(response); */
        this.getProyecto();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }

public onUpdateProyecto(proyecto:Proyecto){
  this.editProyecto=proyecto;
  document.getElementById('add-proyecto-form')?.click();
  this.projectService.updateProyecto(proyecto).subscribe({
    next: (response:Proyecto)=>{
     /*  console.log(response); */
      this.getProyecto();
    },error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
}

public onDeleteProyecto(idProyecto: number): void {
  this.projectService.deleteProyecto(idProyecto).subscribe({
    next: (response: void) => {
     /*  console.log(response); */
      this.getProyecto();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    },
  });
} 

}








/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
 */