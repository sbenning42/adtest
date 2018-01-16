import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AnnexesProvider } from '../annexes/annexes';
import { baseApi } from '../../api/api';
import { HttpProvider } from '../http/http';
import { User } from '../../models/user'

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private _user: User;
  private set user(user: User) {
    this._user = user;
    this.user$.next(this.user);
  }

  private _token: string;
  private set token(token) {
    this._token = token;
    console.log('nexting: ' + this.isLogged());
    this.isLogged$.next(this.isLogged());
  }

  private _admin: number;
  private set admin(admin) {
    this._admin = admin;
    this.isAdmin$.next(this.isAdmin());
  }

  private user$: BehaviorSubject<User>;
  private isLogged$: BehaviorSubject<boolean>;
  private isAdmin$: BehaviorSubject<boolean>;

  constructor(public http: HttpProvider, private annexe: AnnexesProvider) {
    this.user$ = new BehaviorSubject(this._user);
    this.isLogged$ = new BehaviorSubject(this.isLogged());
    this.isAdmin$ = new BehaviorSubject(this.isAdmin());
    this.initFromScratch();
    console.log('Hello AuthProvider Provider');
  }

  isLogged(): boolean {
    return this._token ? true : false;
  }

  isAdmin(): boolean {
    return this._admin ? true : false;
  }

  userId() {
    return this._user.id;
  }

  isLoggedStream(): Observable<boolean> {
    return this.isLogged$.asObservable();
  }

  isAdminStream(): Observable<boolean> {
    return this.isAdmin$.asObservable();
  }

  getUser() {
    return this.user$.asObservable();
  }

  initFromScratch() {
    const token = localStorage.getItem('token');
    const admin = +localStorage.getItem('admin');
    this.user = undefined;
    if (token !== undefined && admin !== undefined) {
      this.token = token;
      this.admin = admin;
      this.annexe.fetch();
    } else {
      this.logout();
    }
  }

  init(token, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('admin', (+user.role_id === 1 ? '1' : ''));
    this.user = user;
    this.token = token;
    this.admin = +user.role_id === 1;
    this.annexe.fetch();
    this.user$.next(this._user);
    this.isLogged$.next(this.isLogged());
    this.isAdmin$.next(this.isAdmin());
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    this.user = undefined;
    this.token = undefined;
    this.admin = undefined;
  }

  login(user: User): Observable<any> {
    const endpoint = baseApi + '/login';
    return this.http.post(endpoint, user)
      .do(response => this.init(response.token, response.user));
  }

}
