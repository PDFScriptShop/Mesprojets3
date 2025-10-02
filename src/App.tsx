import { useState, useEffect } from 'react';
import { storage, Project } from './lib/storage';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import ProjectView from './components/ProjectView';

type ViewMode = 'list' | 'form' | 'view';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    setLoading(true);
    try {
      const data = storage.getProjects();
      const sorted = data.sort((a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      setProjects(sorted);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewProject = () => {
    setSelectedProject(null);
    setViewMode('form');
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setViewMode('view');
  };

  const handleEditProject = () => {
    setViewMode('form');
  };

  const handleDeleteProject = () => {
    if (!selectedProject) return;

    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        storage.deleteProject(selectedProject.id);
        loadProjects();
        setViewMode('list');
        setSelectedProject(null);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleSaveProject = () => {
    loadProjects();
    setViewMode('list');
    setSelectedProject(null);
  };

  const handleCancel = () => {
    if (selectedProject) {
      setViewMode('view');
    } else {
      setViewMode('list');
    }
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {viewMode === 'list' && (
          <ProjectList
            projects={projects}
            onSelectProject={handleSelectProject}
            onNewProject={handleNewProject}
            loading={loading}
          />
        )}

        {viewMode === 'form' && (
          <ProjectForm
            project={selectedProject}
            onSave={handleSaveProject}
            onCancel={handleCancel}
          />
        )}

        {viewMode === 'view' && selectedProject && (
          <ProjectView
            project={selectedProject}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onBack={handleBackToList}
          />
        )}
      </div>
    </div>
  );
}

export default App;
