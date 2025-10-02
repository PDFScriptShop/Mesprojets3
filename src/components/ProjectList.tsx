import { Plus, FileText, Calendar } from 'lucide-react';
import { Project } from '../lib/storage';

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onNewProject: () => void;
  loading: boolean;
}

export default function ProjectList({ projects, onSelectProject, onNewProject, loading }: ProjectListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cahiers des charges</h1>
          <p className="text-gray-600">Gérez vos projets et leurs spécifications</p>
        </div>
        <button
          onClick={onNewProject}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Nouveau projet</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Aucun projet</h2>
          <p className="text-gray-600 mb-6">Commencez par créer votre premier cahier des charges</p>
          <button
            onClick={onNewProject}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Créer un projet</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group border border-gray-200 hover:border-blue-300"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 group-hover:from-blue-700 group-hover:to-blue-800 transition-all">
                <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">
                  {project.title}
                </h3>
              </div>
              <div className="p-4">
                {project.description && (
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                    {project.description}
                  </p>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Modifié le {new Date(project.updated_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="mt-4 flex gap-2 text-xs">
                  {project.objective && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">🎯 Objectif</span>
                  )}
                  {project.features && (
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded">⚙️ Features</span>
                  )}
                  {project.testing && (
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded">🧪 Tests</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}