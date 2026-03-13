import { useState } from 'react';
import { Search, Moon, Sun, Menu, ChevronDown, ExternalLink } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Link } from 'react-router';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const version = 'JS SDK';

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Left: Logo + Menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center bg-transparent">
                <img
                  src="https://res.cloudinary.com/dl9m2dzgk/image/upload/v1725615117/egolepay_qmnlqw.png"
                  alt="EgolePay"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-semibold text-lg hidden sm:inline">EgolePay</span>
              <span className="text-xs px-2 py-1 rounded-full border border-border bg-[#FFF3DB] text-[#B86400] hidden sm:inline dark:bg-[#2D2417] dark:text-[#FFD08A]">
                SDK Docs
              </span>
            </Link>
          </div>

          {/* Center: Search */}
          <div className="flex-1 max-w-md mx-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors text-sm text-muted-foreground"
            >
              <Search className="w-4 h-4" />
              <span className="flex-1 text-left">Search documentation...</span>
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right: Version + Theme + Links */}
          <div className="flex items-center gap-2">
            {/* Version Selector */}
            <button className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors text-sm">
              <span>{version}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Status Link */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center gap-1"
              asChild
            >
              <a href="https://status.egolepay.com" target="_blank" rel="noopener noreferrer">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Status
              </a>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-lg"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>

            {/* GitHub */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg hidden sm:flex"
              asChild
            >
              <a href="https://dashboard.egolepay.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Search Documentation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Type to search..."
              autoFocus
              className="text-base"
            />
            <div className="text-sm text-muted-foreground">
              Start typing to search through the documentation...
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
