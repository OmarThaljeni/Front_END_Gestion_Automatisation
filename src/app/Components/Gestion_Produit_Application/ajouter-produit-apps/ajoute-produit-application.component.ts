import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from 'src/app/Services/dialog.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { GestionProduitApplicationService } from 'src/app/Services/produit.application.service';

@Component({
  selector: 'app-ajoute-produit-application',
  templateUrl: './ajoute-produit-application.component.html',
  styleUrls: ['./ajoute-produit-application.component.scss']
})

export class AjouteProduitAppsComponent implements OnInit {

  submitted = false;


  constructor(private AppsService:GestionProduitApplicationService,private notificationService: NotificationService,
    private dialogService: DialogService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AjouteProduitAppsComponent>) { }

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
    nomAPP: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    versionAPP: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  });

  initializeFormGroup() {
    this.form.setValue({
      nomAPP: '',
      versionAPP: '',
    });

  }



  AjouterPApps()
{     
  if (this.form.valid) {
    const PFA = {
      nomAPP: this.form.get('nomAPP').value,
      versionAPP: this.form.get('versionAPP').value,
    };
      
     this.AppsService.aAjouterProduitApplication(PFA).subscribe(res => {
      this.submitted = true
      
      this.DisplayAndClose();
    } )

  
}

}

}
