import { InvalidRow } from "@/types"
import { X } from "lucide-react"
import { useState } from "react"

interface InvalidRowsProps {
  rows: InvalidRow[]
}

const InvalidRows: React.FC<InvalidRowsProps> = ({ rows }) => {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  return (
    <div className="relative p-4 bg-red-100/30 rounded-md text-red-500">
      <button
        className="absolute top-2 right-2 p-1 rounded hover:bg-red-200/50 transition-colors cursor-pointer"
        onClick={() => setIsOpen(false)}
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
      <h3>Skipped rows: {rows.length}</h3>
      <ul>
        {rows.map((item, i) => (
          <li key={i}>
            Row: {JSON.stringify(item.row)}
            <br />
            Error:
            <ul>
              {item.errors.map((e, j) => (
                <li key={j}>{e}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InvalidRows
