
export type Priority = 'Crítica' | 'Urgente' | 'Média' | 'Baixa' | 'Em Dia';
export type ProjectStatus = 'Ativo' | 'Pausado' | 'Concluído';
export type AssetType = 'image' | 'video' | 'text' | 'social_post';
export type ProjectCategory = 'Marketing' | 'Design' | 'Desenvolvimento' | 'Planejamento' | 'Operações';

export interface MoodboardItem {
  id: string;
  projectId: string;
  url: string;
  type: 'image' | 'link';
  title?: string;
  createdAt: string;
}


export interface Brand {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  toneOfVoice?: string;
}

export interface GeneratedAsset {
  id: string;
  brandId: string;
  assetUrl: string;
  assetType: AssetType;
  promptUsed: string;
  metadata: any;
  createdAt: string;
}

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
  brandId?: string; // Relacionamento opcional com marca
  name: string;
  description: string;
  emoji: string;
  background: string;
  category: ProjectCategory;
  members: string[];
  isFavorite: boolean;
  status: ProjectStatus;
  createdAt: string;
  driveUrl?: string; // Repositório Estratégico (Google Drive)
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

export interface FinanceData {
  id: string;
  projectId: string;
  saleValue: number;
  membersCosts: {
    role: string;
    name: string;
    cost: number;
  }[];
  contractDuration: 6 | 12 | 24;
}

export interface TrafficMetric {
  id: string;
  projectId: string;
  month: string;
  investment: number;
  reach: number;
  impressions: number;
  clicks: number;
  sales: number;
  revenue: number;
}

export interface OnboardingStep {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export interface OnboardingWorkflow {
  id: string;
  projectId: string;
  serviceType: 'Gestão de Mídias' | 'Cronograma de Stories' | 'Identidade Visual';
  startDate: string;
  steps: OnboardingStep[];
}

export interface TrafficForecast {
  investment: number;
  ticketPrice: number;
  scenarios: {
    optimistic: { sales: number; roi: number; cpa: number };
    median: { sales: number; roi: number; cpa: number };
    pessimistic: { sales: number; roi: number; cpa: number };
  };
}

export type ViewType = 'Board' | 'List' | 'Calendar' | 'Finance' | 'Traffic' | 'Onboarding' | 'Moodboard';
export type AppView = 'Gallery' | 'Workspace';

