
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api_ListePlareFormeLogicielle = 'http://localhost:8081/ISIPFE/ListePlareFormeLogicielle'

const apiSupprimerPlareFormeLogicielle = 'http://localhost:8081/ISIPFE/SupprimerPlareFormeLogicielle'

const api_AjoutPlareFormeLogicielle = 'http://localhost:8081/ISIPFE/AjoutPlareFormeLogicielle'

const api_ModifierPlareFormeLogicielle= 'http://localhost:8081/ISIPFE/ModifierPlareFormeLogicielle'




@Injectable({
  providedIn: 'root'
})
export class GestionPlateFormeService {

  constructor(private http: HttpClient) { }



  ListerTousPlateFormeLogicielle() {
    return this.http.get(api_ListePlareFormeLogicielle);
  }

  SupprimerPlateFormeLogicielle(id): Observable<any> {
    return this.http.delete(`${apiSupprimerPlareFormeLogicielle}/${id}`);
  }

  AjouterPlateFormeLogicielle(plateF): Observable<any> {
    return this.http.post(api_AjoutPlareFormeLogicielle, plateF);
  }


  ModifierPlareFormeLogicielle(id,plateF): Observable<any> {
    return this.http.put(`${api_ModifierPlareFormeLogicielle}/${id}`,plateF);
  }

 

}
