
import React, { useState } from 'react';
import { ViewType, Member } from '../types';
import { BACKGROUND_OPTIONS } from '../constants';

interface HeaderProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  progress: number;
  members: Member[];
  onToggleDoc: () => void;
  onFilterChange: (filter: string) => void;
  onChangeBackground: (bg: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, progress, members, onToggleDoc, onFilterChange, onChangeBackground, darkMode, onToggleDarkMode }) => {
  const [showBgPicker, setShowBgPicker] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/40 dark:border-slate-800 px-6 py-4 flex flex-col gap-4 shadow-sm transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-lg">Z</div>
            <h1 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Hybrid Zen</h1>
          </div>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
          <nav className="flex items-center gap-1 bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-xl shadow-inner overflow-x-auto no-scrollbar max-w-[500px]">
            <div className="flex items-center gap-1">
              {(['Board', 'List'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${currentView === v ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                  {v === 'Board' ? 'Quadro' : 'Lista'}
                </button>
              ))}
            </div>
            <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1"></div>
            <div className="flex items-center gap-1">
              {(['Finance', 'Traffic', 'Onboarding'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${currentView === v ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                  {v === 'Finance' ? 'Precificação' : v === 'Traffic' ? 'Tráfego' : 'Onboarding'}
                </button>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all"
            title={darkMode ? "Modo Claro" : "Modo Escuro"}
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          <div className="flex -space-x-2 mr-2">
            {members.map(m => (
              <img key={m.id} src={m.avatar} title={m.name} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 shadow-sm hover:scale-110 transition-transform cursor-pointer" alt={m.name} />
            ))}
          </div>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

          <div className="relative">
            <button
              onClick={() => setShowBgPicker(!showBgPicker)}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all"
              title="Trocar Background"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.172-1.172a4 4 0 115.656 5.656L10 17.657" /></svg>
            </button>

            {showBgPicker && (
              <div className="absolute right-0 mt-2 p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-2xl z-50 w-64 grid grid-cols-2 gap-2 animate-in fade-in zoom-in-95 duration-200">
                {BACKGROUND_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { onChangeBackground(opt.val); setShowBgPicker(false); }}
                    className="h-12 rounded-lg border-2 border-transparent hover:border-blue-400 overflow-hidden transition-all shadow-sm"
                    style={opt.val.startsWith('http') ? { backgroundImage: `url(${opt.val})`, backgroundSize: 'cover' } : { background: opt.val }}
                  />
                ))}
              </div>
            )}
          </div>

          <button onClick={onToggleDoc} className="p-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all flex items-center gap-2 font-black text-xs">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            INFO
          </button>

          <button className="relative p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white dark:border-slate-900"></span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 w-full bg-slate-200/50 dark:bg-slate-800/50 h-2.5 rounded-full overflow-hidden relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[9px] font-black text-slate-700 dark:text-slate-200 bg-white/40 dark:bg-slate-900/40 px-2 rounded-full backdrop-blur-sm border border-white/20 dark:border-slate-700/50">{progress}% CONCLUÍDO</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
          {['Todas', 'Minhas', 'Vencidas', 'Críticas'].map(f => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className="whitespace-nowrap px-3 py-1 text-[9px] font-black uppercase border border-white/50 dark:border-slate-700/50 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm text-slate-600 dark:text-slate-300 rounded-full hover:bg-white/60 dark:hover:bg-slate-700/60 hover:border-blue-200 dark:hover:border-blue-800 transition-all"
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
