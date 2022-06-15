import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IAAS } from 'src/app/Models/IAAS';
import { DialogService } from 'src/app/Services/dialog.service';
import { IaasService } from 'src/app/Services/iaas.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { AjouterIaasComponent } from '../ajouter-iaas/ajouter-iaas.component';
import { ModifierIaasComponent } from '../modifier-iaas/modifier-iaas.component';

@Component({
  selector: 'app-liste-iaas',
  templateUrl: './liste-iaas.component.html',
  styleUrls: ['./liste-iaas.component.scss']
})
export class ListeIaasComponent implements OnInit {

  ELEMENT_DATA: IAAS[];
  displayedColumns: string[] = ['type', 'os','ram','cpu','disque','tech','actions'];
  dataSource = new MatTableDataSource<IAAS>();


  constructor(private iaasService: IaasService, private dialog: MatDialog, private notificationService: NotificationService, private dialogService: DialogService, private changeDetectorRefs: ChangeDetectorRef) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchKey: string;

  ngOnInit() {
    this.listeIAAS();
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

  listeIAAS() {
    let resp = this.iaasService.ListerTousIAAS();
    resp.subscribe(
      response => {
        this.dataSource.data = response as IAAS[];
        this.changeDetectorRefs.detectChanges();
      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));

      });
  }

  AjouterIAAS() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "70%";
    this.dialog.open(AjouterIaasComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listeIAAS();
        }
      )

  }


  modifierIAAS(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "50%";
    dialogConfig.data = row;
    this.dialog.open(ModifierIaasComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listeIAAS();
        }
      )

  }

  supprimerIAAS(row) {

    this.dialogService.openConfirmDialog('Vous étes sur de supprimer cette service ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.iaasService.SupprimerIAAS(row.id).subscribe(data => {
            this.dataSource.data = this.dataSource.data.filter(x => x.id !== row.id)
            this.notificationService.warn('! Supression effectué aves succeés');
          })

        }
      });



    }


}
