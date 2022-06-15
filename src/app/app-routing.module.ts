import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceuilComponent } from './Components/acceuil/acceuil.component';
import { TableUsersComponent } from './Components/Gestion_des_utilisateurs/table-users/table-users.component';
import { LoginComponent } from './Components/login/login.component';
import { AjoutUserComponent } from './Components/Gestion_des_utilisateurs/ajout-user/ajout-user.component';
import { TableClientComponent } from './Components/Gestion_Des_Clients/table-client/table-client.component';
import { TableDemandeClientComponent } from './Components/Gestion_Des_Demandes_Clients/table-demande-client/table-demande-client.component';
import { TablePlateFormeComponent } from './Components/Gestion_PlateFormeLogicielle/table-plate-forme/table-plate-forme.component';
import { TableProduitAppsComponent } from './Components/Gestion_Produit_Application/table-produit-apps/table-produit-apps.component';
import { TableSystemeMComponent } from './Components/Gestion_Des_Systeme_Machines/table-systeme-m/table-systeme-m.component';
import { ListeDemandeClientComponent } from './Components/Gestion_Des_Demandes_Clients/liste-demande-client/liste-demande-client.component';
import { LogInGuard } from './Services/log-in.guard';
import { AuthentificationGuard } from './Services/authentification.guard';
import { GestionStatsComponent } from './Components/gestion-stats/gestion-stats.component';
import { ListeIaasComponent } from './Components/Gestion_Des_Clients/Gestion_des_offres/IAAS/liste-iaas/liste-iaas.component';

const routes: Routes = [

  { path: '', redirectTo: '/ISIPFE/login',pathMatch:'full',canActivate:[LogInGuard] },

  {path:'ISIPFE' ,
    children:[
      { path: 'login', component:LoginComponent,canActivate:[LogInGuard] },
      { path: 'acceuil', component:AcceuilComponent,canActivate:[AuthentificationGuard]},
      { path: 'liste-users', component:TableUsersComponent,canActivate:[AuthentificationGuard]},
      { path: 'lite-demandes_clients', component:TableDemandeClientComponent,canActivate:[AuthentificationGuard]},
      { path: 'liste-clients', component:TableClientComponent,canActivate:[AuthentificationGuard]},
      { path: 'register-user', component:AjoutUserComponent,canActivate:[AuthentificationGuard]},
      { path: 'liste-plateFormeLogicielle', component:TablePlateFormeComponent,canActivate:[AuthentificationGuard]},
      { path: 'liste-produitApplication', component:TableProduitAppsComponent,canActivate:[AuthentificationGuard]},
      { path: 'liste-systemeMachine', component:TableSystemeMComponent,canActivate:[AuthentificationGuard]},
      { path: 'traiter-demandes-clients', component:ListeDemandeClientComponent,canActivate:[AuthentificationGuard]},
      { path: 'generate-stats', component:GestionStatsComponent,canActivate:[AuthentificationGuard]},
      { path: 'liste-iaas', component:ListeIaasComponent,canActivate:[AuthentificationGuard]},
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
