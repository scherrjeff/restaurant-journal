const colors = [
  'bg-orange-100 text-orange-700',
  'bg-green-100 text-green-700',
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700',
  'bg-yellow-100 text-yellow-700',
]

function colorFor(cuisine: string) {
  let hash = 0
  for (const ch of cuisine) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffff
  return colors[hash % colors.length]
}

export default function CuisineTag({ cuisine }: { cuisine: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorFor(cuisine)}`}>
      {cuisine}
    </span>
  )
}
