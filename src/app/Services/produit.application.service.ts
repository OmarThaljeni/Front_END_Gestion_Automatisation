
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api_ListeProduitApplication = 'http://localhost:8081/ISIPFE/ListerProduitApplication'

const apiSupprimerProduitApplication = 'http://localhost:8081/ISIPFE/SupprimerProduitApplication'

const api_AjouterProduitApplication = 'http://localhost:8081/ISIPFE/AjouterProduitApplication'

const api_ModifierProduitApplication= 'http://localhost:8081/ISIPFE/ModifierProduitApplication'




@Injectable({
  providedIn: 'root'
})
export class GestionProduitApplicationService {

  constructor(private http: HttpClient) { }



  ListerProduitApplicatione() {
    return this.http.get(api_ListeProduitApplication);
  }

  SupprimerProduitApplication(id): Observable<any> {
    return this.http.delete(`${apiSupprimerProduitApplication}/${id}`);
  }

  aAjouterProduitApplication(PApp): Observable<any> {
    return this.http.post(api_AjouterProduitApplication, PApp);
  }


  ModifierProduitApplication(id,PApp): Observable<any> {
    return this.http.put(`${api_ModifierProduitApplication}/${id}`,PApp);
  }

 

}
