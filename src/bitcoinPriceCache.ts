type BitcoinPrice = {
  askPrice: number | null;
  bidPrice: number | null;
};

export class BitcoinPriceCache {
  private static instance: BitcoinPriceCache;
  private askPrice: number | null = null;
  private bidPrice: number | null = null;

  public static getInstance(): BitcoinPriceCache {
    if (!BitcoinPriceCache.instance) {
      BitcoinPriceCache.instance = new BitcoinPriceCache();
    }
    return BitcoinPriceCache.instance;
  }

  public get(): BitcoinPrice {
    return { askPrice: this.askPrice, bidPrice: this.bidPrice };
  }

  public set(btcPrice: BitcoinPrice) {
    this.askPrice = btcPrice.askPrice;
    this.bidPrice = btcPrice.bidPrice;
  }
}
