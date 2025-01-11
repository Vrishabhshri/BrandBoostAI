"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileInfo {
  name: string;
  createdAt: string;
}

export function RecentFilesList() {
  const [files, setFiles] = useState<FileInfo[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/list-files')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (Array.isArray(data)) {
          setFiles(data)
        } else {
          throw new Error('Received data is not an array')
        }
      } catch (error) {
        console.error("Error fetching files:", error)
        setError("Failed to fetch recent files. Please try again later.")
      }
    }

    fetchFiles()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Files</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : files.length > 0 ? (
          <ul className="space-y-2">
            {files.map((file) => (
              <li key={file.name} className="flex justify-between items-center">
                <span>{file.name}</span>
                <Button asChild>
                  <Link href={`/api/view-file?name=${encodeURIComponent(file.name)}`}>
                    View
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent files found.</p>
        )}
      </CardContent>
    </Card>
  )
}

