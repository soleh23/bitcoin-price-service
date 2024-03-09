export function calculateMidPrice(
  askPrice: number | null,
  bidPrice: number | null,
  commissionFeePercent: number
): number {
  if (!askPrice || !bidPrice) {
    return null;
  }
  const askPriceAfterCommission =
    askPrice + (askPrice * commissionFeePercent) / 100;
  const bidPriceAfterCommission =
    bidPrice + (bidPrice * commissionFeePercent) / 100;
  return (askPriceAfterCommission + bidPriceAfterCommission) / 2;
}
