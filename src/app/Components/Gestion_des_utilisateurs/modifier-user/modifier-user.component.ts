import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/Services/dialog.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GestionUsersService } from 'src/app/Services/gestion_users.service';

@Component({
  selector: 'app-modifier-user',
  templateUrl: './modifier-user.component.html',
  styleUrls: ['./modifier-user.component.scss']
})
export class ModifierUserComponent implements OnInit {

  submitted = false;

  selectedRole:any;

  constructor(private modiferUser: GestionUsersService, private notificationService: NotificationService,
    private dialogService: DialogService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModifierUserComponent>) { }

  ngOnInit() {
    this.onCloseOnlickEchap();
    this.initialiserForms();   
    
  }

  DisplayAndClose() {
    if (this.submitted == true) {
      this.dialogRef.close()
      this.notificationService.success(':: Utilisateur mis à jour');
    }
  }


  onCloseOnlickEchap() {
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
    adress: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    numTel: new FormControl('', [Validators.required, Validators.maxLength(8)]),

  });



  initializeFormGroup() {
    this.form.setValue({
      nom: '',
      prenom: '',
      email: '',
      adress: '',
      date_Naissance:'',
      password: '',
      numTel: '',
    });
  }



  initialiserForms() {
    this.form.setValue({
      nom: this.data.nom,
      prenom: this.data.prenom,
      email: this.data.email,
      adress: this.data.adress,
      date_Naissance:this.data.date_Naissance,
      password: '',
      numTel: this.data.numTel,

    });
  }


  modifierUser() {
    if (this.form.valid) {


      this.modiferUser.ModifierUser(this.data.id, this.form.value).subscribe(
        res => {
          this.notificationService.success(':: Utilisateur mis à jour');
          this.dialogRef.close();
        }
      )
    }


  }
}
