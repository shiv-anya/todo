import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "../TaskCard/TaskCard.jsx";
import SkeletonCard from "../SkeletonCard/SkeletonCard.jsx";
import EmptyState from "../EmptyState/EmptyState.jsx";

export default function Column({
  column,
  tasks,
  isLoading,
  isError,
  onEdit,
  onDelete,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: "column", status: column.id },
  });

  const Icon = column.icon;
  const taskIds = tasks.map((task) => task._id);

  return (
    <div className="flex h-full min-h-0 w-full flex-col rounded-3xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-xl shadow-glass">
      <div
        className={`rounded-t-3xl bg-gradient-to-b ${column.accent} px-4 pt-4 pb-3`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${column.dot}`} />
            <h2 className="text-sm font-semibold text-slate-100">
              {column.title}
            </h2>
            <Icon size={14} className="text-slate-400" />
          </div>
          <span className="inline-flex min-w-[1.75rem] items-center justify-center rounded-full bg-white/[0.08] px-2 py-0.5 text-xs font-semibold text-slate-300">
            {isLoading ? "–" : tasks.length}
          </span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 min-h-[120px] space-y-3 overflow-y-auto rounded-b-3xl p-3 transition-colors duration-150 ${
          isOver ? "bg-white/[0.03]" : ""
        }`}
      >
        {isLoading ? (
          <div className="space-y-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-4 text-center text-xs text-red-300">
            {`Couldn't load tasks for this column.`}
          </div>
        ) : tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <SortableContext
            items={taskIds}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  );
}
