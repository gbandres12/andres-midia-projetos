
import React from 'react';
import { Priority } from '../types';

interface PriorityBadgeProps {
  priority: Priority;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const styles = {
    'Crítica': 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800 shadow-sm animate-pulse',
    'Urgente': 'bg-[#FFECEE] text-[#D22D2D] border-[#FFD5D9] dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900',
    'Média': 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
    'Baixa': 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
    'Em Dia': 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9] dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
  };

  return (
    <span className={`flex items-center gap-1 px-3 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider transition-colors ${styles[priority] || styles['Baixa']}`}>
      {priority === 'Crítica' && (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
           <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 14.38a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72V7.5a.75.75 0 011.5 0v6.79l1.72-1.72a.75.75 0 111.06 1.06l-3 3z" />
        </svg>
      )}
      {priority}
    </span>
  );
};

export default PriorityBadge;
