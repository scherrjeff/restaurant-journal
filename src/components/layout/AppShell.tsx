import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import AuthGuard from '../auth/AuthGuard'

export default function AppShell() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="mx-auto max-w-2xl px-4 py-6">
          <Outlet />
        </main>
      </div>
    </AuthGuard>
  )
}
