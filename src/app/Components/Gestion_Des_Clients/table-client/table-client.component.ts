import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Client } from 'src/app/Models/Clients';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionClientsService } from 'src/app/Services/gestion-client.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { AjouterClientComponent } from '../ajouter-client/ajouter-client.component';
import { ModifierClientComponent } from '../modifier-client/modifier-client.component';

@Component({
  selector: 'app-table-client',
  templateUrl: './table-client.component.html',
  styleUrls: ['./table-client.component.scss']
})
export class TableClientComponent implements OnInit {

  ELEMENT_DATA: Client[];
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'adresse', 'numTel','dateNaissance' ,'role','actions'];
  dataSource = new MatTableDataSource<Client>();


  constructor(private gestionClientService: GestionClientsService, private dialog: MatDialog, private notificationService: NotificationService, private dialogService: DialogService, private changeDetectorRefs: ChangeDetectorRef) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchKey: string;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit() {

    this.listerListeClients();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }



  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  AjouterClient() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "55%";
    dialogConfig.height = "78%";
     this.dialog.open(AjouterClientComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listerListeClients();
        }
      ) 

  }


  ModifierClient(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "55%";
    dialogConfig.height = "78%";
    dialogConfig.data = row;
     this.dialog.open(ModifierClientComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listerListeClients();
        }
      )
  }


  listerListeClients() {
     let resp = this.gestionClientService.ListerTousClients();
    resp.subscribe(
      response => {
        this.dataSource.data = response as Client[];
        this.changeDetectorRefs.detectChanges();

      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));

      });
   }


   supprimerClient(row) {

    this.dialogService.openConfirmDialog('Vous étes sur de supprimer ce utilisateur ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.gestionClientService.SupprimerClient(row.id).subscribe(data => {
            this.dataSource.data = this.dataSource.data.filter(x => x.id !== row.id)
            this.notificationService.warn('! Supression effectué aves succeés');
          })

        }
      });





  }


}
