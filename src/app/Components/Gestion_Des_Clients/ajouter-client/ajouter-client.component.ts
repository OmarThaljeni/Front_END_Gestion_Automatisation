import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionClientsService } from 'src/app/Services/gestion-client.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.component.html',
  styleUrls: ['./ajouter-client.component.scss']
})
export class AjouterClientComponent implements OnInit {

  submitted = false;


  constructor(private ajoutService:GestionClientsService,private notificationService: NotificationService,
    private dialogService: DialogService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AjouterClientComponent>) { }

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
    adresse: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    dateNaissance:new FormControl('', [Validators.required]),
    numTel: new FormControl('', [Validators.required, Validators.maxLength(8)]),
  });



  initializeFormGroup() {
    this.form.setValue({
      nom: '',
      prenom: '',
      email: '',
      adresse:'',
      password:'',
      dateNaissance:'',
      numTel:'',
    });
  }

AjouterClient()
{     
  if (this.form.valid) {
    const client = {
      nom: this.form.get('nom').value,
      prenom: this.form.get('prenom').value,
      email: this.form.get('email').value,
      adress: this.form.get('adresse').value,
      numTel: this.form.get('numTel').value,
      date_Naissance:this.form.get('dateNaissance').value,
      password: this.form.get('password').value,
    };
      
     this.ajoutService.AjouterClient(client).subscribe(res => {
      this.submitted = true
      this.DisplayAndClose();
    } )

  }
}

}