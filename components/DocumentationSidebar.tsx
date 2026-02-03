
import React, { useState } from 'react';
import { ProjectDoc } from '../types';

interface DocumentationSidebarProps {
  doc: ProjectDoc;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (doc: ProjectDoc) => void;
}

const DocumentationSidebar: React.FC<DocumentationSidebarProps> = ({ doc, isOpen, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(doc.content);

  if (!isOpen) return null;

  return (
    <div className="w-80 h-full bg-white dark:bg-slate-900 border-l border-slate-100 dark:border-slate-800 flex flex-col shadow-xl animate-in slide-in-from-right duration-300 z-40 transition-colors">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">Documentação</h2>
        <button onClick={onClose} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-colors">
          <svg className="w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Sobre o Projeto</h3>
            <button 
              onClick={() => {
                if (isEditing) onUpdate({ ...doc, content });
                setIsEditing(!isEditing);
              }}
              className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {isEditing ? 'SALVAR' : 'EDITAR'}
            </button>
          </div>
          {isEditing ? (
            <textarea
              className="w-full h-40 text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg p-3 outline-none focus:border-blue-400 dark:focus:border-blue-500 resize-none transition-colors"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
              {doc.content || "Nenhuma descrição definida."}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Arquivos Mestres</h3>
          <div className="space-y-2">
            {doc.files.map((file, idx) => (
              <a 
                key={idx} 
                href={file.url} 
                className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
              >
                <div className="p-1.5 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                </div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 truncate">{file.name}</span>
              </a>
            ))}
            <button className="w-full p-2 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-lg text-xs text-slate-400 dark:text-slate-500 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-500 dark:hover:text-slate-400 transition-all mt-2 uppercase font-black tracking-widest">
              + Adicionar Arquivo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationSidebar;
