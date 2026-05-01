"use client"

import { Filter, Search } from "lucide-react"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

type FilterType = "all" | "income" | "expense"

interface DataControlsProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filterType: FilterType
  onFilterChange: (value: FilterType) => void
}

const DataControls: React.FC<DataControlsProps> = ({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search by counterparty or description..."
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className="text-gray-400 h-4 w-4" />
        <Select
          value={filterType}
          onValueChange={value => onFilterChange(value || "all")}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expenses</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default DataControls
