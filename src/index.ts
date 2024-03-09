import express, { Request, Response } from "express";
import { runUpdateBitcoinPriceLoop } from "./updateBitcoinPriceLoop.js";
import { getMidPrice } from "./getMidPrice.js";

const PORT = parseInt(process.env.PORT);
const UPDATE_INTERVAL_SECONDS = parseInt(process.env.UPDATE_INTERVAL_SECONDS);
const SERVICE_COMMISSION_PERCENT = parseInt(
  process.env.SERVICE_COMMISSION_PERCENT
);

runUpdateBitcoinPriceLoop(UPDATE_INTERVAL_SECONDS);
const app = express();

app.get("/mid-price", (_: Request, res: Response) => {
  const midPrice = getMidPrice(SERVICE_COMMISSION_PERCENT);
  if (midPrice === null) {
    res
      .status(500)
      .json({ error: "Bitcoin price is not available, try again later" });
    return;
  }
  res.json({ bitcoinPrice: midPrice });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
