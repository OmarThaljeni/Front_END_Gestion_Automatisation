import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const login = 'http://localhost:8081/ISIPFE/sign-in'



@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http : HttpClient, private router : Router) { }


  getRoles(): string{
    let role = localStorage.getItem('roles');
    return role;
  }


  isLoggedIn(){
    let token = localStorage.getItem('token') || sessionStorage.getItem("token");
    if(token){
      return true
    }else{
      return false
    }
  }

  login(credentials) {
    return this.http.post(login,credentials);
  }

  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('roles');

  }


  getToken(): string {
    return localStorage.getItem('token');
  }
  
  



}
