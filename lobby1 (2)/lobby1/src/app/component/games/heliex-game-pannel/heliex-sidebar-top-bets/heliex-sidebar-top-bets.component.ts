import { Component } from '@angular/core';
import { HeliexTopBetsAllComponent } from './heliex-top-bets-all/heliex-top-bets-all.component';
import { HeliexTopBetsDailyComponent } from './heliex-top-bets-daily/heliex-top-bets-daily.component';
import { HeliexTopBetsMonthlyComponent } from './heliex-top-bets-monthly/heliex-top-bets-monthly.component';
import { HeliexTopBetsTopBetsComponent } from './heliex-top-bets-top-bets/heliex-top-bets-top-bets.component';
import { HeliexTopBetsWeeklyComponent } from './heliex-top-bets-weekly/heliex-top-bets-weekly.component';
import { BetServiceService } from '../../../../service/bet-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heliex-sidebar-top-bets',
  standalone: true,
  imports: [HeliexTopBetsAllComponent,HeliexTopBetsDailyComponent,HeliexTopBetsMonthlyComponent,HeliexTopBetsTopBetsComponent,HeliexTopBetsWeeklyComponent,CommonModule],
  templateUrl: './heliex-sidebar-top-bets.component.html',
  styleUrl: './heliex-sidebar-top-bets.component.css'
})
export class HeliexSidebarTopBetsComponent {
  history: string = 'ALL_BETS';
  betHistories: any[] =[];
  hide:boolean=false
  constructor(private betService: BetServiceService) {}

  ngOnInit(): void {
    this.betService.getBetHistories().subscribe(
      (response:any) => {
        console.log(response);
        if (response.success) {
          this.betHistories = response.betHistories;
        }
      },
      (error:any) => console.log(error)
    );
  }

  
  setActiveTab(selectedTab: string): void {
    this.history = selectedTab;
    const tabs = document.querySelectorAll('.top-tab');
    tabs.forEach(tab => {
      tab.classList.remove('active-tab');
      if (tab.textContent?.trim().toLowerCase() === selectedTab.split('_')[0]) {
        tab.classList.add('active-tab');
      }
    });
  }

}
