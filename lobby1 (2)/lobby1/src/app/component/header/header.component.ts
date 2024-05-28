import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  activeMenusbar: boolean = false;
  profileCardActive: boolean = false;
  user: any = null;  // You can pass this as an @Input() if needed

  constructor(private router: Router) {
  }

  doLogout() {
    // TokenService logic should be adjusted for Angular. This is a placeholder.
    // Assuming you have a service to handle token removal and navigation
    // TokenService.removeToken();
    this.router.navigate(['/luxcasino/login']);
  }

  toggleSidebar() {
    this.activeMenusbar = !this.activeMenusbar
  }
}
