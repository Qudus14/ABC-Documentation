import { AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface InfoBoxProps {
  type: 'info' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
}

export function InfoBox({ type, title, children }: InfoBoxProps) {
  const styles = {
    info: {
      container: 'bg-blue-500/10 border-blue-500/30 dark:bg-blue-500/10',
      icon: 'text-blue-600 dark:text-blue-400',
      title: 'text-blue-700 dark:text-blue-300',
      Icon: Info
    },
    warning: {
      container: 'bg-[#FF8000]/10 border-[#FF8000]/30',
      icon: 'text-[#FF8000]',
      title: 'text-[#FF8000]',
      Icon: AlertTriangle
    },
    error: {
      container: 'bg-red-500/10 border-red-500/30',
      icon: 'text-red-600 dark:text-red-400',
      title: 'text-red-700 dark:text-red-300',
      Icon: AlertCircle
    }
  };

  const style = styles[type];
  const IconComponent = style.Icon;

  return (
    <div className={`rounded-xl border p-4 ${style.container}`}>
      <div className="flex gap-3">
        <IconComponent className={`w-5 h-5 flex-shrink-0 mt-0.5 ${style.icon}`} />
        <div className="flex-1">
          {title && (
            <h4 className={`font-medium mb-1 ${style.title}`}>{title}</h4>
          )}
          <div className="text-sm text-foreground/80">{children}</div>
        </div>
      </div>
    </div>
  );
}
