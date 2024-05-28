// bet-type.enum.ts
export enum BetType {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
}

export interface BetFirstPlaceObject {
  amount: number;
  roundId: string;
  betType: string;
}

export enum BetAction {
  READY,
  CANCEL,
  ACCEPT,
  COLLECT
}
