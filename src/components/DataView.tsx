"use client"

import { getSummaryData } from "@/lib/statement"
import { CSVData } from "@/types"
import { useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import DataControls from "./DataControls"
import DataTable from "./DataTable"
import SummaryCards from "./SummaryCards"
import TopCounterparties from "./TopCounterparties"

type FilterType = "all" | "income" | "expense"

interface DataViewProps {
  data: CSVData[]
}

const DataView: React.FC<DataViewProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<FilterType>("all")

  const [debouncedSearchTerm] = useDebounceValue(searchTerm, 500)

  const {
    totalIncome,
    totalExpenses,
    netResult,
    transactionCount,
    topCounterparties,
  } = getSummaryData(data)

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        netResult={netResult}
        transactionCount={transactionCount}
      />

      {/* Controls */}
      <DataControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterType={filterType}
        onFilterChange={setFilterType}
      />

      {/* Table */}
      <DataTable
        data={data}
        searchTerm={debouncedSearchTerm}
        filterType={filterType}
      />

      {/* Top Counterparties */}
      <TopCounterparties data={topCounterparties} />
    </div>
  )
}

export default DataView
