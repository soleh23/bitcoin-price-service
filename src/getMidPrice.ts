import { BitcoinPriceCache } from "./bitcoinPriceCache.js";
import { calculateMidPrice } from "./calculateMidPrice.js";

export function getMidPrice(
  serviceCommissionFeePercent: number
): number | null {
  const bitcoinPriceCache = BitcoinPriceCache.getInstance();
  const { askPrice, bidPrice } = bitcoinPriceCache.get();
  const midPrice = calculateMidPrice(
    askPrice,
    bidPrice,
    serviceCommissionFeePercent
  );
  return midPrice;
}
