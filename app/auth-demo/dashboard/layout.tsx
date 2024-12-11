import NavHeader from "./components/nav-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-900">
      <NavHeader />
      <main className="p-6">
        {children}
      </main>
    </div>
  )
} 