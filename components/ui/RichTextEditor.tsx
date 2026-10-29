"use client";

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Undo, Redo } from 'lucide-react';

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write or paste your bullet points, achievements, and responsibilities...',
  label,
  error,
  helperText,
  className = '',
}) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: false,
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class:
          'min-h-[90px] w-full px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none leading-relaxed',
        placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // If editor is empty paragraph, pass empty string
      if (html === '<p></p>') {
        onChange('');
      } else {
        onChange(html);
      }
    },
  });

  // Keep editor content in sync with external value updates (e.g. sample data, reset)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      // Avoid resetting if difference is just empty paragraph
      if (value === '' && editor.getHTML() === '<p></p>') return;
      editor.commands.setContent(value || '', { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
          {label}
        </label>
      )}

      <div
        className={`rounded-lg border bg-white dark:bg-slate-900 transition-colors shadow-2xs overflow-hidden ${error
          ? 'border-rose-400 focus-within:border-rose-500 focus-within:ring-1 focus-within:ring-rose-200'
          : 'border-slate-300 dark:border-slate-700 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900'
          }`}
      >
        {/* Compact Rich Text Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-1.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`p-1 rounded text-xs transition ${editor.isActive('bold')
              ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            title="Bold (Ctrl+B)"
            aria-label="Format Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`p-1 rounded text-xs transition ${editor.isActive('italic')
              ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            title="Italic (Ctrl+I)"
            aria-label="Format Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-3.5 bg-slate-200 dark:bg-slate-700 mx-1" />

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1 rounded text-xs transition ${editor.isActive('bulletList')
              ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            title="Bullet List"
            aria-label="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1 rounded text-xs transition ${editor.isActive('orderedList')
              ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            title="Numbered List"
            aria-label="Numbered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-3.5 bg-slate-200 dark:bg-slate-700 mx-1" />

          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1 rounded text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition"
            title="Undo (Ctrl+Z)"
            aria-label="Undo"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1 rounded text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition"
            title="Redo (Ctrl+Y)"
            aria-label="Redo"
          >
            <Redo className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ProseMirror Editor Surface */}
        <div className="prose prose-xs dark:prose-invert max-w-none [&_.ProseMirror]:min-h-[80px] [&_.ProseMirror_p]:my-1 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-4 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ml-4 [&_.ProseMirror_strong]:font-bold [&_.ProseMirror_em]:italic">
          <EditorContent editor={editor} />
        </div>
      </div>

      {error ? (
        <p className="mt-1 text-xs text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
};
