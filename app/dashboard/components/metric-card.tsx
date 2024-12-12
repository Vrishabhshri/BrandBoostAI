import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  change: number
  competitor?: string
}

export const MetricCard = ({
  title,
  value,
  change,
  competitor
}: MetricCardProps) => {
  return (
    <div className="rounded-lg bg-zinc-800 p-4">
      <h3 className="text-sm font-medium text-zinc-400">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-white">{value}</p>
        <span className={`ml-2 text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      </div>
      {competitor && (
        <p className="mt-2 text-sm text-zinc-500">{competitor}</p>
      )}
    </div>
  )
}

