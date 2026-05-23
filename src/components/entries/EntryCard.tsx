import { Link } from 'react-router-dom'
import type { LogEntryWithDishes } from '../../types'
import RatingStars from '../ui/RatingStars'
import CuisineTag from '../ui/CuisineTag'
import OccasionBadge from '../ui/OccasionBadge'

export default function EntryCard({ entry }: { entry: LogEntryWithDishes }) {
  const date = new Date(entry.visit_date + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })

  return (
    <Link
      to={`/entry/${entry.id}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md hover:border-orange-200 transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{entry.restaurant_name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{date}</p>
        </div>
        <RatingStars value={entry.overall_rating} size="sm" />
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {entry.cuisine_type && <CuisineTag cuisine={entry.cuisine_type} />}
        {entry.occasion && <OccasionBadge occasion={entry.occasion} />}
        {entry.would_return && (
          <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
            ↩ Would return
          </span>
        )}
      </div>

      {entry.notes && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{entry.notes}</p>
      )}

      {entry.dishes.length > 0 && (
        <p className="mt-2 text-xs text-gray-400">
          {entry.dishes.length} dish{entry.dishes.length !== 1 ? 'es' : ''} logged
        </p>
      )}
    </Link>
  )
}
