import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heliex-top-bets-daily',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heliex-top-bets-daily.component.html',
  styleUrl: './heliex-top-bets-daily.component.css'
})
export class HeliexTopBetsDailyComponent {
  @Input() allBetHistories: any[] | null = null;
  dailyTopBets: any[] = [];

  ngOnInit(): void {
    // Get current date
    const currentDayDate = new Date().getDate();
    console.warn("current" + currentDayDate);

    // Filter data based on current day date
    if (this.allBetHistories) {
      this.dailyTopBets = this.allBetHistories.filter((history) => {
        const historyDate = new Date(history.WiningTime);
        return currentDayDate === historyDate.getDate();
      });
    }
  }
}
