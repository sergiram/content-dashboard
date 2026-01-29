import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Modal } from './Modal';

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddVideoModal = ({ isOpen, onClose }: AddVideoModalProps) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tutorial');
  const { addVideo } = useAppStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newVideo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      category: category,
      views: 0,
      likes: 0,
      comments: 0,
      uploadDate: new Date().toISOString().split('T')[0],
    };

    addVideo(newVideo);
    setTitle('');
    setCategory('Tutorial');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Añadir Nuevo Vídeo">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Título del Vídeo
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej. Mi gran tutorial"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Categoría
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Tutorial">Tutorial</option>
            <option value="Gameplay">Gameplay</option>
            <option value="Review">Review</option>
            <option value="Other">Otro</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-500 hover:text-gray-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Guardar video
          </button>
        </div>
      </form>
    </Modal>
  );
};
