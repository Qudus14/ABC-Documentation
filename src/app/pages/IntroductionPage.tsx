import { DocLayout } from '../components/layout/DocLayout';
import { InfoBox } from '../components/docs/InfoBox';
import { CodeBlock } from '../components/docs/CodeBlock';

export default function IntroductionPage() {
  return (
    <DocLayout>
      <div className="space-y-8">
        <div>
          <h1>Introduction</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Welcome to the Egolapay API documentation. This guide will help you integrate 
            payments, transfers, and bill payment services into your application.
          </p>
        </div>

        <InfoBox type="info" title="Getting Started">
          To begin using the Egolapay API, you'll need to create an account and obtain your API keys. 
          Visit the <a href="/docs/api-keys" className="text-[#FF8000] hover:underline">API Keys</a> page 
          to learn how to generate your credentials.
        </InfoBox>

        <section id="base-url">
          <h2>Base URL</h2>
          <p className="text-muted-foreground mb-4">
            All API requests should be made to the following base URL:
          </p>
          <div className="p-4 bg-muted rounded-xl font-mono text-sm">
            https://api.egolapay.com
          </div>
        </section>

        <section id="authentication">
          <h2>Authentication</h2>
          <p className="text-muted-foreground mb-4">
            Egolapay uses API keys to authenticate requests. Include your API key in the 
            Authorization header as a Bearer token:
          </p>
          <CodeBlock 
            code={`Authorization: Bearer YOUR_SECRET_KEY`}
            language="bash"
          />
        </section>

        <section id="response-format">
          <h2>Response Format</h2>
          <p className="text-muted-foreground mb-4">
            All responses are returned in JSON format with the following structure:
          </p>
          <CodeBlock 
            code={`{
  "status": "success",
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  }
}`}
            language="json"
          />
        </section>

        <section id="rate-limiting">
          <h2>Rate Limiting</h2>
          <p className="text-muted-foreground">
            API requests are limited to 100 requests per minute per API key. 
            If you exceed this limit, you'll receive a 429 Too Many Requests response.
          </p>
        </section>

        <InfoBox type="warning" title="Important">
          Never expose your secret API key in client-side code or public repositories. 
          Keep your keys secure and use environment variables in production.
        </InfoBox>
      </div>
    </DocLayout>
  );
}
