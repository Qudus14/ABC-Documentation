import { DocLayout } from '../components/layout/DocLayout';
import { CodeBlock } from '../components/docs/CodeBlock';
import { InfoBox } from '../components/docs/InfoBox';

const testCards = [
  { scenario: 'Success (Verve)', card: '5061 0000 0000 1234', pin: '1234', result: 'Payment successful' },
  { scenario: 'Success (Mastercard)', card: '5399 8383 8383 8383', pin: '1234', result: 'Payment successful' },
  { scenario: 'Success (Visa)', card: '4189 3427 1899 6504', pin: '1234', result: 'Payment successful' },
  { scenario: '3DS Required', card: '4189 3427 1899 6504', pin: '1234', result: 'OTP popup appears' },
  { scenario: 'Insufficient Funds', card: '5061 0000 0000 5678', pin: '1234', result: 'Declined' },
  { scenario: 'Invalid PIN', card: '5399 8383 8383 8384', pin: '1111', result: 'Declined' },
  { scenario: 'Expired Card', card: '4189 3427 1899 6505', pin: '1234', result: 'Declined' },
  { scenario: 'Do Not Honor', card: '5061 0000 0000 9999', pin: '1234', result: 'Declined' }
];

export default function TestingPage() {
  return (
    <DocLayout>
      <div className="space-y-8">
        <div>
          <h1>Testing</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Validate your checkout flow end to end with the sandbox key, test cards, and OTP combinations documented for the SDK.
          </p>
        </div>

        <section id="sandbox-key">
          <h2>Test API Key</h2>
          <CodeBlock
            code={`sk_test_VRXD_9fA3KQWm2E8LxR7HcD0PZB6JtN4YV5S1`}
            language="bash"
          />
        </section>

        <section id="test-cards">
          <h2>Test Cards</h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Scenario</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Card Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">PIN</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Expected Result</th>
                </tr>
              </thead>
              <tbody>
                {testCards.map((card) => (
                  <tr key={card.scenario} className="border-t border-border">
                    <td className="px-4 py-3 text-sm font-medium">{card.scenario}</td>
                    <td className="px-4 py-3 font-mono text-sm">{card.card}</td>
                    <td className="px-4 py-3 font-mono text-sm">{card.pin}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{card.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="otp-values">
          <h2>Test OTP</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="otp-success">123456</h3>
              <p className="mt-2 text-sm text-muted-foreground">Successful OTP confirmation.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="otp-failure">000000</h3>
              <p className="mt-2 text-sm text-muted-foreground">Failed OTP confirmation.</p>
            </div>
          </div>
        </section>

        <section id="testing-checklist">
          <h2>Recommended Test Flow</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="test-successful-payment">Successful payment</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Confirm that your app receives <code>transactionReference</code> and redirects or updates state as expected.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="test-error-state">Decline handling</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Check that customer-facing messaging uses <code>error.message</code> and does not leave the UI hanging.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="test-close-state">Close and cancel</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Verify that modal close and cancel actions return the user to a stable state without duplicate charge attempts.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="test-analytics">Step analytics</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Use <code>onStepChange</code> to observe where customers drop off or request support during checkout.
              </p>
            </div>
          </div>
        </section>

        <InfoBox type="info" title="Before production">
          Run through the success, OTP, invalid PIN, insufficient funds, expired card, and modal-close scenarios before swapping in your live key.
        </InfoBox>
      </div>
    </DocLayout>
  );
}
