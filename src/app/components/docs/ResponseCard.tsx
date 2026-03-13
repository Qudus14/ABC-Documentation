import { CodeBlock } from './CodeBlock';

interface ResponseCardProps {
  title: string;
  response: string;
  language?: string;
}

export function ResponseCard({ title, response, language = 'json' }: ResponseCardProps) {
  return (
    <div className="space-y-3">
      <h3>{title}</h3>
      <CodeBlock code={response} language={language} />
    </div>
  );
}
