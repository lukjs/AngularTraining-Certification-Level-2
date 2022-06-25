export class Sentiment {
  constructor(
    public symbol: string,
    public year: number,
    public month: number,
    public change: number,
    public mspr: number,
    public date: Date
  ) {}
}

export type Sentiments = Sentiment[];
