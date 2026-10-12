import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PAGE_METADATA, DEFAULT_METADATA } from '../src/data/seoMetadata.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function updateMetaTag(html, attr, attrVal, content) {
  const safeContent = escapeHtml(content);
  const regex = new RegExp(`(<meta[^>]*?${attr}=["']${attrVal}["'][^>]*?content=["'])([^"']*?)(["'][^>]*?>)`, 'i');
  if (regex.test(html)) {
    return html.replace(regex, `$1${safeContent}$3`);
  }
  // Try inverse attribute order
  const regexInverse = new RegExp(`(<meta[^>]*?content=["'])([^"']*?)(["'][^>]*?${attr}=["']${attrVal}["'][^>]*?>)`, 'i');
  if (regexInverse.test(html)) {
    return html.replace(regexInverse, `$1${safeContent}$3`);
  }
  // Insert before </head> if missing
  const tag = `  <meta ${attr}="${attrVal}" content="${safeContent}" />\n`;
  return html.replace('</head>', `${tag}</head>`);
}

function updateTitle(html, title) {
  const safeTitle = escapeHtml(title);
  if (/<title>.*?<\/title>/i.test(html)) {
    return html.replace(/<title>.*?<\/title>/i, `<title>${safeTitle}</title>`);
  }
  return html.replace('</head>', `  <title>${safeTitle}</title>\n</head>`);
}

function updateCanonical(html, url) {
  const safeUrl = escapeHtml(url);
  const regex = /(<link[^>]*?rel=["']canonical["'][^>]*?href=["'])([^"']*?)(["'][^>]*?>)/i;
  if (regex.test(html)) {
    return html.replace(regex, `$1${safeUrl}$3`);
  }
  return html.replace('</head>', `  <link rel="canonical" href="${safeUrl}" />\n</head>`);
}

function generatePrerenderedHtml(baseHtml, meta) {
  let html = baseHtml;

  // Title
  if (meta.title) {
    html = updateTitle(html, meta.title);
    html = updateMetaTag(html, 'name', 'title', meta.title);
    html = updateMetaTag(html, 'property', 'og:title', meta.title);
    html = updateMetaTag(html, 'property', 'twitter:title', meta.title);
  }

  // Description
  if (meta.description) {
    html = updateMetaTag(html, 'name', 'description', meta.description);
    html = updateMetaTag(html, 'property', 'og:description', meta.description);
    html = updateMetaTag(html, 'property', 'twitter:description', meta.description);
  }

  // Image
  if (meta.image) {
    html = updateMetaTag(html, 'property', 'og:image', meta.image);
    html = updateMetaTag(html, 'property', 'twitter:image', meta.image);
  }

  // URL & Canonical
  if (meta.url) {
    html = updateMetaTag(html, 'property', 'og:url', meta.url);
    html = updateMetaTag(html, 'property', 'twitter:url', meta.url);
    html = updateCanonical(html, meta.url);
  }

  return html;
}

export function prerenderPages() {
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('[prerender] dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');

  console.log('[prerender] Generating static HTML pages with custom SEO tags from seoMetadata.js...');

  for (const [routePath, metaConfig] of Object.entries(PAGE_METADATA)) {
    const meta = { ...DEFAULT_METADATA, ...metaConfig };
    const html = generatePrerenderedHtml(baseHtml, meta);

    const cleanRoute = routePath.replace(/^\/+|\/+$/g, '');
    let targetDir = distDir;
    let targetFile = path.join(distDir, 'index.html');

    if (cleanRoute !== '') {
      targetDir = path.join(distDir, cleanRoute);
      targetFile = path.join(targetDir, 'index.html');
    }

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetFile, html, 'utf-8');
    console.log(`  ✓ ${routePath} -> ${path.relative(distDir, targetFile)}`);
  }

  console.log('[prerender] Done! All social previews generated.');
}

prerenderPages();
