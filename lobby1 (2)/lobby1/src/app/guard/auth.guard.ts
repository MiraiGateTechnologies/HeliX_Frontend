import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.authService.getToken();
    
    if (token) {
      return true;
    }
    this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});
    return false;
  }

}

