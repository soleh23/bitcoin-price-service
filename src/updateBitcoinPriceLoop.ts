import { BitcoinPriceCache } from "./bitcoinPriceCache.js";
import { fetchBitcoinPrice } from "./fetchBitcoinPrice.js";

export async function updateBitcoinPrice(): Promise<void> {
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
