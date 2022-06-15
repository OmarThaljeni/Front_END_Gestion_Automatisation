import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionClientsService } from 'src/app/Services/gestion-client.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-modifier-client',
  templateUrl: './modifier-client.component.html',
  styleUrls: ['./modifier-client.component.scss']
})
export class ModifierClientComponent implements OnInit {

  submitted = false;


  constructor(private ajoutService:GestionClientsService,private notificationService: NotificationService,
    private dialogService: DialogService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModifierClientComponent>) { }

  ngOnInit() {
    this.onCloseOnlickEchap();
    this.initialiserForms();
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
    this.dialogRef.close();
  }

  form: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    prenom: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    adress: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    date_Naissance:new FormControl('', [Validators.required]),
    numTel: new FormControl('', [Validators.required, Validators.maxLength(8)]),
  });


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

  ModifierClient()
{     
  if (this.form.valid) {
    const client = {
      nom: this.form.get('nom').value,
      prenom: this.form.get('prenom').value,
      email: this.form.get('email').value,
      adress: this.form.get('adress').value,
      numTel: this.form.get('numTel').value,
      date_Naissance:this.form.get('date_Naissance').value,
      password: this.form.get('password').value,
    };
      
     this.ajoutService.ModifierClient(this.data.id,client).subscribe(res => {
      this.submitted = true
      this.DisplayAndClose();
    } )

  }
}

}