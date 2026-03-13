import { DocLayout } from '../components/layout/DocLayout';
import { KeyRound, LifeBuoy, ShieldCheck } from 'lucide-react';
import { CodeBlock } from '../components/docs/CodeBlock';
import { InfoBox } from '../components/docs/InfoBox';

export default function ApiKeysPage() {
  return (
    <DocLayout>
      <div className="space-y-8">
        <div>
          <h1>API Keys & Support</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Everything you need before moving from sandbox checkout to production checkout.
          </p>
        </div>

        <section id="get-keys">
          <h2>Get Your Keys</h2>
          <p className="text-muted-foreground mb-6">
            Retrieve your credentials from the EgolePay dashboard:
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-5">
              <KeyRound className="h-5 w-5 text-[#FF8000]" />
              <h3 id="dashboard-step-1" className="mt-3">1. Sign in</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Open your merchant dashboard at dashboard.egolepay.com.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <ShieldCheck className="h-5 w-5 text-[#FF8000]" />
              <h3 id="dashboard-step-2" className="mt-3">2. Open API Keys</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Navigate to Settings and then API Keys to reveal your current test and live values.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <LifeBuoy className="h-5 w-5 text-[#FF8000]" />
              <h3 id="dashboard-step-3" className="mt-3">3. Rotate if needed</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Generate a fresh key whenever you rotate credentials or onboard a new environment.
              </p>
            </div>
          </div>
        </section>

        <section id="test-key">
          <h2>Sandbox Credential</h2>
          <p className="text-muted-foreground mb-4">
            Use this test key while validating the integration:
          </p>
          <CodeBlock
            code={`sk_test_VRXD_9fA3KQWm2E8LxR7HcD0PZB6JtN4YV5S1`}
            language="bash"
          />
        </section>

        <section id="production-checklist">
          <h2>Go-Live Checklist</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="check-test-cards">Validate test cards</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Confirm success, OTP, invalid PIN, insufficient funds, and expired card scenarios in sandbox.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="check-callbacks">Handle callbacks</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Ensure your success, error, close, and cancel handlers all update your product flow correctly.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="check-reference">Pass referenceNumber</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Include the customer reference number in every SDK initialization so orders can be reconciled correctly.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="check-live-key">Swap the key</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Replace <code>sk_test_</code> with <code>sk_live_</code> in the final deployment configuration.
              </p>
            </div>
          </div>
        </section>

        <section id="support">
          <h2>Support Channels</h2>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="grid gap-3 text-sm md:grid-cols-2">
              <a href="mailto:api-support@egolepay.com" className="rounded-xl border border-border px-4 py-3 transition-colors hover:bg-muted/40">
                Email: api-support@egolepay.com
              </a>
              <a href="https://docs.egolepay.com" target="_blank" rel="noreferrer" className="rounded-xl border border-border px-4 py-3 transition-colors hover:bg-muted/40">
                Documentation: docs.egolepay.com
              </a>
              <a href="https://dashboard.egolepay.com" target="_blank" rel="noreferrer" className="rounded-xl border border-border px-4 py-3 transition-colors hover:bg-muted/40">
                Dashboard: dashboard.egolepay.com
              </a>
              <a href="https://status.egolepay.com" target="_blank" rel="noreferrer" className="rounded-xl border border-border px-4 py-3 transition-colors hover:bg-muted/40">
                Status Page: status.egolepay.com
              </a>
            </div>
          </div>
        </section>

        <InfoBox type="info" title="Need more examples?">
          React, Vue, and Angular implementation samples are available under the Framework Guides section in the sidebar.
        </InfoBox>
      </div>
    </DocLayout>
  );
}
