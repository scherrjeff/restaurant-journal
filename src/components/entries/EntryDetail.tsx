import type { LogEntryWithDishes } from '../../types'
import RatingStars from '../ui/RatingStars'
import CuisineTag from '../ui/CuisineTag'
import OccasionBadge from '../ui/OccasionBadge'

export default function EntryDetail({ entry }: { entry: LogEntryWithDishes }) {
  const date = new Date(entry.visit_date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{entry.restaurant_name}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{date}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <RatingStars value={entry.overall_rating} size="lg" />
        {entry.cuisine_type && <CuisineTag cuisine={entry.cuisine_type} />}
        {entry.occasion && <OccasionBadge occasion={entry.occasion} />}
        {entry.would_return && (
          <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
            ↩ Would return
          </span>
        )}
      </div>

      {entry.notes && (
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Notes</h2>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{entry.notes}</p>
        </div>
      )}

      {entry.dishes.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Dishes</h2>
          <ul className="space-y-2">
            {entry.dishes.map(dish => (
              <li key={dish.id} className="rounded-lg border border-gray-200 bg-white px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-gray-800">{dish.dish_name}</span>
                  {dish.rating && <RatingStars value={dish.rating} size="sm" />}
                </div>
                {dish.notes && <p className="mt-0.5 text-xs text-gray-500">{dish.notes}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
