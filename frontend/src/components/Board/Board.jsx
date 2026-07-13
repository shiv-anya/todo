import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { reorder } from "../../utils/helpers.js";
import Column from "../Column/Column.jsx";
import TaskCard from "../TaskCard/TaskCard.jsx";
import TaskModal from "../TaskModal/TaskModal.jsx";
import { COLUMNS } from "../../utils/constants.js";
import { useColumnTasks } from "../../hooks/useColumnTasks.js";
import { useTaskMutations } from "../../hooks/useTaskMutations.js";
import { useReorderTasks } from "../../hooks/useReorderTasks.js";

const Board = forwardRef(function Board(_props, ref) {
  const todoQuery = useColumnTasks("todo");
  const pendingQuery = useColumnTasks("pending");
  const completedQuery = useColumnTasks("completed");

  const queries = {
    todo: todoQuery,
    pending: pendingQuery,
    completed: completedQuery,
  };

  const [board, setBoard] = useState({ todo: [], pending: [], completed: [] });

  const [activeTask, setActiveTask] = useState(null);
  const dragSourceStatus = useRef(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "create",
    task: null,
    defaultStatus: "todo",
  });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { create, update, remove } = useTaskMutations();
  const reorderMutation = useReorderTasks();

  useEffect(() => {
    if (todoQuery.data) setBoard((prev) => ({ ...prev, todo: todoQuery.data }));
  }, [todoQuery.data]);

  useEffect(() => {
    if (pendingQuery.data)
      setBoard((prev) => ({ ...prev, pending: pendingQuery.data }));
  }, [pendingQuery.data]);

  useEffect(() => {
    if (completedQuery.data)
      setBoard((prev) => ({ ...prev, completed: completedQuery.data }));
  }, [completedQuery.data]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  function findColumnOf(taskId) {
    return COLUMNS.map((c) => c.id).find((status) =>
      board[status].some((task) => task._id === taskId)
    );
  }

  function handleDragStart(event) {
    const { active } = event;

    const status = findColumnOf(active.id);
    dragSourceStatus.current = status;

    const task = board[status].find((t) => t._id === active.id);
    setActiveTask(task);
  }

  function handleDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeStatus = findColumnOf(active.id);
    const overStatus =
      over.data?.current?.type === "column" ? over.id : findColumnOf(over.id);

    if (!activeStatus || !overStatus || activeStatus === overStatus) return;

    setBoard((prev) => {
      const sourceItems = [...prev[activeStatus]];
      const destItems = [...prev[overStatus]];
      const activeIndex = sourceItems.findIndex((t) => t._id === active.id);
      if (activeIndex === -1) return prev;

      const [movedTask] = sourceItems.splice(activeIndex, 1);
      const overIndex = destItems.findIndex((t) => t._id === over.id);
      const insertAt = overIndex === -1 ? destItems.length : overIndex;

      destItems.splice(insertAt, 0, { ...movedTask, status: overStatus });

      return { ...prev, [activeStatus]: sourceItems, [overStatus]: destItems };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    setActiveTask(null);

    if (!over) return;

    const sourceStatus = dragSourceStatus.current;
    const destinationStatus =
      over.data?.current?.type === "column" ? over.id : findColumnOf(over.id);

    if (!sourceStatus || !destinationStatus) return;

    const nextBoard = {
      todo: [...board.todo],
      pending: [...board.pending],
      completed: [...board.completed],
    };

    if (sourceStatus === destinationStatus) {
      const items = nextBoard[sourceStatus];

      const activeIndex = items.findIndex((task) => task._id === active.id);

      const overIndex =
        over.data?.current?.type === "column"
          ? items.length - 1
          : items.findIndex((task) => task._id === over.id);

      if (activeIndex === -1 || overIndex === -1) {
        dragSourceStatus.current = null;
        return;
      }

      nextBoard[sourceStatus] = reorder(items, activeIndex, overIndex);

      setBoard(nextBoard);

      reorderMutation.mutate({
        taskId: active.id,
        sourceStatus,
        destinationStatus,
        sourceIds: nextBoard[sourceStatus].map((task) => task._id),
        destinationIds: nextBoard[sourceStatus].map((task) => task._id),
      });

      dragSourceStatus.current = null;
      return;
    }

    reorderMutation.mutate({
      taskId: active.id,
      sourceStatus,
      destinationStatus,
      sourceIds: board[sourceStatus].map((task) => task._id),
      destinationIds: board[destinationStatus].map((task) => task._id),
    });

    dragSourceStatus.current = null;
  }
  function openCreateModal(status = "todo") {
    setModalState({
      isOpen: true,
      mode: "create",
      task: null,
      defaultStatus: status,
    });
  }

  useImperativeHandle(ref, () => ({
    openCreateModal,
  }));

  function openEditModal(task) {
    setModalState({
      isOpen: true,
      mode: "edit",
      task,
      defaultStatus: task.status,
    });
  }

  function closeModal() {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }

  function handleModalSubmit(formValues) {
    if (modalState.mode === "edit" && modalState.task) {
      const taskId = modalState.task._id;
      const previousStatus = modalState.task.status;
      update.mutate(
        {
          id: taskId,
          updates: formValues,
          previousStatus,
        },
        {
          onSuccess: (updatedTask) => {
            if (previousStatus === updatedTask.status) {
              setBoard((prev) => ({
                ...prev,
                [previousStatus]: prev[previousStatus].map((task) =>
                  task._id === updatedTask._id ? updatedTask : task
                ),
              }));
            } else {
              setBoard((prev) => ({
                ...prev,
                [previousStatus]: prev[previousStatus].filter(
                  (task) => task._id !== updatedTask._id
                ),
                [updatedTask.status]: [
                  ...prev[updatedTask.status],
                  updatedTask,
                ],
              }));
            }

            closeModal();
          },
        }
      );
    } else {
      const status = modalState.defaultStatus;

      create.mutate(
        {
          ...formValues,
          status,
        },
        {
          onSuccess: (newTask) => {
            setBoard((prev) => ({
              ...prev,
              [status]: [...prev[status], newTask],
            }));

            closeModal();
          },
        }
      );
    }
  }

  function requestDelete(task) {
    setDeleteTarget(task);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    const { _id: id, status } = deleteTarget;
    remove.mutate(
      { id, status },
      {
        onSuccess: () => {
          setBoard((prev) => ({
            ...prev,
            [status]: prev[status].filter((t) => t._id !== id),
          }));
          setDeleteTarget(null);
        },
      }
    );
  }

  const isSubmitting = create.isPending || update.isPending;

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid flex-1 min-h-0 grid-cols-1 gap-5 md:grid-cols-3">
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={board[column.id]}
              isLoading={queries[column.id].isLoading}
              isError={queries[column.id].isError}
              onEdit={openEditModal}
              onDelete={requestDelete}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard
              task={activeTask}
              onEdit={() => {}}
              onDelete={() => {}}
              isOverlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        initialTask={modalState.task}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        isSubmitting={isSubmitting}
      />

      {deleteTarget ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setDeleteTarget(null);
          }}
        >
          <div className="w-full max-w-sm animate-scale-in rounded-3xl border border-white/10 bg-surface-soft/95 p-6 shadow-glass backdrop-blur-2xl">
            <h3 className="text-base font-semibold text-slate-100">
              Delete task?
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              {`"${deleteTarget.title}" will be permanently removed. This can't be
              undone.`}
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={remove.isPending}
                className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-400 disabled:opacity-60"
              >
                {remove.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
});

export default Board;
