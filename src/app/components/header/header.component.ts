import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public info: Usuario | undefined;
  public editInfo: Usuario | undefined;

  constructor(
    private headerService: HeaderService,
    private autenticacionService: AutenticacionService
  ) {}
  isloged = () => this.autenticacionService.loggedIn();

  ngOnInit() {
    this.getInfo();
  }

  public getInfo(): void {
    this.headerService.getInfo().subscribe({
      next: (response: Usuario) => {
        this.info = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }

  public onOpenModal(mode: string, info?: Usuario): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    button.setAttribute('data-bs-target', '#editInfoModal');

    container?.appendChild(button);
    button.click();
  }
  public onUpdateInfo(info: Usuario): void {
    this.editInfo = info;
    this.headerService.updateInfo(info).subscribe({
      next: (response: Usuario) => {
       /*  console.log(response) */
        this.getInfo();
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }
}
