import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SystemeMachine } from 'src/app/Models/SystemeMachine';
import { DialogService } from 'src/app/Services/dialog.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { GestionSystemeMachineService } from 'src/app/Services/systeme.machine';
import { AjouterSystemeMComponent } from '../ajouter-systeme-m/ajouter-systeme-m.component';
import { ModifierSystemeMComponent } from '../modifier-systeme-m/modifier-systeme-m.component';

@Component({
  selector: 'app-table-systeme-m',
  templateUrl: './table-systeme-m.component.html',
  styleUrls: ['./table-systeme-m.component.scss']
})
export class TableSystemeMComponent implements OnInit {

  ELEMENT_DATA: SystemeMachine[];
  displayedColumns: string[] = ['osSM', 'versionSM', 'adresseIPSM', 'ramSM', 'cpuSM','disqueSM' ,'actions'];
  dataSource = new MatTableDataSource<SystemeMachine>();


  constructor(private gestionsystemeMachine: GestionSystemeMachineService, private dialog: MatDialog, private notificationService: NotificationService, private dialogService: DialogService, private changeDetectorRefs: ChangeDetectorRef) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchKey: string;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit() {

    this.listerSystemMachine();
  }

  listerSystemMachine()
  {
    let resp = this.gestionsystemeMachine.ListeSystemeMachine();
    resp.subscribe(
      response => {
        this.dataSource.data = response as SystemeMachine[];
        this.changeDetectorRefs.detectChanges();

      },
      error => {
        console.log(error);
        console.log('request header: ' + error.headers.get('Authorization'));

      });
   }
  



  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }



  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  AjouterSystemeMachine() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "70%";
     this.dialog.open(AjouterSystemeMComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listerSystemMachine();
        }
      ) 

  }

  ModifierSystemeM(row)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data=row;
    dialogConfig.width = "50%";
    dialogConfig.height = "70%";
     this.dialog.open(ModifierSystemeMComponent, dialogConfig)
      .afterClosed().subscribe(
        res => {
          this.listerSystemMachine();
        }
      ) 
  }

  SupprimerSystemeM(row)
  {

      this.dialogService.openConfirmDialog('Vous étes sur de supprimer ce demande ?')
        .afterClosed().subscribe(res => {
          if (res) {
            this.gestionsystemeMachine.SupprimerSystemeMachine(row.id).subscribe(data => {
              this.dataSource.data = this.dataSource.data.filter(x => x.id !== row.id)
              this.notificationService.warn('! Supression effectué aves succeés');
            })
  
          }
        });
  
  
      
  }

  }

