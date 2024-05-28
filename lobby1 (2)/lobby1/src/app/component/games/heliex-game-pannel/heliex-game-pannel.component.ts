import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeliexHeaderComponent} from './heliex-header/heliex-header.component';
import {HeliexAllBetsComponent} from './heliex-all-bets/heliex-all-bets.component';
import {BetAction, BetType} from '../../../interface/betType.enum'
import {FormsModule} from '@angular/forms';
import {BetService} from "../../../service/bet.service";
import {ToastrService} from 'ngx-toastr';
import {IconClickService} from '../../../service/shared.service';
import {AuthService} from "../../../service/auth.service";

declare var createUnityInstance: any;

@Component({
  selector: 'app-heliex-game-pannel',
  standalone: true,
  imports: [CommonModule, HeliexHeaderComponent, FormsModule, HeliexAllBetsComponent],
  templateUrl: './heliex-game-pannel.component.html',
  styleUrls: ['./heliex-game-pannel.component.css']
})
export class HeliexGamePannelComponent {
  @ViewChild('unityCanvas', {static: true}) unityCanvas!: ElementRef<HTMLCanvasElement>;
  private unityInstance: any = null;
  betAllowed: boolean = true;
  autoMode: boolean = false;
  firstAmount: number = 100;
  secondAmount: number = 100;
  planCrashHistories: number[] = [];
  _collectionValueFirst: number = 1.13;
  _collectionValueSecond: number = 1.15;
  formattedValueFirst: string = `${this._collectionValueFirst}x`;
  protected readonly BetAction = BetAction;


  firstBetObj: any
  secondBetObj: any

  //Auto Bet
  firstAutoBetToggle: boolean = false
  secondAutoBetToggle: boolean = false


  //Auto Collect
  autoCollectFirstToggle: boolean = false
  autoCollectSecondToggle: boolean = false

  firstBetAction: BetAction = BetAction.READY
  secondBetAction: BetAction = BetAction.READY

  isFirstBetAllow = true
  isSecondBetAllow = true

  firstCollectAmt: number = 0
  secondCollectAmt: number = 0


  currRate: number = 0

  eventSource: EventSource
  showXYZ = true;

  constructor(
    private ngZone: NgZone,
    private authService: AuthService,
    private betService: BetService,
    private tosterService: ToastrService,
    private sharedService: IconClickService
  ) {
    this.eventSource = new EventSource("https://miraigames.org/api/v1/sse/helix");
    this.sharedService.hideSideBar.subscribe(() => {
      this.showXYZ = !this.showXYZ;
    });
  }

  updateUserData() {
    this.authService.getCurrentLobbyUser()
  }

  getRecentCrash() {

    this.betService.getRecentCrash().subscribe({
      next: (res) => {
        this.planCrashHistories = res
      }
    })
  }


  ngOnInit(): void {
    createUnityInstance(document.querySelector("#unityCanvas"), {
      dataUrl: "assets/helix/build.data",
      frameworkUrl: "assets/helix/build.framework.js",
      codeUrl: "assets/helix/build.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "MiraiGames",
      productName: "Helix",
      productVersion: "1.0"
    }).then((unityInstance) => {
      this.unityInstance = unityInstance
    });

    this.getRecentCrash();

    this.eventSource.onmessage = event => {
      this.ngZone.run(() => {
        try {
          let obj = JSON.parse(event.data)
          this.sendDataToUnity(JSON.stringify(obj))


          //Checking first bet
          if (this.firstAutoBetToggle && this.firstBetObj == null) {
            this.firstBetPlace()
          }
          if (this.secondAutoBetToggle && this.secondBetObj == null) {
            this.secondBetPlace()
          }

          if (obj.betAllowed) {
            if (this.firstBetObj != null && this.firstBetAction == BetAction.CANCEL) {
              this.firstBetObj.roundId = obj.roundId.toFixed(11);
              if (this.isFirstBetAllow) {
                this.sendBetPlaceReq(this.firstBetObj)
              }
              this.isFirstBetAllow = false
            }

            if (this.secondBetObj != null && this.secondBetAction == BetAction.CANCEL) {
              this.secondBetObj.roundId = obj.roundId.toFixed(11)
              if (this.isSecondBetAllow) {
                this.sendBetPlaceReq(this.secondBetObj)
              }
              this.isSecondBetAllow = false
            }


          }
          if (obj.currentRate > 1) {
            if (this.firstBetAction == BetAction.ACCEPT) {
              this.firstBetAction = BetAction.COLLECT;
            }

            if (this.secondBetAction == BetAction.ACCEPT) {
              this.secondBetAction = BetAction.COLLECT;
            }

            //------------------//

            if (this.firstBetAction == BetAction.COLLECT) {
              this.firstCollectAmt = (obj.currentRate - 1) * this.firstBetObj.amount;
            }
            if (this.secondBetAction == BetAction.COLLECT) {
              this.secondCollectAmt = (obj.currentRate - 1) * this.secondBetObj.amount;
            }
          }

          if (this.autoCollectFirstToggle && this.firstBetAction == BetAction.COLLECT) {
            if (obj.currentRate >= this._collectionValueFirst) {
              this.betCollect(BetType.FIRST)
            }
          }

          if (this.autoCollectSecondToggle && this.secondBetAction == BetAction.COLLECT) {
            if (obj.currentRate >= this._collectionValueSecond) {
              this.betCollect(BetType.SECOND)
            }
          }
          if (obj.isDeclare) {
            if (this.firstBetAction == BetAction.COLLECT) {
              this.firstBetObj = null
              this.firstCollectAmt = 0
              this.firstBetAction = BetAction.READY
              this.isFirstBetAllow = true
            }

            if (this.secondBetAction == BetAction.COLLECT) {
              this.secondBetObj = null
              this.secondCollectAmt = 0
              this.secondBetAction = BetAction.READY
              this.isSecondBetAllow = true
            }
            this.getRecentCrash()

          }
        } catch (e) {
        }
      })
    }
  }

  private updateDisplay() {
    this.formattedValueFirst = `${this._collectionValueFirst.toFixed(2)}x`;
  }

  sendBetPlaceReq(body: any) {
    this.betService.insertBet(body).subscribe({
      next: (res) => {
        if (res.betType == BetType.FIRST) {
          this.firstBetAction = BetAction.ACCEPT;
        }
        if (res.betType == BetType.SECOND) {
          this.secondBetAction = BetAction.ACCEPT
        }
        this.updateUserData()

      },
      error: (e) => {
        let msg = e.error.error
        if (body.betType == BetType.FIRST) {
          this.isFirstBetAllow = true
          this.firstBetAction = BetAction.READY
          this.firstAutoBetToggle = false
        }
        if (body.betType == BetType.SECOND) {
          this.isSecondBetAllow = true
          this.secondBetAction = BetAction.READY;
          this.secondAutoBetToggle = false
        }

        this.tosterService.error(msg, "", {timeOut: 2000})

      }
    })
  }

  firstBetPlace() {
    this.firstBetAction = BetAction.CANCEL
    this.firstBetObj = {
      amount: this.firstAmount,
      betType: BetType.FIRST,
      roundId: 0
    }
  }

  secondBetPlace() {
    this.secondBetAction = BetAction.CANCEL;
    this.secondBetObj = {
      amount: this.secondAmount,
      betType: BetType.SECOND,
      roundId: 0
    }
  }

  firstBetCancel() {
    this.firstBetAction = BetAction.READY
    this.firstBetObj = null

    if (this.firstAutoBetToggle) {
      this.firstAutoBetToggle = false
    }

  }

  secondBetCancel() {
    this.secondBetAction = BetAction.READY
    this.secondBetObj = null
    if (this.secondAutoBetToggle) {
      this.secondAutoBetToggle = false
    }
  }

  firstBetToggleAutoBet(event: any) {
    this.firstAutoBetToggle = !this.firstAutoBetToggle;
    if (this.firstAutoBetToggle) {
      if (this.firstBetAction == BetAction.READY) {
        this.firstBetPlace()
      }
    }
  }

  secondBetToggleAutoBet(event: any) {
    this.secondAutoBetToggle = !this.secondAutoBetToggle;
    if (this.secondAutoBetToggle) {
      if (this.secondBetAction == BetAction.READY) {
        this.secondBetPlace()
      }

    }
  }

  autoCollectFirst(event: any) {
    this.autoCollectFirstToggle = !this.autoCollectFirstToggle
  }

  autoCollectSecond(event: any) {
    this.autoCollectSecondToggle = !this.autoCollectSecondToggle
  }

  betCollect(type: BetType) {
    const roundId = type == BetType.FIRST ? this.firstBetObj.roundId : this.secondBetObj.roundId
    if (type == BetType.FIRST) {
      this.firstBetAction = BetAction.READY
    }
    if (type == BetType.SECOND) {
      this.secondBetAction = BetAction.READY
    }
    this.betService.collectionBet(
      {
        collectRate: this.currRate,
        betType: type,
        roundId: roundId
      }
    ).subscribe({
      next: (res) => {
        //Write Code  Make Toaster for win Amount
        this.tosterService.success(res.winAmount, 'you won ' + res.winAmount)
        if (type == BetType.FIRST) {
          this.isFirstBetAllow = true
          this.firstBetObj = null
          this.firstCollectAmt = 0
          this.firstBetAction = BetAction.READY
        }
        if (type == BetType.SECOND) {
          this.isSecondBetAllow = true
          this.secondBetObj = null
          this.secondCollectAmt = 0
          this.secondBetAction = BetAction.READY
        }
        this.updateUserData()
      },
      error: (e) => {
        console.error('error', e);
        this.tosterService.error('Server Error', e.e.error.error)
        // this.tosterService.success(e.)
        //Write Code Make Toaster for failed collect
      }
    })
  }


  // ngAfterViewInit(): void {
  //   this.loadUnityScriptAndInstance();
  // }

  getColor(bet: number): string {
    if (bet < 1.30) return '#3b7998';
    if (bet >= 1.31 && bet < 2.10) return '#E91100';
    if (bet >= 2.11 && bet < 2.50) return '#fff';
    if (bet >= 2.51 && bet < 3.5) return '#FF0000';
    if (bet >= 2.7 && bet < 5.5) return '#F8C961';
    if (bet >= 5.6 && bet < 10.5) return '#28A909';
    return 'white'; // Default color if no condition matches
  }

  sendDataToUnity(data: string) {
    if (this.unityInstance) {
      this.unityInstance.SendMessage('UiManager', 'ReceiveMessage', data);
      this.unityInstance.SendMessage('ParallaxManager', 'ReceiveMessage', data);
    }
  }

  onPlusFirstBetAutoCollectBetNumber() {
    this._collectionValueFirst = parseFloat((this._collectionValueFirst + 0.1).toFixed(1));

  }

  onPlusSecondBetAutoCollectBetNumber() {
    this._collectionValueSecond = parseFloat((this._collectionValueSecond + 0.1).toFixed(1));

  }

  onPlusFirstBetAutoBetNumber() {
    this.firstAmount = parseFloat((this.firstAmount + 100).toFixed(1));
  }

  onPlusSecondBetAutoBetNumber() {
    this.secondAmount = parseFloat((this.secondAmount + 100).toFixed(1));
  }

  onDecreaseFirstAutoBetNumber() {
    if (this.firstAmount > 100) {
      this.firstAmount = parseFloat((this.firstAmount - 100).toFixed(1));
    }
  }

  onDecreaseSecondAutoBetNumber() {
    if (this.secondAmount > 100) {
      this.secondAmount = parseFloat((this.secondAmount - 100).toFixed(1));
    }
  }


  onDecreaseFirstAutoCollectBetNumber() {
    if (this._collectionValueFirst > 0) {
      this._collectionValueFirst = parseFloat((this._collectionValueFirst - 0.1).toFixed(1));
    }
  }

  onDecreaseSecondAutoCollectBetNumber() {
    if (this._collectionValueSecond > 0) {
      this._collectionValueSecond = parseFloat((this._collectionValueSecond - 0.1).toFixed(1));
    }
  }

  updateValue(amount: number) {
    this.firstAmount = amount;
  }

  updateValueSecond(amount: number) {
    this.secondAmount = amount;
  }

  toggleMode(mode: boolean) {
    this.autoMode = mode;
  }

  ngOnDestroy(): void {
    if (this.unityInstance) {
      this.unityInstance.Quit();
    }
    try {
      this.eventSource.close()
    } catch (e) {

    }
  }

  protected readonly BetType = BetType;
}
