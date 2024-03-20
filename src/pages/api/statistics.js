import { getMonthNumber, getMonthData } from "@/components/commonFunctions";

export default async function GET(req, res) {
  let monthNumber = getMonthNumber(req.query.month);
  if (!monthNumber) {
    res.status(404).json({ message: "In Valid Month" });
  }
  // for month in number
  // print month number for debugging
  const regexPattern = new RegExp(`-${monthNumber}-`);
  // database connection
  const data = await getMonthData(regexPattern);

  const totalProducts = data.length;
  let totalSale = 0;
  let cnt = 0;
  data.forEach((d) => {
    if (d.sold) {
      totalSale += d.price;
      cnt++;
    }
  });
  let totalUnsold = totalProducts - cnt;
  res.status(200).json({
    MonthName: req.query.month,
    TotalSale: totalSale,
    Sold: cnt,
    NotSold: totalUnsold,
  });
}
