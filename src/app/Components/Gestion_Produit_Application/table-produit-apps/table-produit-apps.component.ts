import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProduitApplications } from 'src/app/Models/ProduitApplications';
import { DialogService } from 'src/app/Services/dialog.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { GestionProduitApplicationService } from 'src/app/Services/produit.application.service';
import { AjouteProduitAppsComponent } from '../ajouter-produit-apps/ajoute-produit-application.component';
import { ModifierProduitAppsComponent } from '../modifier-produit-apps/modifier-produit-apps.component';

@Component({
  selector: 'app-table-produit-apps',
  templateUrl: './table-produit-apps.component.html',
  styleUrls: ['./table-produit-apps.component.scss']
})
export class TableProduitAppsComponent implements OnInit {

  ELEMENT_DATA: ProduitApplications[];
  displayedColumns: string[] = ['nomAPP', 'versionApp','actions'];
  dataSource = new MatTableDataSource<ProduitApplications>();


  constructor(private PAppsService: GestionProduitApplicationService, private dialog: MatDialog, private notificationService: NotificationService, private dialogService: DialogService, private changeDetectorRefs: ChangeDetectorRef) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchKey: string;

  ngOnInit() {
    this.listerPApps();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  listerPApps() {
    let resp = this.PAppsService.ListerProduitApplicatione();
    resp.subscribe(
      response => {
        this.dataSource.data = response as ProduitApplications[];
        this.changeDetectorRefs.detectChanges();
      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));

      });
  }

  AjouterPApps() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "50%";
    this.dialog.open(AjouteProduitAppsComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listerPApps();
        }
      )

  }


  modifierPApps(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "50%";
    dialogConfig.data = row;
    this.dialog.open(ModifierProduitAppsComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listerPApps();
        }
      )

  }

  supprimerPApps(row) {

    this.dialogService.openConfirmDialog('Vous étes sur de supprimer ce produit application ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.PAppsService.SupprimerProduitApplication(row.id).subscribe(data => {
            this.dataSource.data = this.dataSource.data.filter(x => x.id !== row.id)
            this.notificationService.warn('! Supression effectué aves succeés');
          })

        }
      });



    }
}
