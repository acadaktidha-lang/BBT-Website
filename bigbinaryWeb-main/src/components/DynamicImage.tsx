import React from 'react';
import { useMediaAsset } from '@/hooks/useMediaAsset';
import { Skeleton } from '@/components/ui/skeleton';

interface DynamicImageProps {
  assetKey: string;
  fallbackUrl?: string;
  className?: string;
  alt?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export default function DynamicImage({ 
  assetKey, 
  fallbackUrl, 
  className, 
  alt, 
  style,
  ...props 
}: DynamicImageProps) {
  const { url, altText, loading, error } = useMediaAsset(assetKey, fallbackUrl);

  if (loading) {
    return <Skeleton className={className} style={style} />;
  }

  if (error && !fallbackUrl) {
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center text-gray-400 text-sm ${className}`}
        style={style}
      >
        Image not found
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt || altText || assetKey}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        if (fallbackUrl && url !== fallbackUrl) {
          const target = e.target as HTMLImageElement;
          target.src = fallbackUrl;
        }
      }}
      {...props}
    />
  );
}