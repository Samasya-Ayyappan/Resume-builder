import React from 'react';

export interface RichTextRendererProps {
  content: string;
  className?: string;
  style?: React.CSSProperties;
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({
  content,
  className = '',
  style,
}) => {
  if (!content) return null;

  // Check if string contains HTML tags
  const hasHtml = /<[a-z][\s\S]*>/i.test(content);

  if (hasHtml) {
    return (
      <div
        style={style}
        className={`leading-relaxed [&_p]:my-0.5 [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_i]:italic [&_ul]:list-disc [&_ul]:list-outside [&_ul]:ml-4 [&_ul]:my-1 [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:ml-4 [&_ol]:my-1 [&_li]:my-0.5 ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div style={style} className={`whitespace-pre-line leading-relaxed ${className}`}>
      {content}
    </div>
  );
};
