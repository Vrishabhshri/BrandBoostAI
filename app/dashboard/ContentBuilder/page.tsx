"use client"

import { NavHeader } from "../components/nav-header"
import { AddCompetitorForm } from "../components/add-competitor-form"

export default function ContentBuilder() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-900">
      <NavHeader />
      <div className="flex flex-1">
        
        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-white">
              Content Builder
            </h1>
          </div>
          
          <div className="grid grid-cols-1 ">
            <AddCompetitorForm />
          </div>
        </main>
      </div>
    </div>
  )
}

