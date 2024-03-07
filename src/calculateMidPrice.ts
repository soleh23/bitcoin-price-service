export function calculateMidPrice(
  askPrice: number,
  bidPrice: number,
  commissionFeePercent: number
): number {
  const askPriceAfterCommission =
    askPrice + (askPrice * commissionFeePercent) / 100;
  const bidPriceAfterCommission =
    bidPrice + (bidPrice * commissionFeePercent) / 100;
  return (askPriceAfterCommission + bidPriceAfterCommission) / 2;
}
