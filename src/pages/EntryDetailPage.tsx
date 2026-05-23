import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useLogEntry, useDeleteLogEntry } from '../hooks/useLogEntries'
import EntryDetail from '../components/entries/EntryDetail'
import EntryForm from '../components/entries/EntryForm'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorMessage from '../components/ui/ErrorMessage'
import ConfirmDialog from '../components/ui/ConfirmDialog'

export default function EntryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: entry, isLoading, error } = useLogEntry(id!)
  const deleteEntry = useDeleteLogEntry()
  const [editing, setEditing] = useState(false)
  const [confirming, setConfirming] = useState(false)

  if (isLoading) return <LoadingSpinner />
  if (error || !entry) return <ErrorMessage message={(error as Error)?.message ?? 'Entry not found'} />

  async function handleDelete() {
    await deleteEntry.mutateAsync(entry!.id)
    navigate('/')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">← Back</Link>
        {!editing && (
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => setConfirming(true)}
              className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        {editing ? (
          <EntryForm entry={entry} onCancel={() => setEditing(false)} />
        ) : (
          <EntryDetail entry={entry} />
        )}
      </div>

      {confirming && (
        <ConfirmDialog
          title="Delete this entry?"
          description={`"${entry.restaurant_name}" and all its dishes will be permanently deleted.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirming(false)}
          loading={deleteEntry.isPending}
        />
      )}
    </div>
  )
}
