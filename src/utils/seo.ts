import { useEffect } from 'react';

interface PageMetaOptions {
  title: string;
  description: string;
  path?: string;
}

export function usePageMeta({ title, description, path }: PageMetaOptions) {
  useEffect(() => {
    const fullTitle = title.includes('BEYOND RELICS') ? title : `${title} | BEYOND RELICS`;
    document.title = fullTitle;

    const setMeta = (selector: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${selector}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, selector);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description, 'name');
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('twitter:title', fullTitle, 'name');
    setMeta('twitter:description', description, 'name');

    if (typeof window !== 'undefined') {
      const canonicalUrl = window.location.origin + (path ?? window.location.pathname);
      setMeta('og:url', canonicalUrl, 'property');
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonicalUrl);
    }
  }, [title, description, path]);
}
