import { Inbox } from 'lucide-react'

export default function EmptyState({ message = 'No tasks here' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 py-10 px-4 text-center animate-fade-in">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.04] text-slate-500">
        <Inbox size={20} strokeWidth={1.75} />
      </div>
      <p className="text-sm font-medium text-slate-500">{message}</p>
    </div>
  )
}
