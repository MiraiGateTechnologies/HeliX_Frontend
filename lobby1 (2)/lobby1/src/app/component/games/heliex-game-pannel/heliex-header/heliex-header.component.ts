import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from '../../../../service/auth.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {IconClickService} from '../../../../service/shared.service';

@Component({
  selector: 'app-heliex-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heliex-header.component.html',
  styleUrl: './heliex-header.component.css'
})
export class HeliexHeaderComponent {
  hide: boolean = true;
  @Output() hideSideBar = new EventEmitter<void>();
  user: any = null;
  heliex
  showRules: boolean = false;

  constructor(private authService: AuthService, private router: Router, private sharedService: IconClickService) {
  }

  ngOnInit(): void {
    this.authService.getCurrentLobbyUser()
    this.authService.onUserChange.subscribe({
      next: (response) => {
        if (response != null) {
          this.user = response;
        }
      },
      error: (error: any) => {
        console.log(error);
        if (error.status === 500) {
        }
      }
    });
  }


  hideEvent() {
    this.hide = !this.hide;
    this.hideSideBar.emit();
    this.sharedService.hideSideBar.next()
  }

  notify(message: string): void {
    console.log(message);
  }

}
