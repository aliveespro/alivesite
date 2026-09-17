export type PillarType = 'saude' | 'educacao' | 'cultura';

export interface PillarInfo {
  id: PillarType;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  color: string;
  bgGlow: string;
  borderColor: string;
  textColor: string;
  icon: string;
  topics: string[];
  image: string;
}

export interface Project {
  id: string;
  title: string;
  pilar: PillarType;
  summary: string;
  description: string;
  image: string;
  featured: boolean;
  year: string;
  location: string;
  beneficiaries: string;
  tags: string[];
  impactHighlight: string;
  gallery?: string[];
  status?: 'active' | 'completed' | 'archived';
  isDeleted?: boolean;
  deletedAt?: string;
  completedYear?: string;
}

export interface AliveEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  pilar: PillarType;
  description: string;
  image: string;
  featured: boolean;
  vacancies: number;
  enrolledCount: number;
  status: 'open' | 'soon' | 'closed' | 'finished' | 'archived';
  targetAudience: string;
  instructor?: string;
  isDeleted?: boolean;
  deletedAt?: string;
  eventDateIso?: string;
}

export interface DeletedItemHistory {
  id: string;
  originalId: string;
  type: 'project' | 'event' | 'news' | 'gallery';
  title: string;
  deletedAt: string;
  pillar?: PillarType;
  data: any;
}

export interface ImpactMetric {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description: string;
  pilar?: PillarType | 'geral';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'oficinas' | 'eventos' | 'bastidores' | 'arte' | 'comunidade';
  imageUrl: string;
  aspectRatio: 'tall' | 'wide' | 'square';
  date: string;
  pilar: PillarType;
  caption?: string;
}

export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  pilar: PillarType;
  tags: string[];
}

export interface VolunteerSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: string;
  areaOfInterest: string;
  message: string;
  type: 'participante' | 'voluntario' | 'parceiro' | 'doador';
  createdAt: string;
}
