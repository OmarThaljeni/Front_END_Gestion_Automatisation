
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const liste_Users = 'http://localhost:8081/ISIPFE/Liste_Users'

const suppUser = 'http://localhost:8081/ISIPFE/Supprimer_User'

const api_Ajout_User = 'http://localhost:8081/ISIPFE/Ajouter_User'

const api_Modifier_User = 'http://localhost:8081/ISIPFE/Modifier_User'

const api_register = 'http://localhost:8081/ISIPFE/Ajouter_Client'

const api_getUserId= 'http://localhost:8081/ISIPFE/GetUserById'



@Injectable({
  providedIn: 'root'
})
export class GestionUsersService {

  constructor(private http: HttpClient) { }



  ListerTousUsers() {
    return this.http.get(liste_Users);
  }

  SupprimerUser(id): Observable<any> {
    return this.http.delete(`${suppUser}/${id}`);
  }

  AjouterUser(user): Observable<any> {
    return this.http.post(api_Ajout_User, user);

  }
  

  getUserById(id): Observable<any> {
    return this.http.get(`${api_getUserId}/${id}`);
  }


  ModifierUser(id,utilisateur): Observable<any> {
    return this.http.put(`${api_Modifier_User}/${id}`,utilisateur);
  }


  RegisterUser(user): Observable<any> {
    return this.http.post(api_register, user);

  }



}
