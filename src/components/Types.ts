export enum ExchangeType {
  BINANCE_FUTURES,
  BINANCE_SPOT = 1,
  BYBIT_FUTURES = 2,
  BYBIT_SPOT = 3,
  BINANCE_FUTURES_PAPER = 4,
}

export type Exchange = {
  type: ExchangeType;
  apiKey: string;
  apiSecret: string;
};

export type SymbolType = {
  base_asset: string;
  quote_asset: string;
};

export type InitialOrder = {
  space: number;
  deposit: number;
  shiftTimeout: number;
  shift: number;
};

export enum Strategy {
  LONG,
  SHORT,
}

export type GridOrder = {
  step: number;
  deposit: number;
};

export type Grid = {
  activeOrders: number;
  equalize: object;
  orders: GridOrder[];
};

export type Trailing = {
  step: number;
  shift: number;
};

export type Profit = {
  value: number;
  trailing?: Trailing;
};
export type Stop = {
  percent: number;
  timeout: number;
};

export class Config {
  id = 'abc';
  botName = 'bot1';
  commission_maker = 0.001;
  commission_taker = 0.005;
  exchange: Exchange = {
    type: ExchangeType.BYBIT_SPOT,
    apiKey: '1234321',
    apiSecret: '432234',
  };
  symbol: SymbolType = {
    base_asset: 'BTC',
    quote_asset: 'USDT',
  };
  strategy: Strategy = Strategy.LONG;
  initialOrder: InitialOrder = {
    deposit: 100,
    space: 0.0001,
    shiftTimeout: 100,
    shift: 0.0001,
  };
  grid: Grid = {
    activeOrders: 1,
    equalize: {},
    orders: [
      { deposit: 15, step: 0.005 },
      { deposit: 30, step: 0.01 },
      { deposit: 45, step: 0.015 },
      { deposit: 75, step: 0.025 },
      { deposit: 120, step: 0.04 },
    ],
  };
  profit: Profit = {
    value: 0.01,
  };
  stop: Stop = {
    percent: 0,
    timeout: 0,
  };
}
