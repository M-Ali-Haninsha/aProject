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
  getUserUrl = 'http://localhost:3000/getUser'
  updateUserUrl = 'http://localhost:3000/admin/adminUserUpdate'

  constructor(private http: HttpClient) { }

  addUser(user: userModel): Observable<userModel> {
    return this.http.post<userModel>(this.apiUrl, user);
  }

  login(user: userModel): Observable<userModel> {
    return this.http.post<userModel>(this.loginUrl, user)
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.getUserUrl)
  }

  putUser(data: any, id: number): Observable<any> {
    return this.http.put<any>(this.updateUserUrl + id, data)
  } 

}
