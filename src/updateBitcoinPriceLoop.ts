import { BitcoinPriceCache } from "./bitcoinPriceCache";

type BitcoinPriceResponse = {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
};

async function fetchBitcoinPrice(): Promise<BitcoinPriceResponse | null> {
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
}

async function updateBitcoinPrice(): Promise<void> {
  const newBitcoinPrice = await fetchBitcoinPrice();
  if (newBitcoinPrice === null) {
    console.error("Failed to update Bitcoin price");
    return;
  }
  const bitcoinPriceCache = BitcoinPriceCache.getInstance();
  const cacheValues = {
    askPrice: parseFloat(newBitcoinPrice.askPrice),
    bidPrice: parseFloat(newBitcoinPrice.bidPrice),
  };
  bitcoinPriceCache.set(cacheValues);
  console.log("Updated Bitcoin price with ", cacheValues);
}

export function runUpdateBitcoinPriceLoop(frequencySeconds: number) {
  // Initial update
  updateBitcoinPrice();
  setInterval(updateBitcoinPrice, frequencySeconds * 1000);
}
