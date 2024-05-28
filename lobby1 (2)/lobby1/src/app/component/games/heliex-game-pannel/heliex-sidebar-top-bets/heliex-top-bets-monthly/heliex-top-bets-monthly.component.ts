import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heliex-top-bets-monthly',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heliex-top-bets-monthly.component.html',
  styleUrl: './heliex-top-bets-monthly.component.css'
})
export class HeliexTopBetsMonthlyComponent {
  @Input() allBetHistories: any[] | null = null;
  monthlyTopBets: any[] = [];

  ngOnInit(): void {
    // Get current month
    const currentMonth = new Date().getMonth();

    // Filter monthly top 50 bets
    if (this.allBetHistories) {
      this.monthlyTopBets = this.allBetHistories.filter((history) => {
        const betWinTime = new Date(history.WiningTime);
        return currentMonth === betWinTime.getMonth();
      });
    }
  }
}
