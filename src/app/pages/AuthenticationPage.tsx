import { DocLayout } from '../components/layout/DocLayout';
import { InfoBox } from '../components/docs/InfoBox';
import { CodeBlock } from '../components/docs/CodeBlock';
import { Key } from 'lucide-react';

export default function AuthenticationPage() {
  return (
    <DocLayout>
      <div className="space-y-8">
        <div>
          <h1>Authentication & Environment Detection</h1>
          <p className="text-lg text-muted-foreground mt-2">
            The JavaScript SDK chooses the correct environment from the API key you provide. No extra base URL configuration is required.
          </p>
        </div>

        <section id="api-keys">
          <h2>API Keys</h2>
          <p className="text-muted-foreground mb-4">
            EgolePay currently documents two SDK key prefixes:
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Key className="w-5 h-5 text-green-500" />
                <h3 id="test-key" className="text-base">Test Key</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Used during sandbox testing. No real money is processed.
              </p>
              <code className="text-xs text-green-600 dark:text-green-400 mt-2 block">
                sk_test_xxxxxxxxxx
              </code>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Key className="w-5 h-5 text-red-500" />
                <h3 id="live-key" className="text-base">Live Key</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Used for production traffic after your checkout flow has been validated in test mode.
              </p>
              <code className="text-xs text-red-600 dark:text-red-400 mt-2 block">
                sk_live_xxxxxxxxxx
              </code>
            </div>
          </div>

          <InfoBox type="warning" title="Deployment Note">
            Keep your production key in your deployment configuration and rotate it from the dashboard whenever you suspect compromise or complete a security review.
          </InfoBox>
        </section>

        <section id="sdk-authentication">
          <h2>Using the Key in the SDK</h2>
          <p className="text-muted-foreground mb-4">
            Pass your EgolePay key directly into the checkout configuration:
          </p>
          <CodeBlock 
            code={`new EgolePay({
  apiKey: 'sk_test_your_key_here',
  referenceNumber: 'EGP77154452626262622',
  amount: 5000,
  email: 'customer@example.com'
});`}
            language="javascript"
          />
        </section>

        <section id="environments">
          <h2>Automatic Environment Detection</h2>
          <p className="text-muted-foreground mb-4">
            The SDK picks the correct backend automatically from the key prefix.
          </p>
          
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Environment</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Prefix</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Base URL</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-medium">Test</td>
                  <td className="px-4 py-3 font-mono text-sm">sk_test_</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">https://stageapi.egolepay.com</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-medium">Live</td>
                  <td className="px-4 py-3 font-mono text-sm">sk_live_</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">https://docs.api.egolepay.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="switching-live">
          <h2>Switching to Live</h2>
          <p className="text-muted-foreground mb-4">
            Moving to production is intentionally simple:
          </p>
          <CodeBlock
            code={`// Sandbox
apiKey: 'sk_test_xxxxxxxxxx'

// Production
apiKey: 'sk_live_xxxxxxxxxx'`}
            language="javascript"
          />
        </section>

        <InfoBox type="info" title="No Additional Configuration Needed">
          Once you replace the key prefix, the SDK routes requests to the correct EgolePay environment automatically.
        </InfoBox>
      </div>
    </DocLayout>
  );
}
