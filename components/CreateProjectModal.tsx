
import React, { useState } from 'react';
import { Project } from '../types';
import { BACKGROUND_OPTIONS } from '../constants';

interface CreateProjectModalProps {
  onClose: () => void;
  onCreate: (project: Partial<Project>) => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [emoji, setEmoji] = useState('📁');
  const [bg, setBg] = useState(BACKGROUND_OPTIONS[0].val);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col scale-in-95 animate-in slide-in-from-bottom-4 duration-300 transition-colors">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">Novo Workspace</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">Personalize seu ambiente de trabalho</p>
        </div>
        
        <div className="p-8 space-y-6 overflow-y-auto max-h-[60vh] scrollbar-hide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Nome do Projeto</label>
              <input 
                autoFocus
                className="w-full text-sm font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl p-3 focus:border-blue-400 dark:focus:border-blue-500 outline-none transition-all"
                placeholder="Ex: Marketing Digital"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Emoji do Ícone</label>
              <div className="flex gap-2">
                <select 
                  className="flex-1 text-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl p-2.5 outline-none focus:border-blue-400 dark:focus:border-blue-500"
                  value={emoji}
                  onChange={e => setEmoji(e.target.value)}
                >
                  {['📁', '🚀', '🎨', '📈', '🤝', '⚡', '🤖', '📸', '🏠', '🌟', '⚙️'].map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Descrição Curta</label>
            <textarea 
              className="w-full text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl p-3 focus:border-blue-400 dark:focus:border-blue-500 outline-none h-20 resize-none transition-all"
              placeholder="Qual o foco principal deste workspace?"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Escolha o Background</label>
            <div className="grid grid-cols-4 gap-3">
              {BACKGROUND_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setBg(opt.val)}
                  title={opt.name}
                  className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${bg === opt.val ? 'border-blue-600 ring-2 ring-blue-100 dark:ring-blue-900 scale-105' : 'border-transparent'}`}
                >
                  {opt.val.startsWith('http') ? (
                    <img src={opt.val} className="w-full h-full object-cover" alt={opt.name} />
                  ) : (
                    <div className="w-full h-full" style={{ background: opt.val }} />
                  )}
                  {bg === opt.val && (
                    <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 transition-colors">
          <button onClick={onClose} className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 px-6 py-2 transition-colors">Cancelar</button>
          <button 
            disabled={!name.trim()}
            onClick={() => onCreate({ name, description: desc, emoji, background: bg })}
            className="bg-blue-600 text-white text-xs font-black uppercase px-8 py-3 rounded-2xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
          >
            Criar Workspace
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
