import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { PRIORITIES } from "../../utils/constants.js";

const EMPTY_FORM = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
};

export default function TaskModal({
  isOpen,
  mode = "create",
  initialTask,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && initialTask) {
      setForm({
        title: initialTask.title ?? "",
        description: initialTask.description ?? "",
        priority: initialTask.priority ?? "medium",
        dueDate: initialTask.dueDate ?? "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setError("");
  }, [isOpen, mode, initialTask]);

  if (!isOpen) return null;

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }
    onSubmit({ ...form, title: form.title.trim() });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md animate-scale-in rounded-3xl border border-white/10 bg-surface-soft/95 p-6 shadow-glass backdrop-blur-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-100">
            {mode === "edit" ? "Edit Task" : "Create Task"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-200"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="task-title"
              className="mb-1.5 block text-xs font-medium text-slate-400"
            >
              Title <span className="text-red-400">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              autoFocus
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g. Design landing page"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors focus:border-accent-soft/60 focus:bg-white/[0.06]"
            />
            {error ? (
              <p className="mt-1.5 text-xs text-red-400">{error}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="task-description"
              className="mb-1.5 block text-xs font-medium text-slate-400"
            >
              Description
            </label>
            <textarea
              id="task-description"
              rows={3}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Optional details..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors focus:border-accent-soft/60 focus:bg-white/[0.06]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="task-priority"
                className="mb-1.5 block text-xs font-medium text-slate-400"
              >
                Priority
              </label>
              <select
                id="task-priority"
                value={form.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-accent-soft/60 focus:bg-white/[0.06]"
              >
                {PRIORITIES.map((p) => (
                  <option
                    key={p.value}
                    value={p.value}
                    className="bg-surface-soft"
                  >
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="task-due-date"
                className="mb-1.5 block text-xs font-medium text-slate-400"
              >
                Due Date
              </label>
              <input
                id="task-due-date"
                type="date"
                value={form.dueDate ? form.dueDate.split("T")[0] : ""}
                onChange={(e) => handleChange("dueDate", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-accent-soft/60 focus:bg-white/[0.06] [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Saving..."
                : mode === "edit"
                ? "Save Changes"
                : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
