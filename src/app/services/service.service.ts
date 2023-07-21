import { Injectable } from '@angular/core';
import userModel from '../models/userModel'
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { tap } from 'rxjs/operators';
import { deleteUserSuccess } from '../../app/adminComponents/states/user.actions';
import { Store } from '@ngrx/store';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  userHomeUrl = `http://localhost:3000/userHomeData  `
  apiUrl = `http://localhost:3000/signUp  `
  loginUrl = 'http://localhost:3000/'
  getUserUrl = 'http://localhost:3000/getUser'
  updateUserUrl = 'http://localhost:3000/admin/adminUserUpdate/'
  deleteUrl = 'http://localhost:3000/admin/adminUserDelete/'
  adminLoginUrl = 'http://localhost:3000/admin/adminLogin'

  constructor(private http: HttpClient, private store: Store) { }

  addUser(user: userModel): Observable<userModel> {
    return this.http.post<userModel>(this.apiUrl, user);
  }

  login(user: userModel): Observable<userModel> {
    return this.http.post<userModel>(this.loginUrl, user)
  }

  adminLogin(admin: any): Observable<any> {
    return this.http.post<any>(this.adminLoginUrl, admin)
  }

  getUsers(): Observable<any> {
    const item = localStorage.getItem('adminValue');
    const token = item ? JSON.parse(item).token : null; 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.getUserUrl, requestOptions)
  }

  adminAddUser(data: userModel): Observable<userModel> {
    return this.http.post<userModel>(this.apiUrl, data)
  }

  putUser(data: any, id: number): Observable<any> {    
    const item = localStorage.getItem('adminValue');
    const token = item ? JSON.parse(item).token : null; 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.put<any>(this.updateUserUrl + id, data, requestOptions)
  } 

  deleteUser(id:any): Observable<any> {
    return this.http.delete<any>(this.deleteUrl + id).pipe(
      tap(() => {
        this.store.dispatch(deleteUserSuccess({ user: { _id: id } }));
      })
    );
  }

  userHomeData(): Observable<any> {
    const item = localStorage.getItem('userValue');
    const token = item ? JSON.parse(item).token : null; 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.userHomeUrl, requestOptions);
  }
}
