"use client"

import { CSVData } from "@/types"
import { useState } from "react"
import DataControls from "./DataControls"
import DataTable from "./DataTable"
import SummaryCards from "./SummaryCards"

type FilterType = "all" | "income" | "expense"

interface DataViewProps {
  data: CSVData[]
}

const DataView: React.FC<DataViewProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<FilterType>("all")

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <SummaryCards data={data} />

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
        searchTerm={searchTerm}
        filterType={filterType}
      />
    </div>
  )
}

export default DataView
