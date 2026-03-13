import { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, GitBranch, Key, CreditCard, Send, Receipt, Zap, Webhook, AlertCircle, Package, Download, Clock, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { ScrollArea } from '../ui/scroll-area';
import { apiEndpoints, categories } from '../../data/apiEndpoints';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = '' }: SidebarProps) {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Payments API']);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const navigationItems = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Introduction', path: '/docs/introduction', icon: BookOpen },
        { title: 'Authentication', path: '/docs/authentication', icon: Key },
        { title: 'API Keys', path: '/docs/api-keys', icon: Key }
      ]
    }
  ];

  const categoryIcons: Record<string, any> = {
    'Payments API': CreditCard,
    'Transfers API': Send,
    'Bill Payments API': Receipt,
    'AutoReg API': Zap
  };

  const getCategoryEndpoints = (category: string) => {
    return apiEndpoints.filter(e => e.category === category);
  };

  return (
    <aside className={`w-64 border-r border-border bg-background flex-shrink-0 ${className}`}>
      <ScrollArea className="h-[calc(100vh-4rem)] py-6 px-4">
        <nav className="space-y-6">
          {/* Getting Started */}
          {navigationItems.map((section, idx) => (
            <div key={idx}>
              <h4 className="mb-2 px-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
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
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-[#FF8000]/10 text-[#FF8000] font-medium'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* API Categories */}
          {categories.map((category) => {
            const Icon = categoryIcons[category] || FileText;
            const isExpanded = expandedCategories.includes(category);
            const endpoints = getCategoryEndpoints(category);

            return (
              <div key={category}>
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between px-2 py-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold hover:text-foreground transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {category}
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-2 space-y-1">
                    {endpoints.map((endpoint) => {
                      const isActive = location.pathname === `/docs/${endpoint.id}`;
                      return (
                        <Link
                          key={endpoint.id}
                          to={`/docs/${endpoint.id}`}
                          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive
                              ? 'bg-[#FF8000]/10 text-[#FF8000] font-medium'
                              : 'text-foreground hover:bg-muted'
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

          {/* Additional Resources */}
          <div>
            <h4 className="mb-2 px-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Resources
            </h4>
            <div className="space-y-1">
              <Link
                to="/docs/webhooks"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
              >
                <Webhook className="w-4 h-4" />
                Webhooks
              </Link>
              <Link
                to="/docs/error-codes"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
              >
                <AlertCircle className="w-4 h-4" />
                Error Codes
              </Link>
              <Link
                to="/docs/sdks"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
              >
                <Package className="w-4 h-4" />
                SDKs
              </Link>
              <Link
                to="/docs/changelog"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
              >
                <Clock className="w-4 h-4" />
                Changelog
              </Link>
            </div>
          </div>
        </nav>
      </ScrollArea>
    </aside>
  );
}