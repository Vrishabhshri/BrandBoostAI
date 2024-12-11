import StatCard from "./components/stat-card"
import ChatInterface from "./components/chat-interface"

export default function Dashboard() {
  const stats = [
    { label: "Followers", value: 45231, change: { value: 20.1, isPositive: true } },
    { label: "Engagement", value: 23571, change: { value: 12.3, isPositive: true } },
    { label: "Post Reach", value: 95211, change: { value: 10.5, isPositive: true } },
    { label: "Brand Mentions", value: 1232, change: { value: 8.2, isPositive: false } },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white mb-2">Overview</h1>
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Social Media Performance
          </h2>
          <p className="text-gray-400">Engagement across platforms</p>
          {/* Add chart component here */}
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Recent Posts
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
                <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                  📸
                </div>
                <div>
                  <h3 className="text-white font-medium">Summer collection launch</h3>
                  <p className="text-sm text-gray-400">2.3K engagements • 15K reach</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ChatInterface />
    </div>
  )
} 