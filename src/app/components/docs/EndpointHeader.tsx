import { useState } from 'react';
import { Copy } from 'lucide-react';
import { MethodBadge } from './MethodBadge';
import { ApiMethod } from '../../data/apiEndpoints';

interface EndpointHeaderProps {
  method: ApiMethod;
  route: string;
  title: string;
  description: string;
  copyValue?: string;
}

export function EndpointHeader({ method, route, title, description, copyValue }: EndpointHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(copyValue || route);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="mb-2">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <button
          onClick={handleCopyUrl}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          title="Copy reference"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl border border-border">
        <MethodBadge method={method} />
        <code className="flex-1 font-mono text-sm">{route}</code>
        <button
          onClick={handleCopyUrl}
          className="px-3 py-1.5 text-xs rounded-lg bg-background hover:bg-muted transition-colors flex items-center gap-2"
        >
          <Copy className="w-3 h-3" />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
