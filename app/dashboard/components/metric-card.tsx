import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  change: number
  className?: string
}

export function MetricCard({ title, value, change, className }: MetricCardProps) {
  const isPositive = change > 0
  
  return (
    <div className={cn("rounded-lg bg-zinc-800 p-4", className)}>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium text-zinc-400">{title}</h3>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-semibold text-white">{value}</p>
          <span
            className={cn(
              "text-xs font-medium",
              isPositive ? "text-green-500" : "text-red-500"
            )}
          >
            {isPositive ? "+" : ""}{change}%
          </span>
        </div>
      </div>
    </div>
  )
}

