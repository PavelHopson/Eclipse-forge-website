import { useEffect, useState, type ImgHTMLAttributes, type ReactNode } from 'react';

type AssetImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  alt: string;
  sources?: string[];
  fallback?: ReactNode;
};

export function AssetImage({ alt, sources = [], fallback = null, ...props }: AssetImageProps) {
  const usableSources = sources.filter(Boolean);
  const sourceKey = usableSources.join('|');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exhausted, setExhausted] = useState(usableSources.length === 0);

  useEffect(() => {
    setCurrentIndex(0);
    setExhausted(usableSources.length === 0);
  }, [sourceKey, usableSources.length]);

  if (exhausted || usableSources.length === 0) {
    return <>{fallback}</>;
  }

  const handleError = () => {
    if (currentIndex >= usableSources.length - 1) {
      setExhausted(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
  };

  return <img {...props} alt={alt} src={encodeURI(usableSources[currentIndex])} onError={handleError} />;
}
