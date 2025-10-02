import { CreditCard as Edit2, Trash2, ArrowLeft } from 'lucide-react';
import { Project } from '../lib/storage';
import { renderMarkdown } from '../utils/markdown';

interface ProjectViewProps {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

const sections = [
  { key: 'objective' as keyof Project, title: 'Objectif', emoji: '🎯' },
  { key: 'structure' as keyof Project, title: 'Structure attendue', emoji: '📂' },
  { key: 'features' as keyof Project, title: 'Fonctionnalités', emoji: '⚙️' },
  { key: 'constraints' as keyof Project, title: 'Contraintes techniques', emoji: '🛡️' },
  { key: 'testing' as keyof Project, title: 'Mode de test', emoji: '🧪' },
  { key: 'success_criteria' as keyof Project, title: 'Critères de réussite', emoji: '🎯' },
];

export default function ProjectView({ project, onEdit, onDelete, onBack }: ProjectViewProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Retour à la liste</span>
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-3">{project.title}</h1>
              {project.description && (
                <p className="text-blue-100 text-lg">{project.description}</p>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={onEdit}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                title="Modifier"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={onDelete}
                className="p-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-lg transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          {sections.map((section) => {
            const content = project[section.key] as string;
            if (!content || content.trim() === '') return null;

            return (
              <div key={section.key} className="mb-8 last:mb-0">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-gray-200">
                  <span className="text-3xl">{section.emoji}</span>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <div
                  className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                />
              </div>
            );
          })}

          {sections.every(section => !project[section.key]) && (
            <div className="text-center py-12 text-gray-400">
              <p>Aucun contenu n'a été ajouté à ce projet.</p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 text-sm text-gray-500">
          <div className="flex justify-between">
            <span>Créé le {new Date(project.created_at).toLocaleDateString('fr-FR')}</span>
            <span>Modifié le {new Date(project.updated_at).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}