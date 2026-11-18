"use client";

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { DOMParser as ProseMirrorDOMParser } from '@tiptap/pm/model';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  RemoveFormatting,
  Undo,
  Redo,
} from 'lucide-react';

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

/**
 * Cleans and transforms text and HTML pasted from Word, Google Docs, PDFs, or web pages:
 * - Detects bullet markers (•, ·, -, *, numbers like 1.) and structures them into semantic <ul><li> / <ol><li>
 * - Strips Word conditional comments, XML, and proprietary mso-* styles
 * - Preserves inline styling (bold, italic, underline) and headings
 * - Prevents text concatenation and avoids creating extraneous empty blank lines
 */
export function cleanAndStructureContent(input: string): string {
  if (!input || !input.trim()) return '';

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return input;
  }

  // Extract content between StartFragment / EndFragment if present (Word/Office format)
  const fragmentMatch = input.match(/<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/i);
  let content = fragmentMatch ? fragmentMatch[1] : input;

  try {
    // 1. Pre-clean Word XML, styles, and conditional comments
    content = content
      .replace(/<xml[\s\S]*?<\/xml>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<meta[^>]*>/gi, '')
      .replace(/<link[^>]*>/gi, '')
      .replace(/<!--?\[if[\s\S]*?(?:<!\[endif\]-->|<!--\[endif\]-->)/gi, '')
      .replace(/<!?\[if[\s\S]*?\]>/gi, '')
      .replace(/<!?\[endif\]>?/gi, '');

    const root = document.createElement('div');
    root.innerHTML = content;

    // If input is purely plain text (no HTML tags), structure lines and wrap in <p>
    if (!/<[a-z][\s\S]*>/i.test(content)) {
      const rawLines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      const paragraphs: string[] = [];
      const bulletRegex = /^[•·\u2022\u00b7\-*]\s*/;
      const numRegex = /^\d+[\.\)]\s*/;

      for (let i = 0; i < rawLines.length; i++) {
        const line = rawLines[i];
        const isBullet = bulletRegex.test(line) || numRegex.test(line);

        if (isBullet) {
          paragraphs.push(line);
        } else {
          const prev = paragraphs[paragraphs.length - 1];
          const isPrevBullet = prev && (bulletRegex.test(prev) || numRegex.test(prev));

          const isContinuation =
            isPrevBullet &&
            !line.includes('|') &&
            (/^[a-z]/.test(line) ||
              /[,;:–—\(\/]$/.test(prev) ||
              (!/\.\s*$/.test(prev) &&
                !/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|\d{4})/i.test(line)));

          if (isContinuation) {
            paragraphs[paragraphs.length - 1] += ' ' + line;
          } else {
            paragraphs.push(line);
          }
        }
      }
      root.innerHTML = paragraphs.map((p) => `<p>${p}</p>`).join('');
    }

    const removeEmptyTextNodes = (parent: Node) => {
      Array.from(parent.childNodes).forEach((child) => {
        if (child.nodeType === 3 && !child.nodeValue?.trim()) {
          child.remove();
        }
      });
    };
    removeEmptyTextNodes(root);

    // Convert Word ignore spans
    root.querySelectorAll('[style*="mso-list:Ignore"]').forEach((el) => {
      el.replaceWith('• ');
    });

    // Normalize inline formatting (bold, italic, underline) before stripping styles
    root.querySelectorAll('*').forEach((el) => {
      const htmlEl = el as HTMLElement;
      const styleAttr = htmlEl.getAttribute('style') || '';
      const style = htmlEl.style;

      const isBoldStyle =
        style.fontWeight === 'bold' ||
        parseInt(style.fontWeight, 10) >= 600 ||
        /mso-bidi-font-weight:\s*bold/i.test(styleAttr) ||
        /-Bold/i.test(style.fontFamily);
      const isHeadingTag = /^H[1-6]$/i.test(el.tagName);

      if ((isBoldStyle || isHeadingTag) && el.tagName !== 'STRONG' && el.tagName !== 'B') {
        const strong = document.createElement('strong');
        while (el.firstChild) {
          strong.appendChild(el.firstChild);
        }
        el.appendChild(strong);
      }

      const isItalicStyle = style.fontStyle === 'italic' || /-Italic/i.test(style.fontFamily);
      if (isItalicStyle && el.tagName !== 'EM' && el.tagName !== 'I') {
        const em = document.createElement('em');
        while (el.firstChild) {
          em.appendChild(el.firstChild);
        }
        el.appendChild(em);
      }

      const isUnderline = style.textDecoration && style.textDecoration.includes('underline');
      if (isUnderline && el.tagName !== 'U') {
        const u = document.createElement('u');
        while (el.firstChild) {
          u.appendChild(el.firstChild);
        }
        el.appendChild(u);
      }

      const isMsoList =
        (el.className || '').includes('MsoList') || styleAttr.includes('mso-list');
      if (isMsoList) {
        el.setAttribute('data-mso-list', 'true');
      }

      el.removeAttribute('style');
      el.removeAttribute('class');
      el.removeAttribute('id');
    });

    // If any paragraph or div contains <br> tags, split it into separate paragraphs
    root.querySelectorAll('p, div').forEach((block) => {
      if (block.querySelector('br')) {
        const parts: Node[][] = [[]];
        Array.from(block.childNodes).forEach((child) => {
          if (child.nodeName === 'BR') {
            parts.push([]);
          } else {
            parts[parts.length - 1].push(child);
          }
        });

        const frag = document.createDocumentFragment();
        parts.forEach((partNodes) => {
          const p = document.createElement('p');
          if (block.getAttribute('data-mso-list')) {
            p.setAttribute('data-mso-list', 'true');
          }
          partNodes.forEach((n) => p.appendChild(n));
          if (p.textContent?.trim() || p.querySelector('img')) {
            frag.appendChild(p);
          }
        });
        block.replaceWith(frag);
      }
    });

    removeEmptyTextNodes(root);

    // Wrap any orphan top-level text nodes in <p>
    const childNodes = Array.from(root.childNodes);
    let currentP: HTMLParagraphElement | null = null;
    childNodes.forEach((child) => {
      if (child.nodeType === 3) {
        if (child.nodeValue?.trim()) {
          if (!currentP) {
            currentP = document.createElement('p');
            root.insertBefore(currentP, child);
          }
          currentP.appendChild(child);
        } else {
          child.remove();
        }
      } else if (
        child.nodeType === 1 &&
        !/^(P|DIV|UL|OL|LI|H[1-6]|TABLE)$/i.test(child.nodeName)
      ) {
        if (!currentP) {
          currentP = document.createElement('p');
          root.insertBefore(currentP, child);
        }
        currentP.appendChild(child);
      } else {
        currentP = null;
      }
    });

    removeEmptyTextNodes(root);

    // Group consecutive list items into <ul> or <ol>
    const blocks = Array.from(root.querySelectorAll('p, div, li'));
    let currentList: { el: HTMLUListElement | HTMLOListElement; isOrdered: boolean } | null = null;

    const bulletRegex = /^[•·\u2022\u00b7\-*]\s*/;
    const numRegex = /^\d+[\.\)]\s*/;

    blocks.forEach((el) => {
      if (!el.parentNode) return;

      const isMsoList = el.getAttribute('data-mso-list') === 'true';
      const rawText = el.textContent?.trim() || '';

      const hasBullet = bulletRegex.test(rawText);
      const hasNum = numRegex.test(rawText);
      const isList = isMsoList || hasBullet || hasNum;

      if (isList && rawText.length > 0) {
        const isOrdered = hasNum;

        // Strip leading bullet symbol from the first text node
        const walker = document.createTreeWalker(el, 4 /* NodeFilter.SHOW_TEXT */);
        let textNode = walker.nextNode();
        while (textNode) {
          const val = textNode.nodeValue || '';
          if (val.trim()) {
            textNode.nodeValue = val.replace(isOrdered ? numRegex : bulletRegex, '');
            break;
          }
          textNode = walker.nextNode();
        }

        const li = document.createElement('li');
        while (el.firstChild) {
          li.appendChild(el.firstChild);
        }

        if (
          !currentList ||
          currentList.isOrdered !== isOrdered ||
          el.previousElementSibling !== currentList.el
        ) {
          const listTag = isOrdered ? document.createElement('ol') : document.createElement('ul');
          el.parentNode.insertBefore(listTag, el);
          currentList = { el: listTag, isOrdered };
        }

        currentList.el.appendChild(li);
        el.remove();
      } else {
        currentList = null;
      }
    });

    return root.innerHTML || input;
  } catch (err) {
    console.error('Error cleaning content in RichTextEditor:', err);
    return input;
  }
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
      transformPastedHTML(html) {
        return cleanAndStructureContent(html);
      },
      handlePaste(view, event) {
        const clipboardData = event.clipboardData;
        if (!clipboardData) return false;

        const html = clipboardData.getData('text/html');
        const text = clipboardData.getData('text/plain');

        const inputToProcess = html && html.trim().length > 0 ? html : text;
        if (!inputToProcess || !inputToProcess.trim()) return false;

        const structured = cleanAndStructureContent(inputToProcess);
        if (!structured) return false;

        if (typeof document !== 'undefined') {
          const temp = document.createElement('div');
          temp.innerHTML = structured;
          const parser = ProseMirrorDOMParser.fromSchema(view.state.schema);
          const slice = parser.parseSlice(temp);
          const tr = view.state.tr.replaceSelection(slice);
          view.dispatch(tr);
          return true;
        }

        return false;
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

  const handleClearFormatting = () => {
    if (!editor) return;
    const { empty } = editor.state.selection;
    if (empty) {
      // Clear formatting for all content when no specific text range is selected
      editor
        .chain()
        .focus()
        .selectAll()
        .clearNodes()
        .unsetAllMarks()
        .run();
    } else {
      // Clear formatting for the currently highlighted text selection
      editor
        .chain()
        .focus()
        .clearNodes()
        .unsetAllMarks()
        .run();
    }
  };

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

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={`p-1 rounded text-xs transition ${editor.isActive('underline')
              ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 underline font-semibold'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            title="Underline (Ctrl+U)"
            aria-label="Format Underline"
          >
            <UnderlineIcon className="w-3.5 h-3.5" />
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
            onClick={handleClearFormatting}
            className="flex items-center gap-1 px-1.5 py-1 rounded text-xs text-slate-600 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition"
            title="Clear Formatting (Remove styles and reset to plain text)"
            aria-label="Clear Formatting"
          >
            <RemoveFormatting className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium hidden sm:inline">Clear Format</span>
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
        <div className="prose prose-xs dark:prose-invert max-w-none [&_.ProseMirror]:min-h-[80px] [&_.ProseMirror_p]:my-1 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-4 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ml-4 [&_.ProseMirror_strong]:font-bold [&_.ProseMirror_em]:italic [&_.ProseMirror_u]:underline">
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
