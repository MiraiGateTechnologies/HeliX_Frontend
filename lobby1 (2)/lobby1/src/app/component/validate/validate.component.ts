import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../../service/token.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-validate',
  standalone: true,
  imports: [],
  templateUrl: './validate.component.html',
  styleUrl: './validate.component.css'
})
export class ValidateComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private navigateRoute: Router
  ) {

  }

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token')
    const providerId = this.route.snapshot.paramMap.get('providerId')
    const gameId = this.route.snapshot.paramMap.get('gameId')
    this.loginService.lobbyLogin(providerId, token)
      .subscribe({
        next: (res) => {
          this.tokenService.setToken(res.myToken)
          this.navigateRoute.navigate(["/game/" + gameId]).then(r =>
            console.log("navigate to "+gameId))
        },
        error: (e) => {
          if (e.status==0){
            this.toaster.error("Network error: Unable to reach the server. Please try again later.", "", { timeOut: 4000 });
          }
          if (e.status == 400) {
            this.toaster.error(e.error.error, "", {timeOut: 2000})
          }


        }
      })
  }

}
