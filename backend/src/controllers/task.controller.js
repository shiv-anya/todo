import Task from "../models/Task.js";
export const getTasks = async (req, res) => {
  try {
    const [notStarted, pending, completed] = await Promise.all([
      Task.find({ status: "todo" }).sort({ order: 1 }),
      Task.find({ status: "pending" }).sort({ order: 1 }),
      Task.find({ status: "completed" }).sort({ order: 1 }),
    ]);

    res.json({
      todo: notStarted,
      pending,
      completed,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const createTask = async (req, res) => {
  const count = await Task.countDocuments({
    status: req.body.status || "todo",
  });
  const t = await Task.create({ ...req.body, order: count });
  res.status(201).json(t);
};
export const updateTask = async (req, res) =>
  res.json(
    await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
export const reorderTask = async (req, res) => {
  try {
    const {
      taskId,
      sourceStatus,
      destinationStatus,
      sourceIds,
      destinationIds,
    } = req.body;

    const operations = [];

    sourceIds.forEach((id, index) => {
      operations.push({
        updateOne: {
          filter: { _id: id },
          update: {
            order: index,
          },
        },
      });
    });

    destinationIds.forEach((id, index) => {
      operations.push({
        updateOne: {
          filter: { _id: id },
          update: {
            order: index,
            ...(sourceStatus !== destinationStatus && {
              status: destinationStatus,
            }),
          },
        },
      });
    });

    await Task.bulkWrite(operations);

    res.status(200).json({
      message: "Tasks reordered successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
