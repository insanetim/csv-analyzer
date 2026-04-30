"use client"

import { useState } from "react"
import Dropzone from "./Dropzone"

const CSVAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null)

  return (
    <div className="space-y-4">
      <Dropzone
        file={file}
        onFileSelected={setFile}
      />
    </div>
  )
}

export default CSVAnalyzer
