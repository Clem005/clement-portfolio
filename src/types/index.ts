export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  outcomes: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  dateRange: string;
  summary: string;
  responsibilities: string[];
  achievements?: string;
}