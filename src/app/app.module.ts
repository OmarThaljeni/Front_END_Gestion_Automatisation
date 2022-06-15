import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule, MatNativeDateModule} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter' 
import { Moment } from 'moment';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatConfirmDialogComponent } from './Components/mat-confirm-dialog/mat-confirm-dialog.component';
import { LoginComponent } from './Components/login/login.component';
import { AcceuilComponent } from './Components/acceuil/acceuil.component';
import { TableUsersComponent } from './Components/Gestion_des_utilisateurs/table-users/table-users.component';
import { AjoutUserComponent } from './Components/Gestion_des_utilisateurs/ajout-user/ajout-user.component';
import { ModifierUserComponent } from './Components/Gestion_des_utilisateurs/modifier-user/modifier-user.component';
import { InscrireUserComponent } from './Components/Gestion_des_utilisateurs/inscrire-user/inscrire-user.component';
import { TableClientComponent } from './Components/Gestion_Des_Clients/table-client/table-client.component';
import { AjouterClientComponent } from './Components/Gestion_Des_Clients/ajouter-client/ajouter-client.component';
import { ModifierClientComponent } from './Components/Gestion_Des_Clients/modifier-client/modifier-client.component';
import { TableDemandeClientComponent } from './Components/Gestion_Des_Demandes_Clients/table-demande-client/table-demande-client.component';
import { AjoutDemandeClientComponent } from './Components/Gestion_Des_Demandes_Clients/ajout-demande-client/ajout-demande-client.component';
import { ModifierDemandeClientComponent } from './Components/Gestion_Des_Demandes_Clients/modifier-demande-client/modifier-demande-client.component';
import { TablePlateFormeComponent } from './Components/Gestion_PlateFormeLogicielle/table-plate-forme/table-plate-forme.component';
import { ModifierPlateFormeComponent } from './Components/Gestion_PlateFormeLogicielle/modifier-plate-forme/modifier-plate-forme.component';
import { TableProduitAppsComponent } from './Components/Gestion_Produit_Application/table-produit-apps/table-produit-apps.component';
import { ModifierProduitAppsComponent } from './Components/Gestion_Produit_Application/modifier-produit-apps/modifier-produit-apps.component';
import { AjoutePlateFormeComponent } from './Components/Gestion_PlateFormeLogicielle/ajoute-plate-forme/ajoute-plate-forme.component';
import { AjouteProduitAppsComponent } from './Components/Gestion_Produit_Application/ajouter-produit-apps/ajoute-produit-application.component';
import { AjouterSystemeMComponent } from './Components/Gestion_Des_Systeme_Machines/ajouter-systeme-m/ajouter-systeme-m.component';
import { TableSystemeMComponent } from './Components/Gestion_Des_Systeme_Machines/table-systeme-m/table-systeme-m.component';
import { ModifierSystemeMComponent } from './Components/Gestion_Des_Systeme_Machines/modifier-systeme-m/modifier-systeme-m.component';
import { ListeDemandeClientComponent } from './Components/Gestion_Des_Demandes_Clients/liste-demande-client/liste-demande-client.component';
import { GestionStatsComponent } from './Components/gestion-stats/gestion-stats.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { ListeIaasComponent } from './Components/Gestion_Des_Clients/Gestion_des_offres/IAAS/liste-iaas/liste-iaas.component';
import { AjouterIaasComponent } from './Components/Gestion_Des_Clients/Gestion_des_offres/IAAS/ajouter-iaas/ajouter-iaas.component';
import { ModifierIaasComponent } from './Components/Gestion_Des_Clients/Gestion_des_offres/IAAS/modifier-iaas/modifier-iaas.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MatConfirmDialogComponent,
    AcceuilComponent,
    TableUsersComponent,
    AjoutUserComponent,
    TableClientComponent,
    AjouterClientComponent,
    ModifierClientComponent,
    ModifierUserComponent,
    InscrireUserComponent,
    TableDemandeClientComponent,
    AjoutDemandeClientComponent,
    ModifierDemandeClientComponent,
    TablePlateFormeComponent,
    ModifierPlateFormeComponent,
    TableProduitAppsComponent,
    AjouteProduitAppsComponent,
    ModifierProduitAppsComponent,
    AjoutePlateFormeComponent,
    AjouterSystemeMComponent,
    TableSystemeMComponent,
    ModifierSystemeMComponent,
    ListeDemandeClientComponent,
    GestionStatsComponent,
    ListeIaasComponent,
    AjouterIaasComponent,
    ModifierIaasComponent,
    
  
   
  ],
  imports: [
    BrowserModule,
    MatNativeDateModule,
    DragDropModule,
    AppRoutingModule,
    ChartsModule,
    MatDialogModule,
    MatMomentDateModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent],
  entryComponents:[AjouterSystemeMComponent,AjouterIaasComponent,ModifierIaasComponent,ModifierSystemeMComponent,AjouteProduitAppsComponent,ModifierProduitAppsComponent,ModifierPlateFormeComponent ,AjoutePlateFormeComponent,MatConfirmDialogComponent, AjoutDemandeClientComponent,ModifierClientComponent ,AjoutUserComponent,AjouterClientComponent,ModifierClientComponent ,ModifierUserComponent, InscrireUserComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
