interface Props {
  value: number
  onChange?: (value: number) => void
  size?: 'sm' | 'md' | 'lg'
}

const sizeClass = { sm: 'text-base', md: 'text-xl', lg: 'text-2xl' }

export default function RatingStars({ value, onChange, size = 'md' }: Props) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          disabled={!onChange}
          className={`${sizeClass[size]} leading-none ${onChange ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${star <= value ? 'text-orange-400' : 'text-gray-300'}`}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </span>
  )
}
