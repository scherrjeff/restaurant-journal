import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { isMockMode } from '../../lib/mockMode'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (isMockMode) return <>{children}</>
  if (loading) return <LoadingSpinner />
  if (!user) return <Navigate to="/login" replace />

  return <>{children}</>
}
