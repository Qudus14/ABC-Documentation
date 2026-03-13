import { DocLayout } from '../components/layout/DocLayout';
import { InfoBox } from '../components/docs/InfoBox';
import { CodeBlock } from '../components/docs/CodeBlock';
import { Key, Eye, EyeOff } from 'lucide-react';

export default function AuthenticationPage() {
  return (
    <DocLayout>
      <div className="space-y-8">
        <div>
          <h1>Authentication</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Learn how to authenticate your API requests using Egolapay API keys.
          </p>
        </div>

        <section id="api-keys">
          <h2>API Keys</h2>
          <p className="text-muted-foreground mb-4">
            Egolapay uses API keys to authenticate requests. You'll receive two types of keys:
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Key className="w-5 h-5 text-green-500" />
                <h3 id="public-key" className="text-base">Public Key</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Used for client-side operations. Safe to include in your frontend code.
              </p>
              <code className="text-xs text-green-600 dark:text-green-400 mt-2 block">
                pk_test_xxxxxxxxxx
              </code>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Key className="w-5 h-5 text-red-500" />
                <h3 id="secret-key" className="text-base">Secret Key</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Used for server-side operations. Keep this secure and never expose it.
              </p>
              <code className="text-xs text-red-600 dark:text-red-400 mt-2 block">
                sk_test_xxxxxxxxxx
              </code>
            </div>
          </div>

          <InfoBox type="warning" title="Security Warning">
            Never expose your secret key in client-side code, public repositories, or any publicly 
            accessible location. Always use environment variables and secure storage.
          </InfoBox>
        </section>

        <section id="bearer-token">
          <h2>Using Bearer Token</h2>
          <p className="text-muted-foreground mb-4">
            Include your secret key in the Authorization header as a Bearer token:
          </p>
          <CodeBlock 
            code={`curl -X POST https://api.egolapay.com/api/v1/transactions/initialize \\
  -H "Authorization: Bearer sk_test_your_secret_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "customer@example.com",
    "amount": 50000
  }'`}
            language="bash"
          />
        </section>

        <section id="generate-keys">
          <h2>How to Generate API Keys</h2>
          <div className="space-y-4 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2">
              <li>Log in to your <a href="#" className="text-[#FF8000] hover:underline">Egolapay Dashboard</a></li>
              <li>Navigate to Settings → API Keys</li>
              <li>Click "Generate New Key"</li>
              <li>Copy and securely store your keys</li>
              <li>Use test keys for development and live keys for production</li>
            </ol>
          </div>
        </section>

        <section id="environments">
          <h2>Test vs Live Keys</h2>
          <p className="text-muted-foreground mb-4">
            Egolapay provides separate keys for testing and production:
          </p>
          
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Environment</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Prefix</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-medium">Test</td>
                  <td className="px-4 py-3 font-mono text-sm">sk_test_</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    For development and testing. No real money is processed.
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-medium">Live</td>
                  <td className="px-4 py-3 font-mono text-sm">sk_live_</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    For production. Real transactions are processed.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <InfoBox type="info" title="Best Practice">
          Always test your integration thoroughly using test keys before switching to live keys 
          in production. This ensures your integration works correctly without risking real transactions.
        </InfoBox>
      </div>
    </DocLayout>
  );
}