import { Parameter } from '../../data/apiEndpoints';

interface ParameterTableProps {
  parameters: Parameter[];
}

export function ParameterTable({ parameters }: ParameterTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium">Parameter</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Required</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((param, index) => (
            <tr 
              key={index} 
              className="border-t border-border hover:bg-muted/30 transition-colors"
            >
              <td className="px-4 py-3 font-mono text-sm">{param.name}</td>
              <td className="px-4 py-3 text-sm">
                <code className="px-2 py-1 bg-muted rounded text-xs">{param.type}</code>
              </td>
              <td className="px-4 py-3 text-sm">
                {param.required ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs">
                    Required
                  </span>
                ) : (
                  <span className="text-muted-foreground text-xs">Optional</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{param.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
