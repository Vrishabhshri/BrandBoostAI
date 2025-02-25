"use client"

import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CompetitorForm } from "./competitor-form"

interface AddCompetitorButtonProps {
  onLoadCompetitor: (competitor: any) => void;
}

export function AddCompetitorButton({ onLoadCompetitor }: AddCompetitorButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="h-[300px] w-full border-2 border-dashed border-zinc-700 bg-transparent hover:bg-zinc-800/50 hover:border-zinc-600"
        >
          <div className="flex flex-col items-center gap-2 text-zinc-400">
            <Plus className="h-6 w-6" />
            <span>Add competitor</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Create new competitor</DialogTitle>
        </DialogHeader>
        <CompetitorForm onLoadCompetitor={onLoadCompetitor} />
      </DialogContent>
    </Dialog>
  )
}

