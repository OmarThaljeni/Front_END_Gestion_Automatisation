import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionDemandeClientsService } from 'src/app/Services/gestion_demande_client.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { GestionPlateFormeService } from 'src/app/Services/plate_forme.service';
import { GestionProduitApplicationService } from 'src/app/Services/produit.application.service';
import { GestionSystemeMachineService } from 'src/app/Services/systeme.machine';
import { AjouterClientComponent } from '../../Gestion_Des_Clients/ajouter-client/ajouter-client.component';

@Component({
  selector: 'app-ajout-demande-client',
  templateUrl: './ajout-demande-client.component.html',
  styleUrls: ['./ajout-demande-client.component.scss']
})
export class AjoutDemandeClientComponent implements OnInit {

  submitted = false;

  selectedOS: any;

  client: any;

  selectedService: any = "";

  plateFormeLogicielle = new FormControl();
  produitApplicationA = new FormControl();

  plateFormeLogicielleLists: any;
  ProduitApplicationLists: any;
  SystemeMachineApp: any;
  osForm = new FormControl();
  serveurForm = new FormControl();

  TypeDemande: any;

  TypeAps: [{ id: "1", type: 'SAAS' }, { id: "2", type: 'PAAS' }, { id: "3", type: 'IAAS' }]


  osList: string[] = ['Windows', 'Ubuntu', 'Centos', 'Redhat', 'Mac OS'];
  serveurList : string[]= ['Appache','JBOSS','IIS','Oracle Forms']



  constructor(private SystemeMachine: GestionSystemeMachineService, private PAppsS: GestionProduitApplicationService, private PFEService: GestionPlateFormeService, private ajoutService: GestionDemandeClientsService, private notificationService: NotificationService,
    private dialogService: DialogService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AjouterClientComponent>) { }

  ngOnInit() {
    this.onCloseOnlickEchap();
    this.RemplirListPFA();
    this.RemplirListProdApp();
    this.RemplirListeMachineSystem();
    this.remplierType();    
  }


  remplierType() {
    this.TypeDemande = [
      { id: "1", type: 'SAAS' }, { id: "2", type: 'PAAS' }, { id: "3", type: 'IAAS' }]

  }
  RemplirListProdApp() {
    let resp2 = this.PAppsS.ListerProduitApplicatione();
    resp2.subscribe(res => {
      this.ProduitApplicationLists = res;
    })
  }

  RemplirListeMachineSystem() {
    let resp = this.SystemeMachine.ListeSystemeMachine();
    resp.subscribe(res => {
      this.SystemeMachineApp = res;
    })
  }

  RemplirListPFA() {
    let resp = this.PFEService.ListerTousPlateFormeLogicielle();
    resp.subscribe(res => {
      this.plateFormeLogicielleLists = res;
    }
    )
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
    this.dialogRef.close();
  }


  form: FormGroup = new FormGroup({
    type: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    date_Debut: new FormControl('', [Validators.required]),
    systemeMachine: new FormControl('', [Validators.required]),
    date_Fin: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    ram_Form: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    cpu_Form:new FormControl('', [Validators.required, Validators.maxLength(8)]),
    disqueForm:new FormControl('', [Validators.required, Validators.maxLength(8)]),
    nomSer:new FormControl('', [Validators.required, Validators.maxLength(8)]),
    versionForm:new FormControl('', [Validators.required, Validators.maxLength(8)]),
    
  });



  initializeFormGroup() {
    this.form.setValue({
      type: '',
      date_Debut: '',
      date_Fin: '',
      ram_Form:'',
      cpu_Form:'',
      disqueForm:'',
      nomSer:'',
      versionForm:'',
    });
  }

  AjouterDemandeClient() {
    const id = localStorage.getItem('id');
    this.ajoutService.getClientId(id).subscribe(res => {
      this.client = res;
      const demandeClient = {
        typeService: this.form.get('type').value,
        date_Debut: this.form.get('date_Debut').value,
        date_Fin: this.form.get('date_Fin').value,
        systemeMachine: this.selectedOS,
        plareFormeLogicielleList: this.plateFormeLogicielleLists,
        produitApplications: this.ProduitApplicationLists,
        client: this.client,
        os:this.osForm.value,
        ram:this.form.get('ram_Form').value,
        cpu:this.form.get('cpu_Form').value,
        disque:this.form.get('disqueForm').value,
        nom:this.form.get('nomSer').value,
        version:this.form.get('versionForm').value,
        serveur:this.serveurForm.value
      }
      
       this.ajoutService.AjouterDemandeClient(demandeClient).subscribe(res => {
        this.submitted = true
        this.DisplayAndClose();
      })

    }
    )


  }
}
