import { Component, } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { QuoteComponent } from "../../shared/quote/quote.component";
import { OutlinedButtonComponent } from "../../shared/outlined-button/outlined-button.component";
import { FormsModule } from '@angular/forms';
import { login } from '../../services/api/api.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [RouterLink, QuoteComponent, OutlinedButtonComponent, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router,
    private msgService: MessageService
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

    await login({ username: this.username, password: this.password })
      .then(resp => {
        if (resp === 400) {
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: "Credenciales incorrectas"
          });
        } 
        if (resp > 400) {
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: "Error al iniciar sesion, intenta mas tarde"
          });
        }
        if (resp === 200) {
          this.username = "";
          this.password = "";
          this.msgService.add({
            severity: "info",
            summary: "Bienvenido"
          });
          this.router.navigate(['/dashboard']);
        }
      });
  }

}
