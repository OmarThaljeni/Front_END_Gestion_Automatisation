
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { DemandeClient } from 'src/app/Models/DemandeClients';
import { plateFormeLogicielle } from 'src/app/Models/PlateFormeLog';
import { ProduitApplications } from 'src/app/Models/ProduitApplications';
import { AuthentificationService } from 'src/app/Services/authentification.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { GestionDemandeClientsService } from 'src/app/Services/gestion_demande_client.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-liste-demande-client',
  templateUrl: './liste-demande-client.component.html',
  styleUrls: ['./liste-demande-client.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],


})
export class ListeDemandeClientComponent implements OnInit {

  Tab_PFLog: plateFormeLogicielle[];
  ELEMENT_DATA: DemandeClient[];

  displayedColumns: string[] = ['type', 'date_Debut', 'date_Fin', 'client', 'etat', 'ram', 'cpu', 'disque', 'nom', 'version', 'actions'];
  dataSource = new MatTableDataSource<DemandeClient>();
  innerDisplayedColumns = ['nomPFA', 'nbPFA'];
  expandedElement: DemandeClient | null;

  usersData: DemandeClient[] = [];


  constructor(public authService: AuthentificationService, private gestiondemandeClientService: GestionDemandeClientsService, private dialog: MatDialog, private notificationService: NotificationService, private dialogService: DialogService, private changeDetectorRefs: ChangeDetectorRef) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<plateFormeLogicielle>>;

  searchKey: string;

  @ViewChild('mainTablePaginator', { static: true }) mainTablePaginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadExpandElement() {
    this.dataSource.data.forEach(demandeA => {
      if (demandeA.plareFormeLogicielleList && Array.isArray(demandeA.plareFormeLogicielleList) && demandeA.plareFormeLogicielleList.length) {
        this.usersData = [...this.usersData, { ...demandeA, plareFormeLogicielleList: new MatTableDataSource(demandeA.plareFormeLogicielleList) }];
      } else {
        this.usersData = [...this.usersData, demandeA];
      }
    });
    this.dataSource = new MatTableDataSource(this.usersData);
    this.dataSource.sort = this.sort;
  }

  toggleRow(demande: DemandeClient) {

    demande.plareFormeLogicielleList && (demande.plareFormeLogicielleList as MatTableDataSource<plateFormeLogicielle>).data.length ? (this.expandedElement = this.expandedElement === demande ? null : demande) : null;
    this.changeDetectorRefs.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<plateFormeLogicielle>).sort = this.innerSort.toArray()[index]);
  }

  ngOnInit() {
    this.listerListeDemandeClients();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }



  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  AccepterDemande(row) {

    this.dialogService.openConfirmDialoAcceptatin("Vous étes sur d'accepter cette demande client ?")
      .afterClosed().subscribe(res => {
        if (row.etat === "Etat0") {
          if (res) {
            const demande = {
              etat: "En attente"
            }
            let resp = this.gestiondemandeClientService.traiterDclient(row.id, demande);
            resp.subscribe(res => {
              this.listerListeDemandeClientUp();
              this.loadExpandElement();
            })
          }

        } else if (row.etat === "En attente") {
          if (res) {
            const demande = {
              etat: "Accepté"
            }
            let resp = this.gestiondemandeClientService.traiterDclient(row.id, demande);
            resp.subscribe(res => {
              this.listerListeDemandeClientUp();
              this.loadExpandElement();
            })
          }
        }
      });

  }



  RefuserDemandes(row) {

    this.dialogService.openConfirmDialoAcceptatin("Vous étes sur de réfuser cette demande client ?")
      .afterClosed().subscribe(res => {
        if (res) {
          const demande = {
            etat: "Refusé"
          }
          let resp = this.gestiondemandeClientService.traiterDclient(row.id, demande);
          resp.subscribe(res => {
            this.listerListeDemandeClientUp();
            this.loadExpandElement();

          })
        }
      });

  }



  listerListeDemandeClientUp() {
    let resp = this.gestiondemandeClientService.ListerTousDemandeClients();
    resp.subscribe(
      response => {
        this.dataSource.data = response as DemandeClient[];
        this.changeDetectorRefs.detectChanges();

      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));

      });
  }



  listerListeDemandeClients() {
    let resp = this.gestiondemandeClientService.ListerTousDemandeClients();
    resp.subscribe(
      response => {
        this.dataSource.data = response as DemandeClient[];
        this.changeDetectorRefs.detectChanges();
        this.loadExpandElement();

      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));

      });
  }




  supprimerDemandeClient(row) {
    if (row.etat === "En attente") {
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
    else {
      this.notificationService.warn("!! Cette demande est tratié! vous n'avez pas le droit de supprimer")
    }

  }



}
