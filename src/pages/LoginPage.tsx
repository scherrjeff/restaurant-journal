import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { isMockMode } from '../lib/mockMode'
import LoginForm from '../components/auth/LoginForm'
import LoadingSpinner from '../components/ui/LoadingSpinner'

export default function LoginPage() {
  const { user, loading } = useAuth()

  if (isMockMode) return <Navigate to="/journal" replace />
  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to="/journal" replace />

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-4xl">🍽️</span>
          <h1 className="mt-3 text-2xl font-bold text-gray-900">Restaurant Journal</h1>
          <p className="mt-1 text-sm text-gray-500">Sign in to your personal food diary</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
