
import React from 'react';
import { Task, Member } from '../types';
import Checkmark from './Checkmark';
import PriorityBadge from './PriorityBadge';
import { MEMBERS } from '../constants';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onClick: (task: Task) => void;
  view: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onClick, view }) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  const assignee = MEMBERS.find(m => m.id === task.assignee);

  return (
    <div
      onClick={() => onClick(task)}
      className={`group flex flex-col p-3 mb-2 bg-white dark:bg-slate-800 border border-[#F6F8F9] dark:border-slate-700/50 rounded-xl transition-all hover:border-blue-200 dark:hover:border-blue-500/50 hover:shadow-lg dark:hover:shadow-blue-500/10 cursor-pointer active:scale-[0.98] ${
        task.completed ? 'opacity-60 grayscale-[0.5]' : ''
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <Checkmark completed={task.completed} onClick={() => onToggle(task.id)} />
        <div className="flex-1 min-w-0">
          <div className={`text-sm text-[#1e1f21] dark:text-slate-100 font-bold leading-snug line-clamp-2 ${task.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
            {task.title}
          </div>
          {task.tags && task.tags.length > 0 && (
             <div className="flex gap-1 mt-1.5 flex-wrap">
               {task.tags.map(t => (
                 <span key={t} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-[9px] font-black uppercase tracking-tighter">#{t}</span>
               ))}
             </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50 dark:border-slate-700/50">
        <div className="flex items-center gap-2">
           <PriorityBadge priority={task.priority} />
           {task.cost && (
             <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800 rounded-full text-[9px] font-black">R$ {task.cost}</span>
           )}
        </div>
        
        <div className="flex items-center gap-3">
          {task.dueDate && (
            <span className={`text-[10px] font-bold ${isOverdue ? 'text-rose-500 dark:text-rose-400' : 'text-slate-400 dark:text-slate-500'}`}>
              {new Date(task.dueDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
            </span>
          )}
          {assignee ? (
            <img src={assignee.avatar} className="w-6 h-6 rounded-full border border-white dark:border-slate-700 shadow-sm" alt={assignee.name} />
          ) : (
            <div className="w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-700 border border-dashed border-slate-200 dark:border-slate-600" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
