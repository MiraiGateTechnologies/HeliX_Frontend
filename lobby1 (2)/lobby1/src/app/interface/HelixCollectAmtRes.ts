import {BetType} from "./betType.enum";

export interface HelixCollectAmtRes {
  status: boolean
  msg: string
  winAmount: number
  betType: BetType
}
