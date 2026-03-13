interface MethodBadgeProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

export function MethodBadge({ method }: MethodBadgeProps) {
  const colors = {
    GET: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    POST: 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400',
    PUT: 'bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400',
    DELETE: 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400',
    PATCH: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-xs font-mono uppercase ${colors[method]}`}>
      {method}
    </span>
  );
}
