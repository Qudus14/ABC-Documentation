import { DocLayout } from '../components/layout/DocLayout';
import { InfoBox } from '../components/docs/InfoBox';
import { CodeBlock } from '../components/docs/CodeBlock';
import { Link } from 'react-router';

export default function IntroductionPage() {
  return (
    <DocLayout>
      <div className="space-y-10">
        <div className="rounded-[28px] border border-border bg-gradient-to-br from-[#fff9ed] via-background to-[#fff1d6] p-8 shadow-sm dark:from-[#2a2317] dark:via-background dark:to-[#1d160c]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C56A00]">EgolePay JavaScript SDK</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight">Launch EgolePay checkout in three steps.</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            This documentation covers the hosted JavaScript SDK for collecting card payments, handling OTP and 3DS flows, and switching from sandbox to live without changing your integration shape.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link to="/docs/include-sdk" className="rounded-full bg-[#FF8000] px-4 py-2 font-medium text-white transition-colors hover:bg-[#E97500]">
              Start with the SDK
            </Link>
            <Link to="/docs/testing" className="rounded-full border border-border bg-background px-4 py-2 font-medium transition-colors hover:bg-muted/60">
              View test cards
            </Link>
          </div>
        </div>

        <InfoBox type="info" title="What this guide includes">
          Script installation, payment initialization, callback handling, framework examples, sandbox credentials, supported error codes, FAQs, and the current SDK changelog are all available in this documentation set.
        </InfoBox>

        <section id="quick-start">
          <h2>Quick Start</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm font-semibold text-[#C56A00]">Step 1</p>
              <h3 id="include-script" className="mt-2">Include the SDK</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Add the hosted checkout script to the page where you want the payment button to appear.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm font-semibold text-[#C56A00]">Step 2</p>
              <h3 id="initialize-checkout" className="mt-2">Initialize payment</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Pass your API key, amount, email, customer <code>referenceNumber</code>, and any callbacks into <code>new EgolePay()</code>.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm font-semibold text-[#C56A00]">Step 3</p>
              <h3 id="go-live" className="mt-2">Go live</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Switch from an <code>sk_test_</code> key to an <code>sk_live_</code> key when you are ready for production.
              </p>
            </div>
          </div>
        </section>

        <section id="first-integration">
          <h2>First Integration</h2>
          <p className="mb-4 text-muted-foreground">
            The SDK is designed to be drop-in. Load the script once, then trigger checkout directly from the browser.
          </p>
          <CodeBlock
            code={`<script src="https://docs.api.egolepay.com/v1/sdk.js"></script>

<button onclick="startPayment()">Pay Now</button>

<script>
  function startPayment() {
    new EgolePay({
      apiKey: 'sk_test_xxxxxxxxxxxxxxxx',
      referenceNumber: 'EGP77154452626262622',
      amount: 5000,
      email: 'customer@example.com',
      onSuccess: function (response) {
        window.location.href = '/success?ref=' + response.transactionReference;
      },
      onError: function (error) {
        alert(error.message);
      }
    });
  }
</script>`}
            language="html"
          />
        </section>

        <section id="integration-rules">
          <h2>Integration Rules</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="amount-limits">Amount limits</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Minimum amount is N100 and the current maximum is N10,000,000 per transaction.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="fees">Fees</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                EgolePay charges 1% per transaction with a minimum fee of N100 and a maximum fee of N1200.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="otp-3ds">OTP and 3DS</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The SDK automatically handles OTP and 3DS authentication flows. You only need to respond to callbacks.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="supported-devices">Device support</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Checkout is responsive and intended to work across desktop and mobile browsers.
              </p>
            </div>
          </div>
        </section>

        <section id="where-next">
          <h2>Where to Next</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link to="/docs/initialize-payment" className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-[#FF8000]/40 hover:bg-[#FF8000]/[0.03]">
              <h3 id="configuration-guide">Configuration guide</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Review all supported configuration options, including the required customer reference number and other customer fields.
              </p>
            </Link>
            <Link to="/docs/callback-events" className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-[#FF8000]/40 hover:bg-[#FF8000]/[0.03]">
              <h3 id="callbacks-guide">Callbacks guide</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Handle success, failure, cancel, close, and step-change events.
              </p>
            </Link>
            <Link to="/docs/testing" className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-[#FF8000]/40 hover:bg-[#FF8000]/[0.03]">
              <h3 id="sandbox-guide">Sandbox testing</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Use the provided test key, cards, and OTP values before going live.
              </p>
            </Link>
            <Link to="/docs/faq" className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-[#FF8000]/40 hover:bg-[#FF8000]/[0.03]">
              <h3 id="faq-guide">FAQ and support</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Check common integration questions and support channels in one place.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </DocLayout>
  );
}
