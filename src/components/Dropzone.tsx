"use client"

import { cn } from "@/lib/utils"
import { useRef, useState } from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

interface DropzoneProps {
  onFileSelected: (file: File) => void
}

const Dropzone: React.FC<DropzoneProps> = ({
  onFileSelected: onFileChange,
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const validateFile = (file: File) => {
    const isCSV =
      file.type === "text/csv" || file.name.toLowerCase().endsWith(".csv")

    if (!isCSV) {
      return "Only CSV files are allowed"
    }

    return null
  }

  const handleFiles = (files: FileList | null) => {
    setError(null)

    if (!files || files.length === 0) {
      return
    }

    if (files.length > 1) {
      setError("Only one file is allowed")
      return
    }

    const selectedFile = files[0]

    const validationError = validateFile(selectedFile)
    if (validationError) {
      setError(validationError)
      return
    }

    onFileChange(selectedFile)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <Card
      className={cn(
        "max-w-2xl mx-auto p-6, border-2 border-dashed transition cursor-pointer",
        isDragging ? "border-primary bg-muted" : "border-muted-foreground/30"
      )}
      onClick={() => inputRef.current?.click()}
      onDragOver={e => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept=".csv,text/csv"
        onChange={e => handleFiles(e.target.files)}
      />
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Drag & drop CSV file here, or click to select
        </p>

        <Button
          type="button"
          variant="secondary"
        >
          Choose CSV file
        </Button>

        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>
    </Card>
  )
}

export default Dropzone
