export default function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="skeleton-shimmer h-4 w-16 rounded-full animate-shimmer" />
        <div className="skeleton-shimmer h-3 w-10 rounded animate-shimmer" />
      </div>
      <div className="skeleton-shimmer h-4 w-3/4 rounded animate-shimmer" />
      <div className="skeleton-shimmer h-3 w-full rounded animate-shimmer" />
      <div className="skeleton-shimmer h-3 w-1/2 rounded animate-shimmer" />
    </div>
  )
}
