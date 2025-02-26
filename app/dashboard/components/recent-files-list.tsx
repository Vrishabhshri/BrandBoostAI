"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileInfo {
  id: number;
  fileName: string;
  fileType: string;
  description: string;
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
              <li key={file.id} className="flex flex-col space-y-2 p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{file.fileName}</span>
                  <span className="text-sm text-gray-500">{new Date(file.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-600">{file.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                    {file.fileType}
                  </span>
                  <Button asChild size="sm">
                    <Link href={`/dashboard/analyses/${file.id}`}>
                      View
                    </Link>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">No recent files found.</p>
        )}
      </CardContent>
    </Card>
  )
}

