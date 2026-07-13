import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    status: {
      type: String,
      enum: ["todo", "pending", "completed"],
      default: "todo",
    },
    order: { type: Number, default: 0 },
    dueDate: Date,
  },
  { timestamps: true }
);
export default mongoose.model("Task", taskSchema);
