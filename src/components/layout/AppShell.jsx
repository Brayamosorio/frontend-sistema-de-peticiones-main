import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AppShell({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--fesc-bg)' }}>
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Topbar */}
        <Topbar onMenuClick={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
