import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  competitor?: string
  className?: string
}

export function MetricCard({ title, value, className }: MetricCardProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-gray-600">{title}</h4>
      <p className={`text-lg font-semibold mt-1 ${className}`}>{value}</p>
    </div>
  )
}

