import { useState } from 'react';

interface VideoSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const VideoSearch = ({
  onSearch,
  placeholder = 'Buscar vídeos...',
}: VideoSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />

        {/* Icono de búsqueda */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </div>

        {/* Botón para limpiar */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Contador de resultados */}
      {searchTerm && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Buscando: "{searchTerm}"
        </p>
      )}
    </div>
  );
};
