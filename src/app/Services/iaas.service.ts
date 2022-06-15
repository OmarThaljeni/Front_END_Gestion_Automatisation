import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api_liste_IAAS = 'http://localhost:8081/ISIPFE/RecupererListeIAASService'

const api_supp_IAAS = 'http://localhost:8081/ISIPFE/SupprimerIAAS'

const api_ajout_IAAS = 'http://localhost:8081/ISIPFE/AjouterIAAS'

const api_modifier_IAAS= 'http://localhost:8081/ISIPFE/ModifierIAAS'


@Injectable({
  providedIn: 'root'
})


export class IaasService {

  constructor(private http: HttpClient) { }


  ListerTousIAAS() {
    return this.http.get(api_liste_IAAS);
  }

  SupprimerIAAS(id): Observable<any> {
    return this.http.delete(`${api_supp_IAAS}/${id}`);
  }

  AjouteRIAAS(iaas): Observable<any> {
    return this.http.post(api_ajout_IAAS, iaas);

  }


  ModifierIAAS(id,iaas): Observable<any> {
    return this.http.put(`${api_modifier_IAAS}/${id}`,iaas);
  }
}
