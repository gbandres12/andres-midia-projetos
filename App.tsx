
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Task, Column, ViewType, Project, ProjectDoc, AppView, ProjectCategory } from './types';
import { INITIAL_COLUMNS, INITIAL_TASKS, MEMBERS, INITIAL_PROJECTS, INITIAL_DOCS } from './constants';
import Header from './components/Header';
import BoardView from './components/BoardView';
import ListView from './components/ListView';
import TaskModal from './components/TaskModal';
import DocumentationSidebar from './components/DocumentationSidebar';
import ProjectGallery from './components/ProjectGallery';
import CreateProjectModal from './components/CreateProjectModal';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [appView, setAppView] = useState<AppView>('Gallery');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [columns] = useState<Column[]>(INITIAL_COLUMNS);
  const [activeProjectId, setActiveProjectId] = useState<string | undefined>();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('zen-theme');
    return saved === 'dark';
  });
  
  const [view, setView] = useState<ViewType>('Board');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [allDocs, setAllDocs] = useState<Record<string, ProjectDoc>>(INITIAL_DOCS);
  const [filter, setFilter] = useState('Todas');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('zen-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const activeProject = useMemo(() => projects.find(p => p.id === activeProjectId), [projects, activeProjectId]);
  
  const activeDoc = useMemo(() => {
    if (!activeProjectId) return { content: '', files: [] };
    return allDocs[activeProjectId] || { content: '', files: [] };
  }, [activeProjectId, allDocs]);

  const progress = useMemo(() => {
    const projectTasks = tasks.filter(t => t.projectId === activeProjectId);
    const total = projectTasks.length;
    if (total === 0) return 0;
    const done = projectTasks.filter(t => t.columnId === 'done').length;
    return Math.round((done / total) * 100);
  }, [tasks, activeProjectId]);

  const filteredTasks = useMemo(() => {
    let list = tasks.filter(t => t.projectId === activeProjectId);
    if (filter === 'Minhas') list = list.filter(t => t.assignee === 'm1');
    if (filter === 'Vencidas') list = list.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && !t.completed);
    if (filter === 'Críticas') list = list.filter(t => t.priority === 'Crítica');
    return list;
  }, [tasks, filter, activeProjectId]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) => prev.map((t) => 
      t.id === id ? { ...t, completed: !t.completed, columnId: !t.completed ? 'done' : t.columnId } : t
    ));
  }, []);

  const addTask = useCallback((columnId: string, title: string) => {
    if (!activeProjectId) return;
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      projectId: activeProjectId,
      title,
      completed: false,
      priority: 'Baixa',
      columnId,
      checklist: [],
      comments: []
    };
    setTasks((prev) => [...prev, newTask]);
  }, [activeProjectId]);

  const handleMoveTask = useCallback((tid: string, cid: string) => {
    setTasks((prev) => prev.map((t) => 
      t.id === tid ? { ...t, columnId: cid, completed: cid === 'done' } : t
    ));
  }, []);

  const createProject = useCallback((data: Partial<Project>) => {
    const newProj: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name || 'Novo Projeto',
      description: data.description || '',
      emoji: data.emoji || '📁',
      background: data.background || 'linear-gradient(to bottom right, #6366f1, #a855f7)',
      category: (data.category as ProjectCategory) || 'Marketing',
      members: ['m1'],
      isFavorite: false,
      status: 'Ativo',
      createdAt: new Date().toISOString()
    };
    setProjects((prev) => [...prev, newProj]);
    setAppView('Workspace');
    setActiveProjectId(newProj.id);
    setIsCreateModalOpen(false);
  }, []);

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks((prev) => {
      const exists = prev.find((t) => t.id === updatedTask.id);
      if (exists) {
        return prev.map((t) => t.id === updatedTask.id ? updatedTask : t);
      }
      return [...prev, updatedTask];
    });
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setSelectedTask(null);
  }, []);

  const handleToggleFavorite = useCallback((id: string) => {
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  }, []);

  const handleDocUpdate = useCallback((newDoc: ProjectDoc) => {
    if (activeProjectId) {
      setAllDocs((prev) => ({ ...prev, [activeProjectId]: newDoc }));
    }
  }, [activeProjectId]);

  const handleChangeProjectBackground = useCallback((newBg: string) => {
    if (activeProjectId) {
      setProjects((prev) => prev.map(p => p.id === activeProjectId ? { ...p, background: newBg } : p));
    }
  }, [activeProjectId]);

  const activeBackgroundStyle = useMemo(() => {
    if (!activeProject) return { background: darkMode ? '#0f172a' : '#f8faff' };
    const bg = activeProject.background;
    if (bg.startsWith('http')) {
      return { 
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    return { background: bg };
  }, [activeProject, darkMode]);

  return (
    <div className={`${darkMode ? 'dark' : ''} h-screen flex overflow-hidden font-sans`}>
      <Sidebar 
        projects={projects} 
        activeProjectId={activeProjectId} 
        onGoHome={() => { setAppView('Gallery'); setActiveProjectId(undefined); }}
        onSelectProject={(id) => { setActiveProjectId(id); setAppView('Workspace'); }}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-in-out z-0"
          style={activeBackgroundStyle}
        />
        
        <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ${appView === 'Workspace' ? (darkMode ? 'bg-slate-950/60 opacity-100' : 'bg-white/20 opacity-100') : 'opacity-0'}`} />

        {appView === 'Gallery' ? (
          <div className="relative z-10 w-full h-full overflow-y-auto bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm">
            <ProjectGallery 
              projects={projects} 
              tasks={tasks}
              onSelectProject={(id) => { setActiveProjectId(id); setAppView('Workspace'); }}
              onNewProject={() => setIsCreateModalOpen(true)}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        ) : (
          <div className="relative z-10 flex flex-col h-full overflow-hidden">
            <Header 
              currentView={view} 
              setView={setView} 
              progress={progress} 
              members={MEMBERS} 
              onToggleDoc={() => setIsDocOpen(!isDocOpen)}
              onFilterChange={setFilter}
              onChangeBackground={handleChangeProjectBackground}
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode(!darkMode)}
            />
            
            <div className="flex-1 flex overflow-hidden">
              <main className="flex-1 overflow-auto p-6 scrollbar-hide">
                <div className="h-full container mx-auto">
                  {view === 'Board' ? (
                    <BoardView
                      columns={columns}
                      tasks={filteredTasks}
                      onToggleTask={toggleTask}
                      onAddTask={addTask}
                      onMoveTask={handleMoveTask}
                      onTaskClick={setSelectedTask}
                    />
                  ) : (
                    <ListView
                      columns={columns}
                      tasks={filteredTasks}
                      onToggleTask={toggleTask}
                      onAddTask={addTask}
                      onTaskClick={setSelectedTask}
                    />
                  )}
                </div>
              </main>

              <DocumentationSidebar 
                doc={activeDoc} 
                isOpen={isDocOpen} 
                onClose={() => setIsDocOpen(false)} 
                onUpdate={handleDocUpdate} 
              />
            </div>
          </div>
        )}

        {selectedTask && (
          <TaskModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        )}

        {isCreateModalOpen && (
          <CreateProjectModal 
            onClose={() => setIsCreateModalOpen(false)}
            onCreate={createProject}
          />
        )}

        {appView === 'Workspace' && (
          <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-30">
            <button 
              title="Criar a partir de modelo"
              className="w-12 h-12 bg-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
              onClick={() => {
                  const template = tasks.find(t => t.isTemplate && t.projectId === activeProjectId);
                  if (template) {
                    const newTask = { ...template, id: Math.random().toString(36).substr(2, 9), isTemplate: false, title: `Novo: ${template.title}`, columnId: 'todo' };
                    updateTask(newTask);
                    setSelectedTask(newTask);
                  } else {
                    window.alert('Crie uma tarefa como modelo primeiro.');
                  }
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            </button>
            <button 
              className="w-14 h-14 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all ring-4 ring-white dark:ring-slate-800"
              onClick={() => { 
                const title = window.prompt("Nome da nova tarefa:"); 
                if (title) addTask('todo', title); 
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            </button>
          </div>
        )}
      </div>

      <footer className="fixed bottom-0 right-0 left-20 lg:left-64 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-t border-white/40 dark:border-slate-800 py-2 px-6 text-[9px] text-slate-500 flex justify-between uppercase tracking-widest font-black z-20 transition-colors">
        <div className="flex gap-4">
          <span>Zen Dashboard v2.2</span>
          {activeProject && <span className="text-slate-900 dark:text-slate-100">Projeto: {activeProject.name}</span>}
        </div>
        <span>© 2024 Zenith Marketing Tech</span>
      </footer>
    </div>
  );
};

export default App;
