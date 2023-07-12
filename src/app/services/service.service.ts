import { Injectable } from '@angular/core';
import userModel from '../models/userModel'
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http'




@Injectable({
  providedIn: 'root'
})
export class ServiceService {
   apiUrl = `http://localhost:3000/signUp  `
   loginUrl = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  addUser(user: userModel): Observable<userModel> {
    return this.http.post<userModel>(this.apiUrl, user);
  }

  login(user: userModel): Observable<userModel> {
    return this.http.post<userModel>(this.loginUrl, user)
  }


}
