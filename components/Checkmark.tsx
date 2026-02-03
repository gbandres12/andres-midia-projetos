
import React from 'react';

interface CheckmarkProps {
  completed: boolean;
  onClick: () => void;
}

const Checkmark: React.FC<CheckmarkProps> = ({ completed, onClick }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200 group-hover:scale-110 flex-shrink-0 ${
        completed
          ? 'bg-emerald-500 border-emerald-500 dark:bg-emerald-600 dark:border-emerald-600'
          : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-emerald-500 dark:hover:border-emerald-500'
      }`}
    >
      {completed && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-2.5 h-2.5 text-white"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </button>
  );
};

export default Checkmark;
