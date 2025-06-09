import React, { useState, useRef } from 'react';
import { renderMarkdown } from '~/utils/markdown';
import '~/styles/markdown.css';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  label?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
    placeholder = "Enter content here...",
  rows = 20,
  label = "Content"
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Helper function to insert text at cursor position
  const insertAtCursor = (before: string, after = '', placeholder = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || placeholder;

    const newValue =
      value.substring(0, start) +
      before + textToInsert + after +
      value.substring(end);

    onChange(newValue);

    // Set cursor position after insertion
    setTimeout(() => {
      const newCursorPos = start + before.length + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  // Toolbar button handlers
  const handleBold = () => insertAtCursor('**', '**', 'bold text');
  const handleItalic = () => insertAtCursor('*', '*', 'italic text');
  const handleCode = () => insertAtCursor('`', '`', 'code');
  const handleLink = () => insertAtCursor('[', '](https://example.com)', 'link text');

  const handleHeader = (level: number) => {
    const hashes = '#'.repeat(level);
    insertAtCursor(`${hashes} `, '', 'Header text');
  };

  const handleList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const newValue =
      value.substring(0, lineStart) +
      '- ' +
      value.substring(lineStart);

    onChange(newValue);

    setTimeout(() => {
      textarea.setSelectionRange(start + 2, start + 2);
      textarea.focus();
    }, 0);
  };

  const handleNumberedList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const newValue =
      value.substring(0, lineStart) +
      '1. ' +
      value.substring(lineStart);

    onChange(newValue);

    setTimeout(() => {
      textarea.setSelectionRange(start + 3, start + 3);
      textarea.focus();
    }, 0);
  };

  const handleQuote = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const newValue =
      value.substring(0, lineStart) +
      '> ' +
      value.substring(lineStart);

    onChange(newValue);

    setTimeout(() => {
      textarea.setSelectionRange(start + 2, start + 2);
      textarea.focus();
    }, 0);
  };

  const handleCodeBlock = () => {
    insertAtCursor('\n```\n', '\n```\n', 'code here');
  };

  const handleTable = () => {
    const tableTemplate = `
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
`;
    insertAtCursor(tableTemplate, '');
  };

  const handleHorizontalRule = () => {
    insertAtCursor('\n---\n', '');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Toolbar */}
      <div className="border border-gray-300 rounded-t-md bg-gray-50 p-2">
        <div className="flex flex-wrap gap-1">
          {/* Text Formatting */}
          <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
            <button
              type="button"
              onClick={handleBold}
              className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 font-bold"
              title="Bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={handleItalic}
              className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 italic"
              title="Italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={handleCode}
              className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 font-mono"
              title="Inline Code"
            >
              &lt;/&gt;
            </button>
          </div>

          {/* Headers */}
          <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
            <button
              type="button"
              onClick={() => handleHeader(1)}
              className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 font-bold"
              title="Header 1"
            >
              H1
            </button>
            <button
              type="button"
              onClick={() => handleHeader(2)}
              className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 font-semibold"
              title="Header 2"
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => handleHeader(3)}
              className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
              title="Header 3"
            >
              H3
            </button>
          </div>

          {/* Lists */}
          <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
            <button
              type="button"
              onClick={handleList}
              className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
              title="Bullet List"
            >
              • List
            </button>
            <button
              type="button"
              onClick={handleNumberedList}
              className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
              title="Numbered List"
            >
              1. List
            </button>
          </div>

          {/* Other Elements */}
          <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
            <button
              type="button"
              onClick={handleLink}
              className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
              title="Link"
            >
              🔗
            </button>
            <button
              type="button"
              onClick={handleQuote}
              className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
              title="Quote"
            >
              &ldquo; &rdquo;
            </button>
            <button
              type="button"
              onClick={handleCodeBlock}
              className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
              title="Code Block"
            >
              { }
            </button>
            <button
              type="button"
              onClick={handleTable}
              className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
              title="Table"
            >
              ⊞
            </button>
            <button
              type="button"
              onClick={handleHorizontalRule}
              className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
              title="Horizontal Line"
            >
              ―
            </button>
          </div>

          {/* Preview Toggle */}
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`px-4 py-2 text-sm font-medium border border-gray-300 rounded-md transition-colors ${
              showPreview
                ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            title={showPreview ? 'Switch to Edit Mode' : 'Switch to Preview Mode'}
          >
            {showPreview ? '✏️ Edit' : '👁️ Preview'}
          </button>
        </div>
      </div>

            {/* Editor/Preview Area */}
      {showPreview ? (
        <div className="border border-gray-300 rounded-b-md p-4 bg-white min-h-[500px] max-h-[600px] overflow-y-auto">
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(value || '<p class="text-gray-500 italic">Nothing to preview... Start typing in edit mode to see your content here.</p>')
            }}
          />
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-3 py-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-y min-h-[500px]"
        />
      )}

      {/* Help Text */}
      <div className="text-xs text-gray-500 space-y-1">
        <p><strong>Quick Tips:</strong></p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>• Use toolbar buttons for formatting</div>
          <div>• Click &ldquo;Preview&rdquo; to see results</div>
          <div>• **text** = <strong>bold</strong></div>
          <div>• *text* = <em>italic</em></div>
          <div>• `code` = <code className="bg-gray-100 px-1 rounded">code</code></div>
          <div>• # Header = Large heading</div>
        </div>
      </div>
    </div>
  );
}
