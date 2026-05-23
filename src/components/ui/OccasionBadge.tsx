export default function OccasionBadge({ occasion }: { occasion: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
      {occasion}
    </span>
  )
}
