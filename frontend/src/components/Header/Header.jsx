import { Plus, LayoutGrid } from 'lucide-react'

export default function Header({ onAddTask }) {
  return (
    <header className="glass-panel sticky top-0 z-30 flex items-center justify-between rounded-2xl px-5 py-4 shadow-card">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent-soft shadow-glow">
          <LayoutGrid size={18} strokeWidth={2.25} />
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight text-slate-100 sm:text-lg">Task Board</h1>
          <p className="hidden text-xs text-slate-500 sm:block">Organize work across your workflow</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onAddTask}
        className="flex items-center gap-1.5 rounded-xl bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:bg-accent-soft hover:shadow-lg active:scale-[0.98]"
      >
        <Plus size={16} strokeWidth={2.5} />
        <span className="hidden sm:inline">Add Task</span>
      </button>
    </header>
  )
}
