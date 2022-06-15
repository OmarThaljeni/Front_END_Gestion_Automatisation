import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from 'src/app/Services/dialog.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { GestionSystemeMachineService } from 'src/app/Services/systeme.machine';

@Component({
  selector: 'app-modifier-systeme-m',
  templateUrl: './modifier-systeme-m.component.html',
  styleUrls: ['./modifier-systeme-m.component.scss']
})
export class ModifierSystemeMComponent implements OnInit {

  submitted = false;


  constructor(private ajoutService:GestionSystemeMachineService,private notificationService: NotificationService,
    private dialogService: DialogService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModifierSystemeMComponent>) { }

  ngOnInit() {
    this.onCloseOnlickEchap()
    this.initializeFormGroup()
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
    osSM: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    versionSM: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    adresseIPSM: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    ramSM: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    cpuSM: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    disqueSM:new FormControl('', [Validators.required]),
  });



  initializeFormGroup() {
    this.form.setValue({
      osSM: this.data.osSM,
      versionSM: this.data.versionSM,
      adresseIPSM: this.data.adresseIPSM,
      ramSM:this.data.ramSM,
      cpuSM:this.data.cpuSM,
      disqueSM:this.data.disqueSM,
    });
  }

ModifierSM()
{     
  if (this.form.valid) {
    const SM = {
      osSM: this.form.get('osSM').value,
      versionSM: this.form.get('versionSM').value,
      adresseIPSM: this.form.get('adresseIPSM').value,
      ramSM: this.form.get('ramSM').value,
      cpuSM: this.form.get('cpuSM').value,
      disqueSM:this.form.get('disqueSM').value,
    };
      
     this.ajoutService.ModifierSystemeMachine(this.data.id,SM).subscribe(res => {
      this.submitted = true
      this.DisplayAndClose();
    } )

  }
}
}
