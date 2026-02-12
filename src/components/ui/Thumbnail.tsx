import { useState } from 'react';
import { Youtube } from 'lucide-react';

interface ThumbnailProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export const Thumbnail = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: ThumbnailProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }

  return (
    <div
      className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${className}`}
    >
      {!isLoaded && !hasError && src && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
      )}
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          loading={loading}
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-400">
          <Youtube className="w-1/2 h-1/2 opacity-20" />
        </div>
      )}
    </div>
  );
};
