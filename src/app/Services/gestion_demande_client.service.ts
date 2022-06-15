
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api_liste_demande_client = 'http://localhost:8081/ISIPFE/ListeDemandeClients'

const suppDemandeClient = 'http://localhost:8081/ISIPFE/Supprimer_Demande_Client'

const api_Ajout_demande_Client = 'http://localhost:8081/ISIPFE/AjoutetDemandeClient'

const api_Modifier_Client= 'http://localhost:8081/ISIPFE/Modifier_Demande_Client'

const api_getClientId= 'http://localhost:8081/ISIPFE/GetClientId'

const api_traiterDclient= 'http://localhost:8081/ISIPFE/TraiterDemande'

const api_nb_Demande= 'http://localhost:8081/ISIPFE/GetNBDemande'


const api_nb_DemandeAccepte= 'http://localhost:8081/ISIPFE/getNBDemandeAccepte'


@Injectable({
  providedIn: 'root'
})
export class GestionDemandeClientsService {

  constructor(private http: HttpClient) { }



  ListerTousDemandeClients() {
    return this.http.get(api_liste_demande_client);
  }

  SupprimerDemandeClient(id): Observable<any> {
    return this.http.delete(`${suppDemandeClient}/${id}`);
  }

  AjouterDemandeClient(client): Observable<any> {
    return this.http.post(api_Ajout_demande_Client, client);
  }


  ModifierDemandeClient(id,client): Observable<any> {
    return this.http.put(`${api_Modifier_Client}/${id}`,client);
  }

  getClientId(id): Observable<any> {
    return this.http.get(`${api_getClientId}/${id}`);
  }


  traiterDclient(id,demande): Observable<any> {
    return this.http.put(`${api_traiterDclient}/${id}`,demande);
  }

  GetNBDemande() {
    return this.http.get(api_nb_Demande);
  }
  
  GetNBDemandeAccepte() {
    return this.http.get(api_nb_DemandeAccepte);
  }



}
