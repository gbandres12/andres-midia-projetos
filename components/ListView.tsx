
import React, { useState } from 'react';
import { Column, Task } from '../types';
import TaskItem from './TaskItem';

interface ListViewProps {
  columns: Column[];
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onAddTask: (columnId: string, title: string) => void;
  onTaskClick: (task: Task) => void;
}

const ListView: React.FC<ListViewProps> = ({ columns, tasks, onToggleTask, onAddTask, onTaskClick }) => {
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddSubmit = (columnId: string) => {
    if (newTaskTitle.trim()) {
      onAddTask(columnId, newTaskTitle.trim());
      setNewTaskTitle('');
      setAddingTo(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-800/50 p-6 transition-colors shadow-sm">
      {columns.map((column) => (
        <div key={column.id} className="mb-8 last:mb-0">
          <div className="flex items-center gap-2 px-2 py-2 border-b border-slate-100 dark:border-slate-800 mb-2">
            <svg className="w-4 h-4 text-slate-400 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">{column.title}</h3>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-full">
              {tasks.filter((t) => t.columnId === column.id).length}
            </span>
          </div>

          <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {tasks
              .filter((t) => t.columnId === column.id)
              .map((task) => (
                <TaskItem key={task.id} task={task} onToggle={onToggleTask} onClick={onTaskClick} view="List" />
              ))}
            
            <div className="px-1 mt-2">
              {addingTo === column.id ? (
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg shadow-sm">
                  <div className="w-4 h-4 rounded-full border border-slate-200 dark:border-slate-600"></div>
                  <input
                    autoFocus
                    className="flex-1 text-sm outline-none bg-transparent dark:text-slate-100"
                    placeholder="Nome da tarefa..."
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
                  className="flex items-center gap-3 w-full p-3 text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-xl transition-all group"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Adicionar Tarefa
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListView;
