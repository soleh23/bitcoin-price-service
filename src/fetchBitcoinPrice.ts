type BitcoinPriceResponse = {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
};

export async function fetchBitcoinPrice(): Promise<BitcoinPriceResponse | null> {
  try {
    const bitcoinPricePending = await fetch(
      "https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT"
    );
    if (!bitcoinPricePending.ok) {
      console.error(
        `Failed to fetch Bitcoin price. Status: ${bitcoinPricePending.status}, error: ${bitcoinPricePending.statusText}`
      );
      return null;
    }
    const bitcoinPrice: BitcoinPriceResponse = await bitcoinPricePending.json();
    return bitcoinPrice;
  } catch (error) {
    console.error("Failed to fetch Bitcoin price", error);
    return null;
  }
}
