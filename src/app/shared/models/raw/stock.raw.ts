import { Stock } from '../stock';

export class StockRaw {
  constructor(
    public c: number, // current price
    public d: number, // change
    public dp: number, // percent change
    public h: number, // high price of the day
    public l: number, // low price of the day
    public o: number, // open price of the day
    public pc: number // previous close price
  ) {}

  static toStock(raw: StockRaw): Stock {
    return {
      name: '',
      symbol: '',
      currentPrice: raw.c,
      change: raw.d,
      percentChange: raw.dp,
      highPrice: raw.h,
      lowPrice: raw.l,
      openPrice: raw.o,
      closePrice: raw.pc,
    };
  }

  static toRaw(stock: Stock): StockRaw {
    return {
      c: stock.currentPrice,
      d: stock.change,
      dp: stock.percentChange,
      h: stock.highPrice,
      l: stock.lowPrice,
      o: stock.openPrice,
      pc: stock.closePrice,
    };
  }
}
