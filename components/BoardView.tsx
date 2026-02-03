
import React, { useState } from 'react';
import { Column, Task } from '../types';
import TaskItem from './TaskItem';

interface BoardViewProps {
  columns: Column[];
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onAddTask: (columnId: string, title: string) => void;
  onMoveTask: (taskId: string, targetColumnId: string) => void;
  onTaskClick: (task: Task) => void;
}

const BoardView: React.FC<BoardViewProps> = ({ columns, tasks, onToggleTask, onAddTask, onMoveTask, onTaskClick }) => {
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddSubmit = (columnId: string) => {
    if (newTaskTitle.trim()) {
      onAddTask(columnId, newTaskTitle.trim());
      setNewTaskTitle('');
      setAddingTo(null);
    }
  };

  const onDragOver = (e: React.DragEvent) => e.preventDefault();
  const onDragStart = (e: React.DragEvent, taskId: string) => e.dataTransfer.setData('taskId', taskId);
  const onDrop = (e: React.DragEvent, columnId: string) => onMoveTask(e.dataTransfer.getData('taskId'), columnId);

  return (
    <div className="flex h-full gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
      {columns.map((column) => (
        <div
          key={column.id}
          className="flex-shrink-0 w-80 flex flex-col bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-slate-800 p-3 shadow-sm transition-colors"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, column.id)}
        >
          <div className="flex items-center justify-between px-2 mb-4">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.1em]">
              {column.title}
              <span className="ml-2 text-slate-300 dark:text-slate-600 font-normal">
                {tasks.filter((t) => t.columnId === column.id).length}
              </span>
            </h3>
            <button className="text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto min-h-[50px] space-y-2">
            {tasks
              .filter((t) => t.columnId === column.id)
              .map((task) => (
                <div key={task.id} draggable onDragStart={(e) => onDragStart(e, task.id)}>
                  <TaskItem task={task} onToggle={onToggleTask} onClick={onTaskClick} view="Board" />
                </div>
              ))}

            {addingTo === column.id ? (
              <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
                <input
                  autoFocus
                  className="w-full text-sm outline-none bg-transparent dark:text-white"
                  placeholder="O que precisa ser feito?"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddSubmit(column.id);
                    if (e.key === 'Escape') setAddingTo(null);
                  }}
                  onBlur={() => handleAddSubmit(column.id)}
                />
              </div>
            ) : (
              <button
                onClick={() => setAddingTo(column.id)}
                className="flex items-center gap-2 w-full p-2.5 text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-xl transition-all group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Adicionar Tarefa
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardView;
