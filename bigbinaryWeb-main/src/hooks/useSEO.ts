import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://bigbinarytech.com/fav.png',
  ogType = 'website',
}: SEOProps) => {
  useEffect(() => {
    const baseTitle = 'Big Binary International Institute - Big Binary Tech';
    const baseDescription = 'Big Binary International Institute (Big Binary Tech) offers comprehensive professional training, courses, and education programs.';
    const baseKeywords = 'Big Binary, Big Binary Tech, Big Binary International Institute, professional training, education, courses';

    // Update title
    if (title) {
      document.title = `${title} | ${baseTitle}`;
    }

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description || baseDescription);

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (keywords || baseKeywords) {
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords ? `${baseKeywords}, ${keywords}` : baseKeywords);
    }

    // Update canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
    }

    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    };

    updateOGTag('og:title', title ? `${title} | ${baseTitle}` : baseTitle);
    updateOGTag('og:description', description || baseDescription);
    updateOGTag('og:image', ogImage);
    updateOGTag('og:type', ogType);
    if (canonical) {
      updateOGTag('og:url', canonical);
    }

    // Update Twitter tags
    const updateTwitterTag = (name: string, content: string) => {
      let twitterTag = document.querySelector(`meta[property="twitter:${name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('property', `twitter:${name}`);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', content);
    };

    updateTwitterTag('title', title ? `${title} | ${baseTitle}` : baseTitle);
    updateTwitterTag('description', description || baseDescription);
    updateTwitterTag('image', ogImage);
  }, [title, description, keywords, canonical, ogImage, ogType]);
};

