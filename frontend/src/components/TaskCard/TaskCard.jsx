import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Trash2, Calendar, GripVertical } from "lucide-react";
import PriorityBadge from "../PriorityBadge/PriorityBadge.jsx";
import { formatDueDate } from "../../utils/helpers.js";

const DUE_STATE_CLASSES = {
  overdue: "text-red-300",
  today: "text-amber-300",
  upcoming: "text-slate-400",
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  isOverlay = false,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: { type: "task", task },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const due = formatDueDate(task.dueDate);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative rounded-2xl border border-white/[0.07] bg-white/[0.045] p-4 shadow-card backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-white/[0.12] ${
        isDragging ? "opacity-40" : "opacity-100"
      } ${isOverlay ? "rotate-2 shadow-glow scale-105" : ""}`}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          className="mt-0.5 shrink-0 cursor-grab touch-none text-slate-600 transition-colors hover:text-slate-300 active:cursor-grabbing"
          aria-label="Drag task"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={16} />
        </button>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold leading-snug text-slate-100 break-words">
              {task.title}
            </h3>
            <PriorityBadge priority={task.priority} />
          </div>

          {task.description ? (
            <p className="text-xs leading-relaxed text-slate-400 line-clamp-2">
              {task.description}
            </p>
          ) : null}

          <div className="flex items-center justify-between pt-1">
            {due ? (
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                  DUE_STATE_CLASSES[due.state]
                }`}
              >
                <Calendar size={12} />
                {due.label}
              </span>
            ) : (
              <span className="text-[11px] text-slate-600">No due date</span>
            )}

            <div className="flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => onEdit(task)}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-indigo-300"
                aria-label="Edit task"
              >
                <Pencil size={13} />
              </button>
              <button
                type="button"
                onClick={() => onDelete(task)}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                aria-label="Delete task"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
