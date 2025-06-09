import MarkdownIt from 'markdown-it';

// Initialize markdown-it with safe HTML rendering
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

/**
 * Convert markdown text to HTML
 */
export const renderMarkdown = (markdown: string): string => {
  if (!markdown) return '';
  return md.render(markdown);
};

/**
 * Convert markdown text to plain text (strip HTML tags)
 */
export const markdownToPlainText = (markdown: string): string => {
  if (!markdown) return '';
  const html = md.render(markdown);
  // Simple HTML tag removal - for more complex needs, consider using a proper HTML parser
  return html.replace(/<[^>]*>/g, '').trim();
};

/**
 * Truncate markdown content to a specific length while preserving word boundaries
 */
export const truncateMarkdown = (markdown: string, maxLength = 150): string => {
  const plainText = markdownToPlainText(markdown);
  if (plainText.length <= maxLength) return plainText;

  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }

  return truncated + '...';
};
