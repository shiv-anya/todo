import { Flame, TrendingUp, Leaf } from 'lucide-react'

const VARIANTS = {
  low: {
    label: 'Low',
    icon: Leaf,
    classes: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/30 shadow-glow-green',
  },
  medium: {
    label: 'Medium',
    icon: TrendingUp,
    classes: 'text-amber-300 bg-amber-400/10 border-amber-400/30 shadow-glow-amber',
  },
  high: {
    label: 'High',
    icon: Flame,
    classes: 'text-red-300 bg-red-400/10 border-red-400/30 shadow-glow-red',
  },
}

export default function PriorityBadge({ priority = 'medium' }) {
  const variant = VARIANTS[priority] ?? VARIANTS.medium
  const Icon = variant.icon

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${variant.classes}`}
    >
      <Icon size={11} strokeWidth={2.5} />
      {variant.label}
    </span>
  )
}
