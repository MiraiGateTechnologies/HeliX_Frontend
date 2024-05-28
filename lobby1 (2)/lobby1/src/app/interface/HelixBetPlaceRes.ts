import {BetType} from "./betType.enum";

export interface HelixBetPlaceRes {
  status: boolean
  msg: string
  amount: number
  betType:BetType
}
