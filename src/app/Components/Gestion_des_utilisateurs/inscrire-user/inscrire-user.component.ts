import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionUsersService } from 'src/app/Services/gestion_users.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-inscrire-user',
  templateUrl: './inscrire-user.component.html',
  styleUrls: ['./inscrire-user.component.scss']
})
export class InscrireUserComponent implements OnInit {

  submitted = false;


  constructor(private ajoutService:GestionUsersService,private notificationService: NotificationService,
    private dialogService: DialogService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InscrireUserComponent>) { }

  ngOnInit() {
    this.onCloseOnlickEchap()

  }

  DisplayAndClose() {
    if (this.submitted == true) {
      this.dialogRef.close()
      this.notificationService.success(':: Submitted successfully');
    }
  }


  onCloseOnlickEchap()
  {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.onClose();
      }
  });
  this.dialogRef.backdropClick().subscribe(event => {
      this.onClose();
  });   
  }


  onClose() {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }

  form: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    prenom: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    date_Naissance:new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    numTel: new FormControl('', [Validators.required, Validators.maxLength(8)]),
  });



  initializeFormGroup() {
    this.form.setValue({
      nom: '',
      prenom: '',
      email: '',
      adresse:'',
      password:'',
      numTel:'',
      date_Naissance:'',
    });
  }

registerUser()
{     
  if (this.form.valid) {
    const utilisateur = {
      nom: this.form.get('nom').value,
      prenom: this.form.get('prenom').value,
      email: this.form.get('email').value,
      adress: this.form.get('adresse').value,
      date_Naissance:this.form.get('date_Naissance').value,
      numTel: this.form.get('numTel').value,
      password: this.form.get('password').value,
    };

     this.ajoutService.RegisterUser(utilisateur).subscribe(res => {
      this.submitted = true;
      this.notificationService.success("Inscription s'effectue avec succéss");
      this.DisplayAndClose();
    } )

  
}

  
  }
}
