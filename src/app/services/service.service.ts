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
  updateUserUrl = 'http://localhost:3000/admin/adminUserUpdate/'
  deleteUrl = 'http://localhost:3000/admin/adminUserDelete/'

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

  adminAddUser(data: userModel): Observable<userModel> {
    return this.http.post<userModel>(this.apiUrl, data)
  }

  putUser(data: any, id: number): Observable<any> {
    console.log("this is id", id);
    
    return this.http.put<any>(this.updateUserUrl + id, data)
  } 

  deleteUser(id:number): Observable<any> {
    return this.http.delete<any>(this.deleteUrl + id)
  }
}
