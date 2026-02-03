
import React, { useState } from 'react';
import { Task, ChecklistItem, Member } from '../types';
import Checkmark from './Checkmark';
import PriorityBadge from './PriorityBadge';
import { MEMBERS } from '../constants';

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (id: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onUpdate, onDelete }) => {
  const [editedTask, setEditedTask] = useState<Task>({ ...task });
  const [newCheckItem, setNewCheckItem] = useState('');

  const handleUpdate = (updates: Partial<Task>) => {
    const updated = { ...editedTask, ...updates };
    setEditedTask(updated);
    onUpdate(updated);
  };

  const toggleCheckItem = (id: string) => {
    const newChecklist = editedTask.checklist?.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ) || [];
    handleUpdate({ checklist: newChecklist });
  };

  const addCheckItem = () => {
    if (!newCheckItem.trim()) return;
    const newItem: ChecklistItem = {
      id: Math.random().toString(36).substr(2, 9),
      text: newCheckItem.trim(),
      completed: false
    };
    handleUpdate({ checklist: [...(editedTask.checklist || []), newItem] });
    setNewCheckItem('');
  };

  const checklistProgress = editedTask.checklist?.length
    ? Math.round((editedTask.checklist.filter(i => i.completed).length / editedTask.checklist.length) * 100)
    : 0;

  const handleDelete = () => {
    if (window.confirm('Excluir esta tarefa?')) {
      onDelete(editedTask.id);
    }
  };

  const handleDuplicate = () => {
    const clone = { 
      ...editedTask, 
      id: Math.random().toString(36).substr(2, 9), 
      title: `Cópia: ${editedTask.title}` 
    };
    onUpdate(clone);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col scale-in-95 animate-in slide-in-from-bottom-4 duration-300 transition-colors">
        <div className="flex items-start justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex-1 mr-4">
             <div className="flex items-center gap-2 mb-1">
               <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">Detalhes da Tarefa</span>
               {editedTask.isTemplate && <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 rounded-full">Modelo</span>}
             </div>
            <input
              className="w-full text-2xl font-black text-slate-800 dark:text-white outline-none bg-transparent focus:bg-white dark:focus:bg-slate-800 p-1 rounded transition-all"
              value={editedTask.title}
              onChange={(e) => handleUpdate({ title: e.target.value })}
            />
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-2">Vencimento</label>
              <input
                type="date"
                className="w-full text-sm font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
                value={editedTask.dueDate || ''}
                onChange={(e) => handleUpdate({ dueDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-2">Responsável</label>
              <select 
                className="w-full text-sm font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
                value={editedTask.assignee || ''}
                onChange={(e) => handleUpdate({ assignee: e.target.value })}
              >
                <option value="">Sem responsável</option>
                {MEMBERS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-2">Custo / Horas</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-600 text-sm font-bold">R$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full text-sm font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 pl-9 outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
                  value={editedTask.cost || ''}
                  onChange={(e) => handleUpdate({ cost: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-2">Prioridade</label>
            <div className="flex gap-2 flex-wrap">
              {(['Crítica', 'Urgente', 'Média', 'Baixa', 'Em Dia'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => handleUpdate({ priority: p })}
                  className={`transition-all ${editedTask.priority === p ? 'scale-110' : 'opacity-40 dark:opacity-30 hover:opacity-100'}`}
                >
                  <PriorityBadge priority={p} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-2">Descrição</label>
            <textarea
              className="w-full min-h-[120px] text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 focus:border-blue-400 dark:focus:border-blue-500 outline-none resize-none leading-relaxed transition-colors"
              placeholder="Descreva o que precisa ser feito..."
              value={editedTask.description || ''}
              onChange={(e) => handleUpdate({ description: e.target.value })}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">Checklist</label>
              <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">{checklistProgress}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mb-4 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full transition-all duration-700"
                style={{ width: `${checklistProgress}%` }}
              />
            </div>
            <div className="space-y-2">
              {editedTask.checklist?.map(item => (
                <div key={item.id} className="flex items-center gap-3 group p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
                  <Checkmark completed={item.completed} onClick={() => toggleCheckItem(item.id)} />
                  <span className={`text-sm font-medium ${item.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-300'}`}>{item.text}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 mt-4 px-2">
                <input
                  type="text"
                  placeholder="Novo item de checklist..."
                  className="flex-1 text-sm font-medium border-b border-slate-100 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-400 outline-none py-1 bg-transparent dark:text-white"
                  value={newCheckItem}
                  onChange={(e) => setNewCheckItem(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCheckItem()}
                />
                <button onClick={addCheckItem} className="text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase hover:text-blue-700 dark:hover:text-blue-300">Adicionar</button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center transition-colors">
          <button
            onClick={handleDelete}
            className="text-xs text-rose-500 dark:text-rose-400 font-black uppercase hover:bg-rose-50 dark:hover:bg-rose-900/20 px-4 py-2 rounded-lg transition-colors"
          >
            Excluir Tarefa
          </button>
          <div className="flex gap-3">
             <button
               onClick={handleDuplicate}
               className="text-xs text-slate-500 dark:text-slate-400 font-black uppercase hover:bg-slate-200 dark:hover:bg-slate-800 px-4 py-2 rounded-lg transition-colors"
             >
               Duplicar
             </button>
             <button
               onClick={onClose}
               className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-2.5 rounded-xl text-xs font-black uppercase hover:opacity-90 transition-all shadow-lg active:scale-95"
             >
               Salvar e Fechar
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
