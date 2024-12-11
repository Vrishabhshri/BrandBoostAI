interface StatCardProps {
  label: string
  value: string | number
  change?: {
    value: number
    isPositive: boolean
  }
}

export default function StatCard({ label, value, change }: StatCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-400">{label}</h3>
        {change && (
          <span className={`text-sm ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {change.isPositive ? '+' : ''}{change.value}%
          </span>
        )}
      </div>
      <p className="text-2xl font-semibold text-white mt-1">
        {value.toLocaleString()}
      </p>
    </div>
  )
} 