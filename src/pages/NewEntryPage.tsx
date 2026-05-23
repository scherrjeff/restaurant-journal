import { Link } from 'react-router-dom'
import EntryForm from '../components/entries/EntryForm'

export default function NewEntryPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">← Back</Link>
        <h1 className="text-xl font-bold text-gray-900">Log a meal</h1>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <EntryForm />
      </div>
    </div>
  )
}
