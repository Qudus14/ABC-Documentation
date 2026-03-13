import { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { CodeExample } from '../../data/apiEndpoints';

interface CodeExamplesProps {
  examples: CodeExample;
}

export function CodeExamples({ examples }: CodeExamplesProps) {
  const languages = examples.snippets?.length
    ? examples.snippets.map((snippet) => ({
        key: snippet.id,
        label: snippet.label,
        value: snippet.code,
        language: snippet.language
      }))
    : [
        { key: 'curl', label: 'cURL', value: examples.curl, language: 'bash' },
        { key: 'javascript', label: 'JavaScript', value: examples.javascript, language: 'javascript' },
        { key: 'flutter', label: 'Flutter', value: examples.flutter, language: 'dart' },
        { key: 'python', label: 'Python', value: examples.python, language: 'python' },
        { key: 'php', label: 'PHP', value: examples.php, language: 'php' }
      ].filter((lang) => lang.value);

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
          <CodeBlock code={lang.value || ''} language={lang.language} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
