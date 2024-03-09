import { describe, it, vi, beforeEach, expect } from "vitest";
import { BitcoinPriceCache } from "../bitcoinPriceCache.js";
import { updateBitcoinPrice } from "../updateBitcoinPriceLoop.js";

const mocks = vi.hoisted(() => {
  return {
    binanceApi: vi.fn(),
  };
});

vi.mock("../fetchBitcoinPrice.js", () => {
  return {
    fetchBitcoinPrice: mocks.binanceApi,
  };
});

describe("update bitcoin price loop", () => {
  beforeEach(() => {
    mocks.binanceApi.mockClear();
  });

  it("should update the bitcoin price", async () => {
    mocks.binanceApi.mockResolvedValueOnce({
      symbol: "BTCUSDT",
      bidPrice: "10000",
      bidQty: "0.1",
      askPrice: "10001",
      askQty: "0.1",
    });
    await updateBitcoinPrice();
    expect(mocks.binanceApi).toHaveBeenCalledOnce();
    expect(BitcoinPriceCache.getInstance().get()).toEqual({
      bidPrice: 10000,
      askPrice: 10001,
    });
  });

  it("should overwrite the bitcoin price cache", async () => {
    mocks.binanceApi.mockResolvedValueOnce({
      symbol: "BTCUSDT",
      bidPrice: "10000",
      bidQty: "0.1",
      askPrice: "10001",
      askQty: "0.1",
    });
    mocks.binanceApi.mockResolvedValueOnce({
      symbol: "BTCUSDT",
      bidPrice: "10002",
      bidQty: "0.1",
      askPrice: "10003",
      askQty: "0.1",
    });
    await updateBitcoinPrice();
    await updateBitcoinPrice();
    expect(mocks.binanceApi).toHaveBeenCalledTimes(2);
    expect(BitcoinPriceCache.getInstance().get()).toEqual({
      bidPrice: 10002,
      askPrice: 10003,
    });
  });
});
