export interface Project {
  id: string;
  title: string;
  description: string;
  objective: string;
  structure: string;
  features: string;
  constraints: string;
  testing: string;
  success_criteria: string;
  created_at: string;
  updated_at: string;
}

const STORAGE_KEY = 'projects';

export const storage = {
  getProjects: (): Project[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  saveProjects: (projects: Project[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  addProject: (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Project => {
    const projects = storage.getProjects();
    const now = new Date().toISOString();
    const newProject: Project = {
      ...project,
      id: crypto.randomUUID(),
      created_at: now,
      updated_at: now,
    };
    projects.push(newProject);
    storage.saveProjects(projects);
    return newProject;
  },

  updateProject: (id: string, updates: Partial<Project>): Project | null => {
    const projects = storage.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) return null;

    projects[index] = {
      ...projects[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    storage.saveProjects(projects);
    return projects[index];
  },

  deleteProject: (id: string): boolean => {
    const projects = storage.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    if (filtered.length === projects.length) return false;
    storage.saveProjects(filtered);
    return true;
  },

  getProjectById: (id: string): Project | null => {
    const projects = storage.getProjects();
    return projects.find(p => p.id === id) || null;
  },
};
