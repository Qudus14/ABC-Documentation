import { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { CodeExample } from '../../data/apiEndpoints';

interface CodeExamplesProps {
  examples: CodeExample;
}

export function CodeExamples({ examples }: CodeExamplesProps) {
  const languages = [
    { key: 'curl', label: 'cURL', value: examples.curl },
    { key: 'javascript', label: 'JavaScript', value: examples.javascript },
    { key: 'flutter', label: 'Flutter', value: examples.flutter },
    { key: 'python', label: 'Python', value: examples.python },
    { key: 'php', label: 'PHP', value: examples.php }
  ].filter(lang => lang.value);

  return (
    <Tabs defaultValue={languages[0]?.key} className="w-full">
      <TabsList className="w-full justify-start bg-muted/50 p-1 rounded-t-xl border-b border-border">
        {languages.map(lang => (
          <TabsTrigger 
            key={lang.key} 
            value={lang.key}
            className="data-[state=active]:bg-background rounded-lg"
          >
            {lang.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {languages.map(lang => (
        <TabsContent key={lang.key} value={lang.key} className="mt-0">
          <CodeBlock code={lang.value || ''} language={lang.key} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
