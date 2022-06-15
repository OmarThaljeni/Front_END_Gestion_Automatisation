import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DemandeClient } from 'src/app/Models/DemandeClients';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionDemandeClientsService } from 'src/app/Services/gestion_demande_client.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { AjoutDemandeClientComponent } from '../ajout-demande-client/ajout-demande-client.component';

@Component({
  selector: 'app-table-demande-client',
  templateUrl: './table-demande-client.component.html',
  styleUrls: ['./table-demande-client.component.scss']
})
export class TableDemandeClientComponent implements OnInit {

  idClient: string;
  ELEMENT_DATA: DemandeClient[];
  displayedColumns: string[] = ['type', 'date_Debut', 'date_Fin', 'client', 'etat', 'ram', 'cpu', 'disque', 'nom', 'version', 'actions'];
  dataSource = new MatTableDataSource<DemandeClient>();


  constructor(private gestiondemandeClientService: GestionDemandeClientsService, private dialog: MatDialog, private notificationService: NotificationService, private dialogService: DialogService, private changeDetectorRefs: ChangeDetectorRef) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchKey: string;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit() {
    this.listerListeDemandeClients();
    this.getId();
  }


  getId() {
    const id = localStorage.getItem("id");
    this.idClient = id;
    console.log(this.idClient);

  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }



  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  AjouterDemandeClient() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.height = "85%";
    this.dialog.open(AjoutDemandeClientComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listerListeDemandeClients();
        }
      )

  }


  listerListeDemandeClients() {
    let resp = this.gestiondemandeClientService.ListerTousDemandeClients();
    resp.subscribe(
      response => {
        this.dataSource.data = response as DemandeClient[];
        this.changeDetectorRefs.detectChanges();
        console.log("response", response);

      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));

      });
  }




  supprimerDemandeClient(row) {

    this.dialogService.openConfirmDialog('Vous étes sur de supprimer ce demande ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.gestiondemandeClientService.SupprimerDemandeClient(row.id).subscribe(data => {
            this.dataSource.data = this.dataSource.data.filter(x => x.id !== row.id)
            this.notificationService.warn('! Supression effectué aves succeés');
          })

        }
      });


  }


}
