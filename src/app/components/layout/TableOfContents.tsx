import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string>('');
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  useEffect(() => {
    // Extract headings from the main content
    const headings = document.querySelectorAll('.doc-content h2, .doc-content h3');
    const items: TocItem[] = Array.from(headings)
      .filter((heading) => heading.id) // Only include headings with IDs
      .map((heading) => ({
        id: heading.id,
        title: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1))
      }));
    setTocItems(items);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      if (heading.id) observer.observe(heading);
    });

    return () => {
      headings.forEach((heading) => {
        if (heading.id) observer.unobserve(heading);
      });
    };
  }, []);

  if (tocItems.length === 0) return null;

  return (
    <aside className="hidden xl:block w-64 pl-8">
      <div className="sticky top-24 space-y-3">
        <h4 className="text-sm font-semibold text-foreground">On this page</h4>
        <nav className="space-y-2">
          {tocItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-sm transition-colors ${
                item.level === 3 ? 'pl-4' : ''
              } ${
                activeId === item.id
                  ? 'text-[#FF8000] font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}