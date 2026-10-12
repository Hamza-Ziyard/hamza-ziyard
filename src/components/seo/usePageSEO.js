import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMetadata } from '../../data/seoMetadata';

function setMetaTag(selector, attribute, value) {
  if (!value) return;
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const [attrName, attrVal] = selector
      .replace(/^meta\[/, '')
      .replace(/\]$/, '')
      .split('=');
    const cleanAttrName = attrName.trim();
    const cleanAttrVal = attrVal ? attrVal.trim().replace(/^["']|["']$/g, '') : '';
    element.setAttribute(cleanAttrName, cleanAttrVal);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

function setLinkTag(rel, href) {
  if (!href) return;
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * Hook to automatically synchronize the document head (<title>, Open Graph, Twitter Cards)
 * with the route's configured preview metadata.
 */
export function usePageSEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getPageMetadata(pathname);

    // Title
    if (meta.title) {
      document.title = meta.title;
      setMetaTag('meta[name="title"]', 'content', meta.title);
      setMetaTag('meta[property="og:title"]', 'content', meta.title);
      setMetaTag('meta[property="twitter:title"]', 'content', meta.title);
    }

    // Description
    if (meta.description) {
      setMetaTag('meta[name="description"]', 'content', meta.description);
      setMetaTag('meta[property="og:description"]', 'content', meta.description);
      setMetaTag('meta[property="twitter:description"]', 'content', meta.description);
    }

    // Preview Image (Open Graph / Twitter)
    if (meta.image) {
      setMetaTag('meta[property="og:image"]', 'content', meta.image);
      setMetaTag('meta[property="twitter:image"]', 'content', meta.image);
    }

    // Canonical & OG URL
    if (meta.url) {
      setMetaTag('meta[property="og:url"]', 'content', meta.url);
      setMetaTag('meta[property="twitter:url"]', 'content', meta.url);
      setLinkTag('canonical', meta.url);
    }
  }, [pathname]);
}
