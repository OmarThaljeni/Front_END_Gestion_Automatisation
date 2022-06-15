import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionUsersService } from 'src/app/Services/gestion_users.service';
import { IaasService } from 'src/app/Services/iaas.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-ajouter-iaas',
  templateUrl: './ajouter-iaas.component.html',
  styleUrls: ['./ajouter-iaas.component.scss']
})
export class AjouterIaasComponent implements OnInit {

  submitted = false;

  user: any;

  TypeIAAS: any;

  selected: any;


  selecedOS: any
  TypeOs: any;


  selectedRam: any;
  TypeRam: any;


  selectedCPU: any;
  TypeCPU: any;


  selectedDisque: any;
  TypeDisque: any;


  constructor(private iaasService: IaasService, private notificationService: NotificationService,
    private dialogService: DialogService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AjouterIaasComponent>, private userSrvice: GestionUsersService) { }

  ngOnInit() {
    this.onCloseOnlickEchap()
    this.remplierType()

  }

  remplierType() {
    this.TypeIAAS = [
      { id: "1", type: 'Machine 1' }, { id: "2", type: 'Machine 2' }, { id: "3", type: 'Machine 3' }]
    this.selected = this.TypeIAAS[1].type;

    this.TypeOs = [
      { id: "1", type: 'Windows' }, { id: "2", type: 'Linux' }, { id: "3", type: 'Ubuntu' }, { id: "4", type: 'Centos' }, { id: "5", type: 'Fedora' }]
    this.selecedOS = this.TypeOs[1].type;


    this.TypeRam = [
      { id: "1", type: '2GO' }, { id: "2", type: '4GO' }, { id: "3", type: '8GO' }, { id: "4", type: '12GO' }, { id: "5", type: '16GO' }]
    this.selectedRam = this.TypeRam[1].type;


    this.TypeCPU = [
      { id: "1", type: '1-4VCPU' }, { id: "2", type: '1-8CVPU' }]
    this.selectedCPU = this.TypeCPU[1].type;


    this.TypeDisque = [
      { id: "1", type: '500 GO' }, { id: "2", type: '1 TO' }]
    this.selectedDisque = this.TypeDisque[1].type;


  }


  DisplayAndClose() {
    if (this.submitted == true) {
      this.dialogRef.close()
      this.notificationService.success(':: Submitted successfully');
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
    type: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    os: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    ram: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    cpu: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    disque: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  });



  initializeFormGroup() {
    this.form.setValue({
      type: '',
      os: '',
      ram: '',
      cpu: '',
      disque: '',
    });
  }

  ajouterIAAS() {
    const id = localStorage.getItem('id');
    this.userSrvice.getUserById(id).subscribe(res => {
      this.user = res;
      const IAAS = {
        type: this.form.get('type').value,
        os: this.form.get('os').value,
        ram: this.form.get('ram').value,
        cpu: this.form.get('cpu').value,
        disque: this.form.get('disque').value,
        user: this.user
      };

      this.iaasService.AjouteRIAAS(IAAS).subscribe(res => {
        this.submitted = true
        this.DisplayAndClose();
      })
  
    })

    


  }
}
