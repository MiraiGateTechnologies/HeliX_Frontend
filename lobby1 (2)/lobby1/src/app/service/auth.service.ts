import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private newAuthUri = 'https://o978ag6cfk.execute-api.ap-south-1.amazonaws.com/prod/casino/api/v1/catFish/user';
  private newAuthUri = 'https://miraigames.org/api/v1/catFish/user';


  onUserChange: BehaviorSubject<any>

  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) {
    this.onUserChange = new BehaviorSubject<any>(null)
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  getCurrentLobbyUser() {
    this.http.get(this.baseUrl + "/api/v1/catFish/user")
      .subscribe({
        next: (user) => {
          this.onUserChange.next(user)
        },
        error: (e) => {

        }
      })
  }

  getCurrentUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    });
    return this.http.get(this.newAuthUri, {headers: headers});
  }
}
