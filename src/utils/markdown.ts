import { marked } from 'marked';
import DOMPurify from 'dompurify';

marked.setOptions({
  breaks: true,
  gfm: true,
});

export function renderMarkdown(markdown: string): string {
  if (!markdown) return '';
  const rawHtml = marked(markdown) as string;
  return DOMPurify.sanitize(rawHtml);
}