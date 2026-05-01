import { CounterpartyTotal, CSVData } from "@/types"

export const getSummaryData = (
  data: CSVData[],
  limit: number = 5,
  sort: keyof Omit<CounterpartyTotal, "name"> = "totalAmount"
) => {
  const map: Record<string, CounterpartyTotal> = {}
  let totalIncome = 0
  let totalExpenses = 0

  for (const item of data) {
    if (!map[item.counterparty]) {
      map[item.counterparty] = {
        name: item.counterparty,
        totalAmount: 0,
        transactionCount: 0,
        income: 0,
        expenses: 0,
      }
    }

    map[item.counterparty].totalAmount += Math.abs(item.amount)
    map[item.counterparty].transactionCount += 1

    if (item.amount > 0) {
      map[item.counterparty].income += item.amount
      totalIncome += item.amount
    } else {
      map[item.counterparty].expenses += Math.abs(item.amount)
      totalExpenses += Math.abs(item.amount)
    }
  }

  const topCounterparties = Object.values(map)
    .sort((a, b) => b[sort] - a[sort])
    .slice(0, limit)

  return {
    totalIncome,
    totalExpenses,
    netResult: totalIncome - totalExpenses,
    transactionCount: data.length,
    topCounterparties,
  }
}
