import { DocLayout } from '../components/layout/DocLayout';
import { Database, ArrowRight, Code, FileText } from 'lucide-react';
import { CodeBlock } from '../components/docs/CodeBlock';

export default function ApiKeysPage() {
  const schemaExample = `interface ApiEndpoint {
  id: string;
  category: string;
  title: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  route: string;
  authenticationRequired: boolean;
  requestParameters?: Parameter[];
  sampleRequest?: string;
  sampleResponse: string;
  codeExamples: {
    curl?: string;
    javascript?: string;
    flutter?: string;
    python?: string;
    php?: string;
  };
  playgroundEnabled?: boolean;
}`;

  return (
    <DocLayout>
      <div className="space-y-8">
        <div>
          <h1>API Keys & Schema-Driven Architecture</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Understanding how Egolapay's documentation system works and how to manage your API keys.
          </p>
        </div>

        <section id="schema-driven">
          <h2>Schema-Driven Documentation</h2>
          <p className="text-muted-foreground mb-6">
            This documentation platform is powered by a structured endpoint model. Every page you see 
            is automatically generated from a single data structure, making it easy to maintain and scale.
          </p>

          {/* Visual Diagram */}
          <div className="rounded-xl border border-border bg-card p-8 mb-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Database className="w-8 h-8 text-blue-500" />
                </div>
                <span className="text-sm font-medium">Data Model</span>
              </div>

              <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90 md:rotate-0" />

              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Code className="w-8 h-8 text-green-500" />
                </div>
                <span className="text-sm font-medium">Renderer</span>
              </div>

              <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90 md:rotate-0" />

              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-purple-500" />
                </div>
                <span className="text-sm font-medium">Documentation</span>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Adding a new endpoint only requires updating the data structure
            </p>
          </div>

          <div className="space-y-4">
            <h3 id="endpoint-schema">Endpoint Schema Structure</h3>
            <CodeBlock code={schemaExample} language="typescript" />
          </div>
        </section>

        <section id="benefits">
          <h2>Benefits of Schema-Driven Approach</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-xl border border-border bg-card">
              <h3 id="consistency" className="text-base mb-2">Consistency</h3>
              <p className="text-sm text-muted-foreground">
                All endpoints follow the same structure and presentation format
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <h3 id="maintainability" className="text-base mb-2">Maintainability</h3>
              <p className="text-sm text-muted-foreground">
                Update once, reflect everywhere. No duplicate code or content
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <h3 id="scalability" className="text-base mb-2">Scalability</h3>
              <p className="text-sm text-muted-foreground">
                Easily scale to 100+ endpoints without redesigning
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <h3 id="auto-generation" className="text-base mb-2">Auto-Generation</h3>
              <p className="text-sm text-muted-foreground">
                Sidebar, TOC, and playground are automatically generated
              </p>
            </div>
          </div>
        </section>

        <section id="managing-keys">
          <h2>Managing Your API Keys</h2>
          <p className="text-muted-foreground mb-4">
            To get started with the Egolapay API, you'll need to generate your API keys 
            from the dashboard. Follow the steps in the{' '}
            <a href="/docs/authentication" className="text-[#FF8000] hover:underline">
              Authentication
            </a>{' '}
            guide to learn more.
          </p>
        </section>
      </div>
    </DocLayout>
  );
}