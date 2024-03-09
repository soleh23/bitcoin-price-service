import { describe, expect, it } from "vitest";
import { BitcoinPriceCache } from "../bitcoinPriceCache";
import { getMidPrice } from "../getMidPrice.js";

describe("get mid price", () => {
  it("should return the mid price", () => {
    BitcoinPriceCache.getInstance().set({ askPrice: 10001, bidPrice: 10000 });
    expect(getMidPrice(10)).toBe(11000.55);
    expect(getMidPrice(1)).toBe(10100.505000000001);
    expect(getMidPrice(0)).toBe(10000.5);
  });
});
