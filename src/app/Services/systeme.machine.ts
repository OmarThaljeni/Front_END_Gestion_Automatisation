
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api_ListeSystemeMachine = 'http://localhost:8081/ISIPFE/ListeSystemeMachine'

const apiSupprimerSystemeMachine = 'http://localhost:8081/ISIPFE/SupprimerSystemeMachine'

const api_AjouterSystemeMachine = 'http://localhost:8081/ISIPFE/AjouterSystemeMachine'

const api_ModifierSystemeMachine= 'http://localhost:8081/ISIPFE/ModifierSystemeMachine'




@Injectable({
  providedIn: 'root'
})
export class GestionSystemeMachineService {

  constructor(private http: HttpClient) { }



  ListeSystemeMachine() {
    return this.http.get(api_ListeSystemeMachine);
  }

  SupprimerSystemeMachine(id): Observable<any> {
    return this.http.delete(`${apiSupprimerSystemeMachine}/${id}`);
  }

  AjouteSystemeMachine(SystemeM): Observable<any> {
    return this.http.post(api_AjouterSystemeMachine, SystemeM);
  }


  ModifierSystemeMachine(id,PApp): Observable<any> {
    return this.http.put(`${api_ModifierSystemeMachine}/${id}`,PApp);
  }

 

}
