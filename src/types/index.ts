import { dataSchema } from "@/lib/getParsedData"
import { z } from "zod"

export type CSVData = z.infer<typeof dataSchema>

export type InvalidRow = {
  row: unknown
  errors: string[]
}

export type CounterpartyTotal = {
  name: string
  totalAmount: number
  transactionCount: number
  income: number
  expenses: number
}
