import { describe, it, expect } from "vitest";
import { calculateMidPrice } from "../calculateMidPrice";

describe("calculate mid price", () => {
  it("should calculate the mid price", () => {
    const askPrice = 10001;
    const bidPrice = 10000;
    const commissionPercent = 10;
    const calculatedMidPrice = calculateMidPrice(
      askPrice,
      bidPrice,
      commissionPercent
    );
    expect(calculatedMidPrice).toBe(11000.55);
  });

  it("should calculate the mid price with 0 commision", () => {
    const askPrice = 1;
    const bidPrice = 2;
    const commissionPercent = 0;
    const calculatedMidPrice = calculateMidPrice(
      askPrice,
      bidPrice,
      commissionPercent
    );
    expect(calculatedMidPrice).toBe(1.5);
  });

  it("should return null if ask or bid price is null", () => {
    expect(calculateMidPrice(null, 1, 1)).toBe(null);
    expect(calculateMidPrice(1, null, 10)).toBe(null);
    expect(calculateMidPrice(null, null, 10)).toBe(null);
  });
});
