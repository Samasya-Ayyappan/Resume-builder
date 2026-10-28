import { Metadata } from 'next';
import { BuilderLayout } from '@/components/builder/BuilderLayout';

export const metadata: Metadata = {
  title: 'Resume Studio — Live Resume Editor',
  description: 'Interactive real-time resume editor with live A4 preview, template switching, and PDF export.',
};

export default function BuilderPage() {
  return (
    <main>
      <BuilderLayout />
    </main>
  );
}
