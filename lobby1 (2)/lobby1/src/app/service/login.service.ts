import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private uriPrefix = environment.apiUrl + "/api/v1"

  constructor(private http: HttpClient, private router: Router) {

  }

  lobbyLogin(providerId: string, token: string): Observable<any> {
    return this.http.post<any>(this.uriPrefix + '/auth/lobbyLogin',
      {providerId: providerId, token: token})
  }

  doLogin() {
    const logDetails = {
      userId: "root"
    };

    this.http.post<any>(`${this.uriPrefix}/auth/login`, logDetails)
      .subscribe({
        next: (response) => {
          console.log(response.token)
          if (response.token && response.token !== "") {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/'])
          } else {
            alert("Something went wrong");
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
