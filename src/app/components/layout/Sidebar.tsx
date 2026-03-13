import { useState } from 'react';
import { AlertCircle, BookOpen, ChevronDown, ChevronRight, CircleHelp, Clock, FileText, FlaskConical, Key, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { ScrollArea } from '../ui/scroll-area';
import { apiEndpoints, categories } from '../../data/apiEndpoints';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = '' }: SidebarProps) {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(categories);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
  };

  const navigationItems = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Introduction', path: '/docs/introduction', icon: BookOpen },
        { title: 'Authentication', path: '/docs/authentication', icon: Key },
        { title: 'API Keys', path: '/docs/api-keys', icon: Key },
        { title: 'Testing', path: '/docs/testing', icon: FlaskConical }
      ]
    }
  ];

  const categoryIcons: Record<string, typeof Sparkles> = {
    'SDK Basics': Sparkles,
    'Framework Guides': FileText
  };

  return (
    <aside className={`w-64 flex-shrink-0 border-r border-border bg-background ${className}`}>
      <ScrollArea className="h-[calc(100vh-4rem)] px-4 py-6">
        <nav className="space-y-6">
          {navigationItems.map((section) => (
            <div key={section.title}>
              <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h4>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive ? 'bg-[#FF8000]/10 font-medium text-[#FF8000]' : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {categories.map((category) => {
            const Icon = categoryIcons[category] || FileText;
            const isExpanded = expandedCategories.includes(category);
            const endpoints = apiEndpoints.filter((endpoint) => endpoint.category === category);

            return (
              <div key={category}>
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex w-full items-center justify-between px-2 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {category}
                  </div>
                  {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                </button>

                {isExpanded && (
                  <div className="mt-2 space-y-1">
                    {endpoints.map((endpoint) => {
                      const isActive = location.pathname === `/docs/${endpoint.id}`;
                      return (
                        <Link
                          key={endpoint.id}
                          to={`/docs/${endpoint.id}`}
                          className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                            isActive ? 'bg-[#FF8000]/10 font-medium text-[#FF8000]' : 'text-foreground hover:bg-muted'
                          }`}
                        >
                          {endpoint.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div>
            <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Resources</h4>
            <div className="space-y-1">
              <Link
                to="/docs/faq"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
              >
                <CircleHelp className="h-4 w-4" />
                FAQ
              </Link>
              <Link
                to="/docs/error-codes"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
              >
                <AlertCircle className="h-4 w-4" />
                Error Codes
              </Link>
              <Link
                to="/docs/changelog"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
              >
                <Clock className="h-4 w-4" />
                Changelog
              </Link>
            </div>
          </div>
        </nav>
      </ScrollArea>
    </aside>
  );
}
