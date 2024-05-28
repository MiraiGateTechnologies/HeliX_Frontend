import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-heliex-top-bets-weekly',
  standalone: true,
  imports: [],
  templateUrl: './heliex-top-bets-weekly.component.html',
  styleUrl: './heliex-top-bets-weekly.component.css'
})
export class HeliexTopBetsWeeklyComponent implements OnInit{
  @Input() allBetHistories: any[]=[];
  weeklyTopBets: any[] = [];

  ngOnInit(): void {
    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0); // Set time to beginning of the day
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Go back to the start of the week (Sunday)
    
    const endOfWeek = new Date();
    endOfWeek.setHours(23, 59, 59, 999); // Set time to end of the day
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay())); // Go forward to the end of the week (Saturday)
    
    // Filter the data for the current week
    this.weeklyTopBets = this.allBetHistories?.filter((history) => {
      let historyDate = new Date(history.WiningTime);
      return historyDate > startOfWeek && historyDate < endOfWeek;
    });
  }
}
