import { Component, } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { QuoteComponent } from "../../shared/quote/quote.component";
import { OutlinedButtonComponent } from "../../shared/outlined-button/outlined-button.component";
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, QuoteComponent, OutlinedButtonComponent, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router,
    private msgService: MessageService,
    private authService: AuthService
  ) { }

  public username: string = '';
  public password: string = '';

  handleSubmit = async () => {
    if (this.username.length <= 0 || this.password.length <= 0) {
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: "Ingrese sus credenciales"
      });
      return
    }

    await this.authService.login({ username: this.username, password: this.password })
      .then(resp => {        
        if (resp >= 200 && resp < 300) {
          this.username = "";
          this.password = "";
          this.msgService.add({
            severity: "info",
            summary: "Bienvenido"
          });
          this.router.navigate(['/dashboard']);
        }
      })
      .catch(error => {
        console.log(error);

        if (error.status >= 400) {
          if (error.status === 400) {
            this.msgService.add({
              severity: "error",
              summary: "Error",
              detail: "Credenciales incorrectas"
            });
            return;
          }

          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: "Error al iniciar sesion, intenta mas tarde"
          });
          return;
        }

        this.msgService.add({
          severity: "error",
          summary: "Error",
          detail: "Error, no se pudo conectar al servidor"
        });
      });
  }
}
