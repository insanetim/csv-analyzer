"use client"

import { formatCurrency } from "@/lib/format"
import { CSVData } from "@/types"
import { Receipt, TrendingDown, TrendingUp } from "lucide-react"

interface SummaryCardsProps {
  data: CSVData[]
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const totalIncome = data
    .filter(item => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0)

  const totalExpenses = Math.abs(
    data
      .filter(item => item.amount <= 0)
      .reduce((sum, item) => sum + item.amount, 0)
  )

  const netResult = totalIncome - totalExpenses
  const transactionCount = data.length

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Income */}
      <div className="bg-white rounded-lg border p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Income</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(totalIncome)}
            </p>
          </div>
          <TrendingUp className="h-8 w-8 text-green-500" />
        </div>
      </div>

      {/* Total Expenses */}
      <div className="bg-white rounded-lg border p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(totalExpenses)}
            </p>
          </div>
          <TrendingDown className="h-8 w-8 text-red-500" />
        </div>
      </div>

      {/* Net Result */}
      <div className="bg-white rounded-lg border p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Net Result</p>
            <p
              className={`text-2xl font-bold ${
                netResult >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatCurrency(netResult)}
            </p>
          </div>
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center ${
              netResult >= 0 ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {netResult >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </div>
        </div>
      </div>

      {/* Transaction Count */}
      <div className="bg-white rounded-lg border p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Transactions</p>
            <p className="text-2xl font-bold text-gray-900">
              {transactionCount}
            </p>
          </div>
          <Receipt className="h-8 w-8 text-gray-500" />
        </div>
      </div>
    </div>
  )
}

export default SummaryCards
