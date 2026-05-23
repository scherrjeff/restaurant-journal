import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { isMockMode } from '../lib/mockMode'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const features = [
  {
    icon: '📝',
    title: 'Log every meal',
    description:
      'Rate restaurants, tag occasions, and capture notes while the memory is still fresh.',
  },
  {
    icon: '🍽️',
    title: 'Track your dishes',
    description:
      'Record individual dishes per visit so you always know what to order on your next trip.',
  },
  {
    icon: '⭐',
    title: 'Rate & remember',
    description:
      'Star ratings and cuisine tags make it easy to browse your history and share recommendations.',
  },
]

export default function LandingPage() {
  const { user, loading } = useAuth()

  if (isMockMode) return <Navigate to="/journal" replace />
  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to="/journal" replace />

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          <span className="text-lg font-bold text-[#d716f9] tracking-tight">
            🍽️ Restaurant Journal
          </span>
          <Link
            to="/login"
            className="rounded-lg bg-[#d716f9] px-4 py-2 text-sm font-medium text-white hover:bg-[#c010e0] transition-colors"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <span className="text-6xl">🍽️</span>
        <h1 className="mt-6 text-4xl font-bold text-gray-900 sm:text-5xl">
          Your personal{' '}
          <span className="text-[#d716f9]">restaurant diary</span>
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
          Log meals, rate dishes, and remember every great dining experience —
          all in one beautiful place.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/login"
            className="rounded-lg bg-[#d716f9] px-6 py-3 text-base font-semibold text-white hover:bg-[#c010e0] transition-colors shadow-sm"
          >
            Start your journal →
          </Link>
          <span className="text-sm text-gray-400">Free, no credit card needed</span>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map(f => (
            <div
              key={f.title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="mt-3 font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Ready to start logging?
          </h2>
          <p className="mt-2 text-gray-500">
            Join food lovers who never forget a great meal.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-block rounded-lg bg-[#d716f9] px-6 py-3 text-base font-semibold text-white hover:bg-[#c010e0] transition-colors"
          >
            Get started free
          </Link>
        </div>
      </section>
    </div>
  )
}
