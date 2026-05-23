import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import type { EntryFormValues } from '../../types'
import RatingStars from '../ui/RatingStars'

interface Props {
  index: number
  register: UseFormRegister<EntryFormValues>
  setValue: UseFormSetValue<EntryFormValues>
  watch: UseFormWatch<EntryFormValues>
  onRemove: () => void
}

export default function DishForm({ index, register, setValue, watch, onRemove }: Props) {
  const rating = watch(`dishes.${index}.rating`)

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 space-y-2">
      <div className="flex items-start gap-2">
        <input
          {...register(`dishes.${index}.dish_name`)}
          placeholder="Dish name"
          className="flex-1 rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={onRemove}
          className="mt-0.5 text-gray-400 hover:text-red-500 transition-colors text-lg leading-none"
          aria-label="Remove dish"
        >
          ×
        </button>
      </div>
      <div className="flex items-center gap-3">
        <RatingStars
          value={rating ?? 0}
          onChange={v => setValue(`dishes.${index}.rating`, v === rating ? null : v)}
          size="sm"
        />
        {rating && (
          <button
            type="button"
            onClick={() => setValue(`dishes.${index}.rating`, null)}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            clear
          </button>
        )}
      </div>
      <input
        {...register(`dishes.${index}.notes`)}
        placeholder="Notes (optional)"
        className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      />
    </div>
  )
}
