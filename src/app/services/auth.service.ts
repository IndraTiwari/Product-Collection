import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticate: boolean = false;

  public isLoggedIn(): boolean {
    const username = localStorage.getItem('username');
    // return  !!username

    if (username) {
      this.isAuthenticate = true;
      return this.isAuthenticate;
    } else {
      this.isAuthenticate = false;
      return this.isAuthenticate;
    }
  }
}
