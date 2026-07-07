import { useState } from 'react';
import { DocLayout } from '../components/layout/DocLayout';
import { InfoBox } from '../components/docs/InfoBox';
import { CodeBlock } from '../components/docs/CodeBlock';
import { Link } from 'react-router';
import { Check, CreditCard, Landmark, Search, ShieldCheck } from 'lucide-react';

export default function IntroductionPage() {
  const [activeStep, setActiveStep] = useState(0);

  const checkoutSteps = [
    {
      title: '1. Reference Validation',
      icon: Search,
      image: '/sdk_flow_step1.png',
      description: 'Once initialized, the SDK automatically queries the EgolePay gateway with the transaction reference (txnRef) and amount. If valid, it retrieves and displays the bill information:',
      details: [
        'PID: Unique payment ID associated with the customer.',
        'Revenue: The description of the bill (e.g. Safety Certification).',
        'Agency: The billing organization (e.g. Lagos State Safety Commission).',
        'Amount Due: The outstanding balance for the reference.',
        'Service Fee: Computed dynamically based on the amount (1%, min ₦100, max ₦1200).'
      ]
    },
    {
      title: '2. Confirm Information',
      icon: ShieldCheck,
      image: '/sdk_flow_step2.png',
      description: 'The payer moves to the confirmation screen where details are locked and the customer validates their name:',
      details: [
        'Payer Name: Automatically fetched or inputted by the user.',
        'Lock Step: Validates correct revenue description and total fees before redirecting to actual financial processors.',
        'Orange Action Button: Smooth confirmation action to slide into payment options.'
      ]
    },
    {
      title: '3. Card Payment',
      icon: CreditCard,
      image: '/sdk_flow_step3_card.png',
      description: 'One of two secure payment channels. Payer inputs their card number, expiry, CVV, and PIN:',
      details: [
        'Automatic OTP/3DS: The SDK manages the 3DS verification and OTP inputs within the secure frame.',
        'Secure Encryption: Data is encrypted directly at the checkout widget, keeping merchant scope out of PCI compliance requirements.',
        'Brand Logos: Trust marks (Visa, Mastercard, Verve) displayed in checkout context.'
      ]
    },
    {
      title: '4. Bank Transfer',
      icon: Landmark,
      image: '/sdk_flow_step3_transfer.png',
      description: 'The second payment channel. The SDK generates a dynamic virtual account number:',
      details: [
        'Sterling Bank Virtual Account: Unique account generated per payment session.',
        '30-Minute Expiry: Account automatically expires in 30 minutes to manage stock/bill state.',
        'Copy Action: Direct button to copy the 10-digit account number.',
        'I Have Paid Trigger: The payer clicks to prompt verification, triggering the onSuccess callback instantly upon confirmation.'
      ]
    }
  ];

  return (
    <DocLayout>
      <div className="space-y-10">
        <div className="rounded-[28px] border border-border bg-gradient-to-br from-[#fff9ed] via-background to-[#fff1d6] p-8 shadow-sm dark:from-[#2a2317] dark:via-background dark:to-[#1d160c]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C56A00]">EgolePay PulseBridge SDK</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight">Launch checkout in three steps.</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            This documentation covers the hosted PulseBridge InlineJS SDK. Initialize checkout with credentials, transaction reference, amount, and customer email to process payments via Card or Bank Transfer.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link to="/docs/include-sdk" className="rounded-full bg-[#FF8000] px-4 py-2 font-medium text-white transition-colors hover:bg-[#E97500]">
              Start with the SDK
            </Link>
            {/* <Link to="/docs/testing" className="rounded-full border border-border bg-background px-4 py-2 font-medium transition-colors hover:bg-muted/60">
              View test references
            </Link> */}
          </div>
        </div>

        <InfoBox type="info" title="What this guide includes">
          Script installation, credential-based initialization, callback handling, framework examples, sandbox references, supported error codes, FAQs, and the current SDK changelog.
        </InfoBox>

        <section id="visual-flow" className="space-y-6">
          <h2>Visual Checkout Journey</h2>
          <p className="text-muted-foreground">
            Click through the interactive steps below to explore how the InlineJS SDK guides payers from reference validation to final payment:
          </p>

          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            {/* Step Selector Tab Bar */}
            <div className="flex border-b border-border bg-muted/30 overflow-x-auto scrollbar-none">
              {checkoutSteps.map((step, idx) => {
                const StepIcon = step.icon;
                const isActive = activeStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 py-4 px-3 text-sm font-medium border-b-2 transition-all ${isActive
                        ? 'border-[#FF8000] text-[#FF8000] bg-background/50'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                  >
                    <StepIcon className="w-4 h-4" />
                    {step.title}
                  </button>
                );
              })}
            </div>

            {/* Tab Body */}
            <div className="p-6 md:p-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
              {/* Image side with border/shadow */}
              <div className="relative group rounded-xl overflow-hidden border border-border bg-muted/10 p-4 flex items-center justify-center max-h-[480px]">
                <img
                  src={checkoutSteps[activeStep].image}
                  alt={checkoutSteps[activeStep].title}
                  className="max-h-[420px] w-auto object-contain rounded-lg shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>

              {/* Description side */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    {checkoutSteps[activeStep].title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {checkoutSteps[activeStep].description}
                  </p>
                </div>

                <ul className="space-y-3">
                  {checkoutSteps[activeStep].details.map((detail, dIdx) => {
                    const [boldText, ...rest] = detail.split(':');
                    const normalText = rest.join(':');
                    return (
                      <li key={dIdx} className="flex items-start gap-2.5 text-sm">
                        <Check className="w-4 h-4 text-[#FF8000] mt-0.5 shrink-0" />
                        <span className="leading-relaxed">
                          <strong className="text-foreground">{boldText}:</strong>
                          <span className="text-muted-foreground">{normalText}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

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
                Pass credentials, transaction reference number (e.g. <code>SCP43202660440414</code>), amount, and customer email to <code>new InlineJS()</code>.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm font-semibold text-[#C56A00]">Step 3</p>
              <h3 id="go-live" className="mt-2">Go live</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Switch from test keys to production keys when you are ready to process live traffic.
              </p>
            </div>
          </div>
        </section>

        <section id="first-integration">
          <h2>First Integration</h2>
          <p className="mb-4 text-muted-foreground">
            Load the Hosted script once, then instantiate the checkout wizard dynamically from the browser.
          </p>
          <CodeBlock
            code={`<script src="https://apigateway-test.egolepay.com/pulsebridge-sdk.js"></script>

<button onclick="startPayment()">Pay Bill</button>

<script>
  let paymentSuccessfullyCompleted = false;

  function startPayment() {
    const payment = new InlineJS({
      // 🔐 REQUIRED: Your credentials from EgolePay dashboard
      merchantId: '22C811B4-EF62-*******************',
      apiKey: 'sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      secretKey: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxx',
      uGuid: '12345',       // Egole Wallet ID
      type: 'WebGuid',      // Integration type
      
      // 💰 Transaction Details
      txnRef: 'SCP43202660440414',  // Unique transaction reference
      amount: 75295.50,            // Amount in NGN
      email: 'customer@example.com', // Customer email
      
      // 📝 Optional
      currency: 'NGN',
      description: 'LIRS Safety Certification Payment',

      /* ✅ CALLBACKS */
      onSuccess: function (response) {
        console.log('onSuccess', response);
        paymentSuccessfullyCompleted = true;
      },
      onClose: function (info) {
        console.log("onClose");
      },
      onError: function (error) {
        console.log('Error', error);
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
              <h3 id="reference-validation">Reference validation</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Every transaction reference number (txnRef) is validated on EgolePay servers prior to checkout. If invalid or expired, an error callback is fired.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="fees">Dynamic Fees</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A 1% service fee is automatically calculated on the validated amount, with a minimum of N100 and capped at a maximum of N1200.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="otp-3ds">OTP & Bank Transfers</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The SDK handles both secure 3DS card inputs and Sterling Bank virtual account transfer confirmations automatically.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 id="supported-devices">Device support</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Checkout is fully responsive, looking premium on both desktop interfaces and mobile browsers.
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
                Review all supported configuration options, including credentials and callbacks.
              </p>
            </Link>
            <Link to="/docs/callback-events" className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-[#FF8000]/40 hover:bg-[#FF8000]/[0.03]">
              <h3 id="callbacks-guide">Callbacks guide</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                React to successful payments (Card or Transfer confirmation), cancel steps, or checkout closings.
              </p>
            </Link>
            {/* <Link to="/docs/testing" className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-[#FF8000]/40 hover:bg-[#FF8000]/[0.03]">
              <h3 id="sandbox-guide">Sandbox testing</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Use mock references and mock cards/PINs to simulate various checkout states.
              </p>
            </Link> */}
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