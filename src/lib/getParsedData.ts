import { CSVData, InvalidRow } from "@/types"
import Papa from "papaparse"
import { z } from "zod"

export const dataSchema = z.object({
  date: z.iso.date(),
  counterparty: z.string().min(1),
  description: z.string().min(1),
  amount: z.coerce.number(),
})

export function parseCsv<T>(file: File): Promise<T[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: result => resolve(result.data as T[]),
      error: reject,
    })
  })
}

export function validateRows(rows: unknown[]) {
  const valid: CSVData[] = []
  const invalid: InvalidRow[] = []

  rows.forEach(row => {
    const result = dataSchema.safeParse(row)

    if (result.success) {
      valid.push(result.data)
    } else {
      invalid.push({
        row,
        errors: result.error.issues.map(e => {
          return `${e.path.join(".")}: ${e.message}`
        }),
      })
    }
  })

  return { valid, invalid }
}
