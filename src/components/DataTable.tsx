"use client"

import { formatCurrency, formatDate } from "@/lib/format"
import { CSVData } from "@/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

interface DataTableProps {
  data: CSVData[]
  searchTerm: string
  filterType: "all" | "income" | "expense"
}

const DataTable: React.FC<DataTableProps> = ({ data, searchTerm, filterType }) => {
  const filteredData = data.filter(item => {
    // Apply filter
    if (filterType === "income" && item.amount <= 0) return false
    if (filterType === "expense" && item.amount > 0) return false

    // Apply search (case-insensitive)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        item.counterparty.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      )
    }

    return true
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Counterparty</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-gray-500"
              >
                {searchTerm || filterType !== "all"
                  ? "No data matching filters"
                  : "No transactions"}
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{formatDate(item.date)}</TableCell>
                <TableCell className="font-medium">
                  {item.counterparty}
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right font-mono">
                  {formatCurrency(item.amount)}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.amount > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.amount > 0 ? "Income" : "Expense"}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default DataTable
