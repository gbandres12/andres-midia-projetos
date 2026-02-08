
import React from 'react';
import { Project } from '../types';

interface SidebarProps {
  projects: Project[];
  activeProjectId?: string;
  onGoHome: () => void;
  onSelectProject: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ projects, activeProjectId, onGoHome, onSelectProject }) => {
  return (
    <aside className="w-20 lg:w-64 bg-slate-900 h-full flex flex-col border-r border-slate-800 z-40 transition-all duration-300 overflow-hidden group">
      <div className="p-6 mb-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-xl flex-shrink-0">Z</div>
        <span className="text-white font-black tracking-tight hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">Hybrid Zen</span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <button
          onClick={onGoHome}
          className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${!activeProjectId ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}`}
        >
          <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className="text-sm font-black uppercase tracking-widest hidden lg:block">Início</span>
        </button>

        <div className="py-4 border-t border-slate-800">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-3 hidden lg:block">Favoritos</p>
          <div className="space-y-1">
            {projects.filter(p => p.isFavorite).map(project => (
              <button
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${activeProjectId === project.id ? 'bg-slate-800 text-white border border-slate-700 shadow-sm' : 'text-slate-400 hover:bg-slate-800/50'}`}
              >
                <span className="text-xl flex-shrink-0 w-6 h-6 flex items-center justify-center">{project.emoji}</span>
                <span className="text-xs font-bold truncate hidden lg:block">{project.name}</span>
              </button>
            ))}
          </div>
        </div>

        {activeProjectId && projects.find(p => p.id === activeProjectId)?.driveUrl && (
          <div className="py-4 border-t border-slate-800">
            <a
              href={projects.find(p => p.id === activeProjectId)?.driveUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center gap-4 p-3 rounded-xl bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border border-blue-600/20 transition-all group"
            >
              <svg className="w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
              <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">Google Drive</span>
            </a>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-2xl">
          <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-slate-700 flex-shrink-0"></div>
          <div className="hidden lg:block overflow-hidden">
            <p className="text-[10px] font-black text-white truncate">Zenith MKT</p>
            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
