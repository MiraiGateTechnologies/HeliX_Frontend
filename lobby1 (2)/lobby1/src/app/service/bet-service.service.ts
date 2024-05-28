import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class BetServiceService {
  private URI = 'https://bui8h16bv0.execute-api.ap-south-1.amazonaws.com/api/helix/bet';
  private uriPrefix = 'https://bui8h16bv0.execute-api.ap-south-1.amazonaws.com/api/helix';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getAllBetHistories(): Observable<any> {
    const config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenService.getToken()
      })
    };
    return this.http.get(`${this.URI}/currentbet-winers`, config);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getBetHistories(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()  // Ensure getToken() method is implemented
    });
    return this.http.get(`${this.URI}/allbethistories`, { headers });
  }

  getCurrentBetWinners(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    });
    return this.http.get(`${this.URI}/currentbet-winers`, { headers });
  }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken()
    });
  }

  getCurrentUser(uri: string): Observable<any> {
    return this.http.get(uri, { headers: this.getHeaders() });
  }

  postBetDetails(urlSuffix: string, betDetails: any): Observable<any> {
    return this.http.post(`${this.uriPrefix}/${urlSuffix}`, betDetails, { headers: this.getHeaders() });
  }

  getGameStatus(): Observable<any> {
    return this.http.get(`${this.uriPrefix}/game/getgame-status`, { headers: this.getHeaders() });
  }
}
