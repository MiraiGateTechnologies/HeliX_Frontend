import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private uriPrefix = 'https://miraigames.org/api/v1';
  private _user = new BehaviorSubject<any>(null);
  public user = this._user.asObservable();

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getCurrentUser(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    });

    this.http.get(`${this.uriPrefix}/catFish/user`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching user:', error);
          return throwError(error);
        })
      )
      .subscribe((response: any) => {
        if (response) {
          this._user.next(response);
        } else {
          console.error('User not found');
        }
      });
  }
}
