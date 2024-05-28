import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heliex-top-bets-all',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heliex-top-bets-all.component.html',
  styleUrl: './heliex-top-bets-all.component.css'
})
export class HeliexTopBetsAllComponent {
  @Input() betHistories: any[] | null = null;

}
