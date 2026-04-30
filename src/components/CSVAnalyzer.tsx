"use client"

import { useState } from "react"
import Dropzone from "./Dropzone"

const CSVAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null)

  return (
    <div className="space-y-4">
      <Dropzone onFileSelected={setFile} />
      {file && <p>Selected file: {file.name}</p>}
    </div>
  )
}

export default CSVAnalyzer
