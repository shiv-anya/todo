import { useRef } from 'react'
import Header from '../components/Header/Header.jsx'
import Board from '../components/Board/Board.jsx'

export default function TaskBoardPage() {
  const boardRef = useRef(null)

  function handleAddTask() {
    boardRef.current?.openCreateModal('todo')
  }

  return (
    <div className="mx-auto flex h-screen max-w-7xl flex-col gap-5 p-4 sm:p-6">
      <Header onAddTask={handleAddTask} />
      <Board ref={boardRef} />
    </div>
  )
}
