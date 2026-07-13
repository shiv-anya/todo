export function generateId() {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function formatDueDate(dateString) {
  if (!dateString) return null;
  const date = new Date(`${dateString}`);
  if (Number.isNaN(date.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((date - today) / (1000 * 60 * 60 * 24));

  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  if (diffDays === 0) return { label: "Today", formatted, state: "today" };
  if (diffDays === 1)
    return { label: "Tomorrow", formatted, state: "upcoming" };
  if (diffDays < 0) return { label: formatted, formatted, state: "overdue" };
  return { label: formatted, formatted, state: "upcoming" };
}

export function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}
