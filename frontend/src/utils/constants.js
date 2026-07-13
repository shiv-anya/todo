import { ListTodo, Clock3, CheckCircle2 } from "lucide-react";

// Canonical column definitions. Order here controls render order on the board.
export const COLUMNS = [
  {
    id: "todo",
    title: "ToDo List",
    icon: ListTodo,
    accent: "from-indigo-500/20 to-indigo-500/0",
    dot: "bg-indigo-400",
  },
  {
    id: "pending",
    title: "Pending",
    icon: Clock3,
    accent: "from-amber-500/20 to-amber-500/0",
    dot: "bg-amber-400",
  },
  {
    id: "completed",
    title: "Completed",
    icon: CheckCircle2,
    accent: "from-emerald-500/20 to-emerald-500/0",
    dot: "bg-emerald-400",
  },
];

export const COLUMN_IDS = COLUMNS.map((c) => c.id);

export const PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];
