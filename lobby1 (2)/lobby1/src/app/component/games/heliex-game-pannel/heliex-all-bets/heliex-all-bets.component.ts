import { Component, Input, OnInit } from '@angular/core';
import { BetServiceService } from '../../../../service/bet-service.service';
import { CommonModule } from '@angular/common';
import { BetService } from '../../../../service/bet.service';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-heliex-all-bets',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './heliex-all-bets.component.html',
  styleUrl: './heliex-all-bets.component.css'
})
export class HeliexAllBetsComponent implements OnInit{
  // @Input() value: any;
  // @Input() firstBetAccepted!: boolean;
  // @Input() secondBetAccepted!: boolean;
  currentPage = 1;
  pageSize = 12;
  activeTab = 'ALL_BETS';
  myBets:any[]=[];
  AllBets:any[]=[];
  dummyData :any[]= [
  { username: "User1", betAmount: 100, betOutAmount: 80 },
  { username: "User2", betAmount: 150, betOutAmount: 120 },
  { username: "User3", betAmount: 200, betOutAmount: 160 },
  { username: "User4", betAmount: 90, betOutAmount: 70 },
  { username: "User5", betAmount: 120, betOutAmount: 100 },
  { username: "User6", betAmount: 180, betOutAmount: 140 },
  { username: "User7", betAmount: 110, betOutAmount: 90 },
  { username: "User8", betAmount: 130, betOutAmount: 110 },
  { username: "User9", betAmount: 170, betOutAmount: 140 },
  { username: "User10", betAmount: 150, betOutAmount: 120 }];
  showTable = false;
  betHistories: any[] | null = null;
  history: string = 'ALL_BETS';
  showAdditionalButtons = false;
  isShowMoreActive = false;
  @Input() hideandShowProfile:boolean;
  constructor(private betService:BetService) {}

  ngOnInit(): void {
    this.getAllBets();
    this.getUserBets();
  }
  toggleAdditionalButtons() {
    this.showAdditionalButtons = !this.showAdditionalButtons;
    this.isShowMoreActive = this.isShowMoreActive;
    // if (!this.showAdditionalButtons) {
    //   // Reset if 'Show More' is closed
    //   this.activeTab = this.activeTab === 'ALL_BETS' ? 'ALL_BETS' : 'USER_BETS';
    // }
  }

  // getUserBets
  getUserBets(){
      this.betService.getMyBets().subscribe({
        next:(res:any)=>{
          this.currentPage = 1;
          this.myBets = res;
        }
      })
    }

  // getAllBets
  getAllBets(){
    this.betService.getAllBets('123').subscribe({
      next:(res:any)=>{
        console.log(res)
        this.currentPage=1;
        this.AllBets =res;
      }
    })
  }



  ngOnChanges(): void {
  }

  setActiveTab(selectedTab: string): void {
    this.activeTab = selectedTab;

    if (['MONTHLY_BETS', 'WEEKLY_BETS', 'DAILY_BETS'].includes(selectedTab)) {
      this.isShowMoreActive = true;
    } else {
      this.isShowMoreActive = false;
    }
    if(selectedTab == 'ALL_BETS'||selectedTab =='USER_BETS'){
      this.showAdditionalButtons = false;
    }
    this.history = selectedTab;
    const tabs = document.querySelectorAll('.top-tab');
    tabs.forEach(tab => {
      tab.classList.remove('active-tab');
      if (tab.textContent?.trim().toLowerCase() === selectedTab.split('_')[0]) {
        tab.classList.add('active-tab');
      }
    });
  }

  // private fetchBetHistories(): void {
  //   this.betService.getCurrentBetWinners().subscribe(
  //     (response:any) => {
  //       console.log('current bet wins----------------------------');
  //       console.log(response);
  //       if (response.success) {
  //         this.betHistories = response.wins;
  //       }
  //     },
  //     (error:any) => console.log(error)
  //   );
  // }
}
