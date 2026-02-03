
export type Priority = 'Crítica' | 'Urgente' | 'Média' | 'Baixa' | 'Em Dia';
export type ProjectStatus = 'Ativo' | 'Pausado' | 'Concluído';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

export interface Member {
  id: string;
  name: string;
  avatar: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  emoji: string;
  background: string;
  members: string[]; // IDs
  isFavorite: boolean;
  status: ProjectStatus;
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string;
  assignee?: string;
  columnId: string;
  description?: string;
  tags?: string[];
  checklist?: ChecklistItem[];
  comments?: Comment[];
  cost?: number;
  isTemplate?: boolean;
}

export interface Column {
  id: string;
  title: string;
}

export interface ProjectDoc {
  content: string;
  files: { name: string; url: string }[];
}

export type ViewType = 'Board' | 'List' | 'Calendar';
export type AppView = 'Gallery' | 'Workspace';
