"use client"

import { formatCurrency } from "@/lib/format"
import { CounterpartyTotal } from "@/types"
import { TrendingDown, TrendingUp, Users } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

interface TopCounterpartiesProps {
  data: CounterpartyTotal[]
}

const TopCounterparties: React.FC<TopCounterpartiesProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Top {data.length} Counterparties
        </h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Counterparty</TableHead>
            <TableHead className="text-right">Total Amount</TableHead>
            <TableHead className="text-right">Transactions</TableHead>
            <TableHead className="text-right">Income</TableHead>
            <TableHead className="text-right">Expenses</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((counterparty, index) => (
            <TableRow key={counterparty.name}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                    {index + 1}
                  </span>
                  {counterparty.name}
                </div>
              </TableCell>
              <TableCell className="text-right font-mono">
                {formatCurrency(counterparty.totalAmount)}
              </TableCell>
              <TableCell className="text-right">
                {counterparty.transactionCount}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  {formatCurrency(counterparty.income)}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  {formatCurrency(counterparty.expenses)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TopCounterparties
