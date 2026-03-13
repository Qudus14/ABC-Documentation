import { ReactNode } from 'react';
import { TableOfContents } from './TableOfContents';

interface DocLayoutProps {
  children: ReactNode;
}

export function DocLayout({ children }: DocLayoutProps) {
  return (
    <div className="flex flex-1 h-full">
      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 py-8">
        <div className="max-w-4xl mx-auto doc-content">
          {children}
        </div>
      </main>

      {/* Right Sidebar - Table of Contents */}
      <TableOfContents />
    </div>
  );
}