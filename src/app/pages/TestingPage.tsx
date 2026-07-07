import { DocLayout } from '../components/layout/DocLayout';
import { CodeBlock } from '../components/docs/CodeBlock';
import { InfoBox } from '../components/docs/InfoBox';

const testReferences = [
  { reference: 'SCP502026622100159', scenario: 'Successful Bill Validation', result: 'Returns Lagos State Safety Commission bill (Amount: ₦74,550.00)' },
  { reference: 'SCP502026622100222', scenario: 'Expired Reference Validation', result: 'Fires onError callback with "EXPIRED_REFERENCE"' },
  { reference: 'SCP502026622100333', scenario: 'Invalid Reference Validation', result: 'Fires onError callback with "INVALID_REFERENCE"' },
  { reference: 'SCP502026622100444', scenario: 'Card Decline Simulation', result: 'Validation succeeds; any card checkout fails with insufficient funds' },
  { reference: 'SCP502026622100555', scenario: 'Transfer Expiry Simulation', result: 'Validation succeeds; dynamic transfer account expires immediately' }
];

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
          <h1>Testing & Sandbox Guide</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Validate your checkout flow end-to-end with sandbox API keys, mock bill reference numbers, test card PANs, and OTP simulations.
          </p>
        </div>

        <section id="sandbox-key">
          <h2>Test API Key</h2>
          <CodeBlock
            code={`sk_test_VRXD_9fA3KQWm2E8LxR7HcD0PZB6JtN4YV5S1`}
            language="bash"
          />
        </section>

        <section id="test-references">
          <h2>Test Bill Reference Numbers</h2>
          <p className="text-muted-foreground mb-4">
            Pass these mock references to the <code>referenceNumber</code> parameter of the SDK to test different validation outcomes:
          </p>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Reference Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Scenario</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Expected Behavior</th>
                </tr>
              </thead>
              <tbody>
                {testReferences.map((ref) => (
                  <tr key={ref.reference} className="border-t border-border">
                    <td className="px-4 py-3 font-mono text-sm font-semibold">{ref.reference}</td>
                    <td className="px-4 py-3 text-sm font-medium">{ref.scenario}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{ref.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="test-cards">
          <h2>Test Credit Cards</h2>
          <p className="text-muted-foreground mb-4">
            Use these card credentials when simulating the **Card Payment** checkout flow in the sandbox:
          </p>
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
          <h2>Recommended Testing Flow</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="test-validation">1. Validation phase</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Verify that passing an invalid reference triggers the <code>onError</code> callback immediately with the correct message.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="test-card-success">2. Card checkout success</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Simulate a card payment using a successful test card. Confirm that <code>onSuccess</code> returns the correct <code>transactionReference</code>.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="test-transfer-success">3. Bank transfer simulation</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Select **Bank Transfer** in checkout. Click **I Have Paid** to verify how your application handles asynchronous transfer completions.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="test-cancel">4. Cancel and close events</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Test closing the modal before payment completion. Ensure your system catches the <code>onClose</code> and <code>onCancel</code> events without leaving users stranded.
              </p>
            </div>
          </div>
        </section>

        <InfoBox type="info" title="Before production rollout">
          Run through references validation, card payments, bank transfer confirmations, decline handling, and close actions before swapping in your live key.
        </InfoBox>
      </div>
    </DocLayout>
  );
}
