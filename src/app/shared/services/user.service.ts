import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, pipe } from 'rxjs';
import { Credentials, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$ = new Subject<User|null>();
  constructor() { }

  setUser(credentials?: Credentials): void {
    if (credentials) {
      localStorage.setItem('name', credentials.name);
      localStorage.setItem('email', credentials.email);
      localStorage.setItem('isDataProvided', 'true');
    } else {
      localStorage.setItem('isDataProvided', 'false');
    }
  }

  isLogged(): boolean {
    return (localStorage.getItem('isDataProvided')) ? true : false;
  }

  getUser(): void {
    if (this.isLogged()) {
      this.user$.next({name: localStorage.getItem('name'), email: localStorage.getItem('email')});
    };
  }
}
