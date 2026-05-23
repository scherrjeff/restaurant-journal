import { Link } from 'react-router-dom'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <span className="text-5xl mb-4">🍽️</span>
      <h2 className="text-xl font-semibold text-gray-800 mb-1">No meals logged yet</h2>
      <p className="text-sm text-gray-500 mb-6">Start building your restaurant journal.</p>
      <Link
        to="/new"
        className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
      >
        Log your first meal
      </Link>
    </div>
  )
}
