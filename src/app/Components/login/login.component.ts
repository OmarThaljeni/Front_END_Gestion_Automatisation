import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/Services/authentification.service';
import { InscrireUserComponent } from '../Gestion_des_utilisateurs/inscrire-user/inscrire-user.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthentificationService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }


  rememberMe: boolean;

  email = new FormControl('', [Validators.required, Validators.email]);

  invalidLogin: Boolean





  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Vous devez entrer une valeur';
    }

    return this.email.hasError('email') ? 'C/est pas un valide e-mail' : '';
  }






  login() {

    this.authService.login(this.form.value).subscribe(
      (reponse) => {

        const token = reponse["accessToken"];
        const roles = reponse["roles"]
        const id = reponse["id"];
        localStorage.setItem('roles', roles);
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        this.router.navigate(['/ISIPFE/acceuil']);

      },
      (error) => {
        console.log(error);
      }
    );


  }




  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rememberMe: new FormControl(false)

  });


  OpenInscrire() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "78%";
    this.dialog.open(InscrireUserComponent, dialogConfig);
  }

}
