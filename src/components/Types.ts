export enum ExchangeType {
  BINANCE_FUTURES,
  BINANCE_SPOT = 1,
  BYBIT_FUTURES = 2,
  BYBIT_SPOT = 3,
  BINANCE_FUTURES_PAPER = 4,
}

export type Exchange = {
  type: ExchangeType;
  api_key: string;
  api_secret: string;
};

export type SymbolType = {
  base_asset: string;
  quote_asset: string;
};

export type InitialOrder = {
  deposit: number;
  shifting: {
    space: number;
    shift_timeout: number;
    shift: number;
  };
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
  orders: GridOrder[];
};

export type Trailing = {
  stop: number;
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
  bot_name = 'bot1';
  commission_maker = 0.001;
  commission_taker = 0.005;
  exchange: Exchange = {
    type: ExchangeType.BYBIT_SPOT,
    api_key: '1234321',
    api_secret: '432234',
  };
  grid: Grid = {
    activeOrders: 1,
    orders: [
      { deposit: 15, step: 0.005 },
      { deposit: 30, step: 0.01 },
      { deposit: 45, step: 0.015 },
      { deposit: 75, step: 0.025 },
      { deposit: 120, step: 0.04 },
    ],
  };
  id = 'abc';
  initial_order: InitialOrder = {
    deposit: 100,
    shifting: {
      space: 0.0001,
      shift_timeout: 100,
      shift: 0.0001,
    },
  };

  profit: Profit = {
    value: 0.01,
  };
  stop: Stop = {
    percent: 0,
    timeout: 0,
  };
  strategy: Strategy = Strategy.LONG;
  symbol: SymbolType = {
    base_asset: 'BTC',
    quote_asset: 'USDT',
  };
  pnl_update_delay = 1000;
}
