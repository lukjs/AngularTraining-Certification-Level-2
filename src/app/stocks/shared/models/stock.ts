export class Stock {
  constructor(
    public name: string,
    public symbol: string,
    public currentPrice: number,
    public change: number,
    public percentChange: number,
    public highPrice: number,
    public lowPrice: number,
    public openPrice: number,
    public closePrice: number
  ) {}
}
