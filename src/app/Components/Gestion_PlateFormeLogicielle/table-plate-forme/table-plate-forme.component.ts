import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { plateFormeLogicielle } from 'src/app/Models/PlateFormeLog';
import { DialogService } from 'src/app/Services/dialog.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { GestionPlateFormeService } from 'src/app/Services/plate_forme.service';
import { AjoutePlateFormeComponent } from '../ajoute-plate-forme/ajoute-plate-forme.component';
import { ModifierPlateFormeComponent } from '../modifier-plate-forme/modifier-plate-forme.component';

@Component({
  selector: 'app-table-plate-forme',
  templateUrl: './table-plate-forme.component.html',
  styleUrls: ['./table-plate-forme.component.scss']
})
export class TablePlateFormeComponent implements OnInit {

  ELEMENT_DATA: plateFormeLogicielle[];
  displayedColumns: string[] = ['nomPFA', 'nbPFA','actions'];
  dataSource = new MatTableDataSource<plateFormeLogicielle>();


  constructor(private plateFormeService: GestionPlateFormeService, private dialog: MatDialog, private notificationService: NotificationService, private dialogService: DialogService, private changeDetectorRefs: ChangeDetectorRef) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchKey: string;

  ngOnInit() {
    this.listerPlateFormeLogicielle();
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

  listerPlateFormeLogicielle() {
    let resp = this.plateFormeService.ListerTousPlateFormeLogicielle();
    resp.subscribe(
      response => {
        this.dataSource.data = response as plateFormeLogicielle[];
        this.changeDetectorRefs.detectChanges();
      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));

      });
  }

  AjouterPFA() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "50%";
    this.dialog.open(AjoutePlateFormeComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listerPlateFormeLogicielle();
        }
      )

  }


  modifierPFA(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "50%";
    dialogConfig.data = row;
    this.dialog.open(ModifierPlateFormeComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listerPlateFormeLogicielle();
        }
      )

  }

  supprimerPFA(row) {

    this.dialogService.openConfirmDialog('Vous étes sur de supprimer cette plateforme ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.plateFormeService.SupprimerPlateFormeLogicielle(row.id).subscribe(data => {
            this.dataSource.data = this.dataSource.data.filter(x => x.id !== row.id)
            this.notificationService.warn('! Supression effectué aves succeés');
          })

        }
      });



    }

}
