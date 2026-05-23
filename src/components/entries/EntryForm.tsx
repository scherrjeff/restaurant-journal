import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { EntryFormSchema, type EntryFormValues, type LogEntryWithDishes } from '../../types'
import { useCreateLogEntry, useUpdateLogEntry } from '../../hooks/useLogEntries'
import RatingStars from '../ui/RatingStars'
import DishList from '../dishes/DishList'
import ErrorMessage from '../ui/ErrorMessage'

const CUISINE_OPTIONS = [
  'American', 'Chinese', 'French', 'Indian', 'Italian', 'Japanese',
  'Korean', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Thai', 'Vietnamese',
]

const OCCASION_OPTIONS = ['Date night', 'Solo', 'With friends', 'Family', 'Business lunch', 'Celebration', 'Other']

interface Props {
  entry?: LogEntryWithDishes
  onCancel?: () => void
}

export default function EntryForm({ entry, onCancel }: Props) {
  const navigate = useNavigate()
  const createEntry = useCreateLogEntry()
  const updateEntry = useUpdateLogEntry()

  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<EntryFormValues>({
    resolver: zodResolver(EntryFormSchema),
    defaultValues: entry
      ? {
          restaurant_name: entry.restaurant_name,
          visit_date: entry.visit_date,
          cuisine_type: entry.cuisine_type ?? null,
          overall_rating: entry.overall_rating,
          notes: entry.notes ?? null,
          occasion: entry.occasion ?? null,
          would_return: entry.would_return,
          dishes: entry.dishes.map(d => ({
            id: d.id,
            dish_name: d.dish_name,
            rating: d.rating,
            notes: d.notes,
          })),
        }
      : {
          restaurant_name: '',
          visit_date: new Date().toISOString().split('T')[0],
          cuisine_type: null,
          overall_rating: 0,
          notes: null,
          occasion: null,
          would_return: true,
          dishes: [],
        },
  })

  const overallRating = watch('overall_rating')
  const wouldReturn = watch('would_return')
  const isEdit = !!entry
  const isPending = createEntry.isPending || updateEntry.isPending
  const mutationError = createEntry.error || updateEntry.error

  async function onSubmit(values: EntryFormValues) {
    if (isEdit && entry) {
      await updateEntry.mutateAsync({ id: entry.id, values })
      onCancel?.()
    } else {
      const newEntry = await createEntry.mutateAsync(values)
      navigate(`/entry/${newEntry.id}`)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {mutationError && <ErrorMessage message={(mutationError as Error).message} />}

      {/* Restaurant name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant *</label>
        <input
          {...register('restaurant_name')}
          placeholder="Restaurant name"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        {errors.restaurant_name && <p className="mt-1 text-xs text-red-600">{errors.restaurant_name.message}</p>}
      </div>

      {/* Date + Cuisine row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
          <input
            {...register('visit_date')}
            type="date"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine</label>
          <input
            {...register('cuisine_type')}
            list="cuisine-options"
            placeholder="e.g. Italian"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <datalist id="cuisine-options">
            {CUISINE_OPTIONS.map(c => <option key={c} value={c} />)}
          </datalist>
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Overall rating *</label>
        <RatingStars
          value={overallRating}
          onChange={v => setValue('overall_rating', v, { shouldValidate: true })}
          size="lg"
        />
        {errors.overall_rating && <p className="mt-1 text-xs text-red-600">{errors.overall_rating.message}</p>}
      </div>

      {/* Occasion + Would return row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Occasion</label>
          <select
            {...register('occasion')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
          >
            <option value="">Select…</option>
            {OCCASION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="flex flex-col justify-end pb-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={wouldReturn}
              onChange={e => setValue('would_return', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            <span className="text-sm font-medium text-gray-700">Would return</span>
          </label>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          {...register('notes')}
          rows={3}
          placeholder="How was the experience?"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Dishes */}
      <DishList control={control} register={register} setValue={setValue} watch={watch} />

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50 transition-colors"
        >
          {isPending ? 'Saving…' : isEdit ? 'Save changes' : 'Log meal'}
        </button>
      </div>
    </form>
  )
}
