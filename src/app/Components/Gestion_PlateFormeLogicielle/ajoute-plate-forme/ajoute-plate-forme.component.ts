import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from 'src/app/Services/dialog.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { GestionPlateFormeService } from 'src/app/Services/plate_forme.service';

@Component({
  selector: 'app-ajoute-plate-forme',
  templateUrl: './ajoute-plate-forme.component.html',
  styleUrls: ['./ajoute-plate-forme.component.scss']
})
export class AjoutePlateFormeComponent implements OnInit {

  submitted = false;


  constructor(private plateFormeService:GestionPlateFormeService,private notificationService: NotificationService,
    private dialogService: DialogService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AjoutePlateFormeComponent>) { }

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
    nomPFA: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    nbPFA: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  });



  initializeFormGroup() {
    this.form.setValue({
      nomPFA: '',
      nbPFA: '',
    });
  }

  AjouterPFA()
{     
  if (this.form.valid) {
    const PFA = {
      nomPFA: this.form.get('nomPFA').value,
      nbPFA: this.form.get('nbPFA').value,
    };
      
     this.plateFormeService.AjouterPlateFormeLogicielle(PFA).subscribe(res => {
      this.submitted = true
      this.DisplayAndClose();
    } )

  
}

}


}
