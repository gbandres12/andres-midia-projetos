
import { Column, Task, Member, Project, ProjectDoc, ProjectCategory } from './types';

export const MEMBERS: Member[] = [
  { id: 'm1', name: 'Ana Silva', avatar: 'https://i.pravatar.cc/150?u=ana' },
  { id: 'm2', name: 'Bruno Costa', avatar: 'https://i.pravatar.cc/150?u=bruno' },
  { id: 'm3', name: 'Carla Dias', avatar: 'https://i.pravatar.cc/150?u=carla' },
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Marketing',
  'Design',
  'Desenvolvimento',
  'Planejamento',
  'Operações'
];

export const BACKGROUND_OPTIONS = [
  { id: 'g1', name: 'Indigo Night', val: 'linear-gradient(to bottom right, #6366f1, #a855f7)' },
  { id: 'g2', name: 'Ocean Breeze', val: 'linear-gradient(to bottom right, #3b82f6, #2dd4bf)' },
  { id: 'g3', name: 'Sunset Glow', val: 'linear-gradient(to bottom right, #f59e0b, #ef4444)' },
  { id: 'g4', name: 'Deep Forest', val: 'linear-gradient(to bottom right, #059669, #34d399)' },
  { id: 'i1', name: 'Abstract Blue', val: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2000' },
  { id: 'i2', name: 'Soft Mesh', val: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=2000' },
  { id: 'i3', name: 'Purple Flow', val: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000' },
  { id: 'i4', name: 'Cyberpunk', val: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80&w=2000' },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Marketing - Auto Show',
    description: 'Campanha de lançamento do novo showroom.',
    emoji: '🚗',
    background: BACKGROUND_OPTIONS[0].val,
    category: 'Marketing',
    members: ['m1', 'm2'],
    isFavorite: true,
    status: 'Ativo',
    createdAt: '2024-01-10'
  },
  {
    id: 'p2',
    name: 'Redesign E-learning',
    description: 'Atualização da interface do portal do aluno.',
    emoji: '🎓',
    background: BACKGROUND_OPTIONS[4].val,
    category: 'Design',
    members: ['m1', 'm3'],
    isFavorite: false,
    status: 'Ativo',
    createdAt: '2024-02-15'
  }
];

export const INITIAL_DOCS: Record<string, ProjectDoc> = {
  'p1': {
    content: 'Objetivo: Atrair 500 leads qualificados para o evento.\nCanais: Instagram, Google Ads.',
    files: [{ name: 'Briefing_AutoShow.pdf', url: '#' }]
  },
  'p2': {
    content: 'Diretrizes da Marca: Azul #2563EB para botões primários.\nTipografia Inter.',
    files: [{ name: 'Manual_da_Marca.pdf', url: '#' }]
  }
};

export const INITIAL_COLUMNS: Column[] = [
  { id: 'todo', title: 'A Fazer' },
  { id: 'inprogress', title: 'Em Andamento' },
  { id: 'review', title: 'Para Revisão' },
  { id: 'done', title: 'Concluído' },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    projectId: 'p2',
    title: 'Finalizar Estratégia de Marketing Q4',
    completed: false,
    priority: 'Crítica',
    columnId: 'todo',
    dueDate: '2024-11-24',
    assignee: 'm1',
    description: 'Definir canais e orçamento.',
    tags: ['Marketing'],
    cost: 1500,
    checklist: [],
    comments: []
  },
  {
    id: '2',
    projectId: 'p2',
    title: 'Configuração de API (Template)',
    completed: false,
    priority: 'Média',
    columnId: 'todo',
    isTemplate: true,
    checklist: [{ id: 't1', text: 'Gerar chaves', completed: false }]
  }
];
