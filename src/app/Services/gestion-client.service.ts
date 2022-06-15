
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api_liste_client = 'http://localhost:8081/ISIPFE/Liste_Client'

const suppClient = 'http://localhost:8081/ISIPFE/Supprimer_Client'

const api_Ajout_Client = 'http://localhost:8081/ISIPFE/Ajouter_Client'

const api_Modifier_Client= 'http://localhost:8081/ISIPFE/Modifier_Client'




@Injectable({
  providedIn: 'root'
})
export class GestionClientsService {

  constructor(private http: HttpClient) { }



  ListerTousClients() {
    return this.http.get(api_liste_client);
  }

  SupprimerClient(id): Observable<any> {
    return this.http.delete(`${suppClient}/${id}`);
  }

  AjouterClient(client): Observable<any> {
    return this.http.post(api_Ajout_Client, client);

  }


  ModifierClient(id,client): Observable<any> {
    return this.http.put(`${api_Modifier_Client}/${id}`,client);
  }



}
