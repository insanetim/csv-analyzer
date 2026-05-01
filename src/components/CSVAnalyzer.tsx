"use client"

import { parseCsv, validateRows } from "@/lib/getParsedData"
import { CSVData, InvalidRow } from "@/types"
import { useCallback, useEffect, useState } from "react"
import DataView from "./DataView"
import Dropzone from "./Dropzone"
import InvalidRows from "./InvalidRows"
import { Alert, AlertDescription } from "./ui/alert"

const CSVAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null)
  const [validRows, setValidRows] = useState<CSVData[]>([])
  const [invalidRows, setInvalidRows] = useState<InvalidRow[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleFile = useCallback(async () => {
    setError(null)
    setValidRows([])
    setInvalidRows([])
    try {
      const data = await parseCsv<CSVData>(file!)
      const { valid, invalid } = validateRows(data)
      setValidRows(valid)
      setInvalidRows(invalid)
    } catch (error) {
      console.error("Error parsing CSV:", error)
      setError("Error parsing CSV")
    }
  }, [file])

  useEffect(() => {
    if (file) {
      queueMicrotask(() => {
        handleFile()
      })
    }
  }, [file, handleFile])

  let content
  if (error) {
    content = (
      <Alert
        variant="destructive"
        className="max-w-2xl mx-auto p-6 border-red-400/50 bg-red-50/50"
      >
        <AlertDescription className="text-lg">{error}</AlertDescription>
      </Alert>
    )
  } else if (file && validRows.length === 0) {
    content = (
      <Alert className="max-w-2xl mx-auto p-6">
        <AlertDescription className="text-lg">
          CSV file is empty
        </AlertDescription>
      </Alert>
    )
  } else if (file && validRows.length > 0) {
    content = <DataView data={validRows} />
  }

  return (
    <div className="space-y-4">
      <Dropzone
        file={file}
        onFileSelected={setFile}
      />
      {invalidRows.length > 0 && <InvalidRows rows={invalidRows} />}
      {content}
    </div>
  )
}

export default CSVAnalyzer
