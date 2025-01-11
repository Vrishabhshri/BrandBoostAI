import { AddCompetitorForm } from "../components/add-competitor-form"
import { RecentFilesList } from "../components/recent-files-list"


export default function ContentBuilder() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddCompetitorForm />
        <RecentFilesList />
      </div>
    </div>
  )
}

