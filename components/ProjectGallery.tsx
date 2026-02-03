
import React from 'react';
import { Project, Task, Member } from '../types';
import { MEMBERS } from '../constants';

interface ProjectGalleryProps {
  projects: Project[];
  tasks: Task[];
  onSelectProject: (id: string) => void;
  onNewProject: () => void;
  onToggleFavorite: (id: string) => void;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects, tasks, onSelectProject, onNewProject, onToggleFavorite }) => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Meus Projetos</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Bem-vindo de volta, Zenith Marketing Tech.</p>
        </div>
        <button 
          onClick={onNewProject}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-black uppercase text-xs shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          Novo Projeto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => {
          const projectTasks = tasks.filter(t => t.projectId === project.id);
          const doneTasks = projectTasks.filter(t => t.columnId === 'done').length;
          const progress = projectTasks.length > 0 ? Math.round((doneTasks / projectTasks.length) * 100) : 0;
          const overdue = projectTasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && !t.completed).length;

          return (
            <div 
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="group bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden"
            >
              <div 
                className="absolute top-0 left-0 w-full h-1" 
                style={{ background: project.background }}
              />
              
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-2xl shadow-inner border border-slate-100 dark:border-slate-700 transition-colors">
                  {project.emoji}
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); onToggleFavorite(project.id); }}
                  className={`p-2 rounded-lg transition-colors ${project.isFavorite ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700 hover:text-slate-400 dark:hover:text-slate-500'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </button>
              </div>

              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.name}</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-6 line-clamp-2 leading-relaxed">{project.description}</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400 dark:text-slate-500">Progresso</span>
                  <span className="text-slate-700 dark:text-slate-300">{progress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-1000" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-8">
                <div className="flex -space-x-2">
                  {project.members.map(mid => {
                    const m = MEMBERS.find(mem => mem.id === mid);
                    return m ? <img key={mid} src={m.avatar} className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" alt={m.name} /> : null;
                  })}
                </div>
                <div className="flex items-center gap-3">
                  {overdue > 0 && (
                    <span className="text-[10px] font-black text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 px-2 py-0.5 rounded-full">
                      {overdue} Vencidas
                    </span>
                  )}
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${project.status === 'Ativo' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectGallery;
