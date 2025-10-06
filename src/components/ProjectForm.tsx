import { useState } from 'react';
import { FolderTree, Zap, Shield, TestTube, Target } from 'lucide-react';
import { storage, Project } from '../lib/storage';

interface ProjectFormProps {
  project?: Project | null;
  onSave: () => void;
  onCancel: () => void;
}

type TabKey = 'objective' | 'structure' | 'features' | 'constraints' | 'testing' | 'success_criteria';

const tabs = [
  { key: 'objective' as TabKey, label: 'Objectif', icon: Target, emoji: '🎯' },
  { key: 'structure' as TabKey, label: 'Structure', icon: FolderTree, emoji: '📂' },
  { key: 'features' as TabKey, label: 'Fonctionnalités', icon: Zap, emoji: '⚙️' },
  { key: 'constraints' as TabKey, label: 'Contraintes', icon: Shield, emoji: '🛡️' },
  { key: 'testing' as TabKey, label: 'Tests', icon: TestTube, emoji: '🧪' },
  { key: 'success_criteria' as TabKey, label: 'Critères de réussite', icon: Target, emoji: '🎯' },
];

export default function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('objective');
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    objective: project?.objective || '',
    structure: project?.structure || '',
    features: project?.features || '',
    constraints: project?.constraints || '',
    testing: project?.testing || '',
    success_criteria: project?.success_criteria || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (project) {
        await storage.updateProject(project.id, formData);
      } else {
        await storage.addProject(formData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          {project ? 'Modifier le projet' : 'Nouveau projet'}
        </h2>
        <input
          type="text"
          placeholder="Titre du projet"
          value={formData.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="w-full px-4 py-3 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <textarea
          placeholder="Description courte du projet"
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          className="w-full px-4 py-2 rounded-lg mt-3 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
          rows={2}
        />
      </div>

      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{tab.emoji}</span>
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenu Markdown
            </label>
            <textarea
              value={formData[activeTab]}
              onChange={(e) => updateField(activeTab, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              rows={20}
              placeholder={`Entrez le contenu pour ${tabs.find(t => t.key === activeTab)?.label}...\n\nVous pouvez utiliser Markdown :\n# Titre\n## Sous-titre\n- Liste\n- Items\n\`\`\`code\nconst example = true;\n\`\`\``}
            />
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4 flex justify-end gap-3 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={saving || !formData.title.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
}