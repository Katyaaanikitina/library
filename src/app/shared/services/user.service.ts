import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, pipe } from 'rxjs';
import { Credentials, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  setUser(credentials?: Credentials): void {
    (credentials) ? localStorage.setItem('user', JSON.stringify(credentials))
                  : localStorage.setItem('user', JSON.stringify({isDataProvided: false}));
  }

  isLogged(): boolean {
    return (localStorage.getItem('user')) ? true : false;
  }

  getUser(): any {
    if (this.isLogged()) return localStorage.getItem('user');
  }
}
