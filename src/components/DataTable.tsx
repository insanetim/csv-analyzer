"use client"

import { formatCurrency, formatDate } from "@/lib/format"
import { CSVData } from "@/types"
import { useMemo, useState } from "react"
import TablePagination from "./TablePagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

const ITEMS_PER_PAGE = 10

interface DataTableProps {
  data: CSVData[]
  searchTerm: string
  filterType: "all" | "income" | "expense"
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  searchTerm,
  filterType,
}) => {
  const filterKey = `${searchTerm}-${filterType}`

  const filteredData = useMemo(() => {
    return data.filter(item => {
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
  }, [data, searchTerm, filterType])

  // Use key to reset page when filters change
  const [currentPage, setCurrentPage] = useState(1)

  // Reset page when filterKey changes by using a separate state
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey)
  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey)
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  return (
    <div>
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
              paginatedData.map((item, index) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}

export default DataTable
