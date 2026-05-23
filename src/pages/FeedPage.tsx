import { Link } from 'react-router-dom'
import { useLogEntriesFeed } from '../hooks/useLogEntries'
import EntryCard from '../components/entries/EntryCard'
import EmptyState from '../components/ui/EmptyState'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorMessage from '../components/ui/ErrorMessage'

export default function FeedPage() {
  const { data: entries, isLoading, error } = useLogEntriesFeed()

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={(error as Error).message} />

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-900">My Journal</h1>
        <Link
          to="/new"
          className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
        >
          + Log meal
        </Link>
      </div>

      {!entries || entries.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {entries.map(entry => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  )
}
