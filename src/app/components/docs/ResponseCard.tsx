import { CodeBlock } from './CodeBlock';

interface ResponseCardProps {
  title: string;
  response: string;
}

export function ResponseCard({ title, response }: ResponseCardProps) {
  return (
    <div className="space-y-3">
      <h3>{title}</h3>
      <CodeBlock code={response} language="json" />
    </div>
  );
}
