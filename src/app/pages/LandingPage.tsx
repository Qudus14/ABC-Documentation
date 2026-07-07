import { ArrowRight, CheckCircle2, Code2, CreditCard, LayoutTemplate, Shield, TestTube } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';

export default function LandingPage() {
  const features = [
    {
      icon: Shield,
      title: 'Validation-First Flow',
      description: 'The SDK validates reference numbers first, fetching PIDs, revenue details, and amounts automatically.'
    },
    {
      icon: CreditCard,
      title: 'Multi-Channel Checkout',
      description: 'Accept credit card payments (with OTP/3DS verification) or bank transfers to dynamic virtual accounts.'
    },
    {
      icon: Code2,
      title: 'Framework Integration',
      description: 'Reference-centric React, Vue, and Angular components are provided to accelerate your development.'
    },
    {
      icon: LayoutTemplate,
      title: 'Interactive Verification',
      description: 'Payer information validation and custom payment steps are fully integrated into the hosted widget.'
    },
    {
      icon: TestTube,
      title: 'Sandbox Testing',
      description: 'Simulate successful payments, declines, expired references, or pending transfers using mock accounts.'
    },
    {
      icon: CheckCircle2,
      title: 'Simple Go-Live',
      description: 'Onboard and activate production billing by replacing sk_test_ keys with your live merchant credentials.'
    }
  ];

  return (
    <div className="flex-1">
      <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top_left,_rgba(255,210,77,0.35),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(255,128,0,0.18),_transparent_32%),linear-gradient(180deg,_rgba(255,245,224,0.65),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,210,77,0.12),_transparent_25%),radial-gradient(circle_at_top_right,_rgba(255,128,0,0.14),_transparent_30%),linear-gradient(180deg,_rgba(38,28,12,0.65),_transparent_60%)]">
        <div className="relative container mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FF8000]/20 bg-[#FF8000]/10 px-4 py-2 text-sm font-medium text-[#C56A00]">
                <CreditCard className="w-4 h-4" />
                EgolePay PulseBridge SDK
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
                Ship verified bill payments in minutes.
              </h1>

              <p className="max-w-2xl text-lg text-muted-foreground">
                Integrate the hosted PulseBridge InlineJS SDK. Pass a transaction reference, and let the checkout wizard handle validation, information confirmation, and secure payment processing.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-[#FF8000] hover:bg-[#E97500]" asChild>
                  <Link to="/docs/introduction">
                    Open Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                {/* <Button size="lg" variant="outline" asChild>
                  <Link to="/docs/testing">Review Test References</Link>
                </Button> */}
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="rounded-full border border-border bg-background/80 px-3 py-1.5">Card Payments</span>
                <span className="rounded-full border border-border bg-background/80 px-3 py-1.5">Bank Transfers</span>
                <span className="rounded-full border border-border bg-background/80 px-3 py-1.5">Auto Reference Validation</span>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#1f1f1f] bg-[#131313] p-5 text-left text-white shadow-[0_30px_80px_rgba(24,17,6,0.28)]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-medium text-white">SDK Quick Start</p>
                  <p className="text-xs text-white/60">Initialize with your credentials</p>
                </div>
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                  <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                  <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
                </div>
              </div>
              <pre className="mt-4 overflow-x-auto text-sm leading-7 text-[#F4EEE5]">
                <code>{`<script src="https://apigateway-test.egolepay.com/pulsebridge-sdk.js"></script>

function payBill() {
  const payment = new InlineJS({
    merchantId: '22C811B4-EF62-*******************',
    apiKey: 'sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    secretKey: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxx',
    uGuid: '12345',
    txnRef: 'SCP43202660440414',
    type: 'WebGuid',
    amount: 75295.50,
    email: 'customer@example.com',
    onSuccess: (response) => {
      window.location.href =
        '/success?ref=' + response.txnRef;
    },
    onClose: () => {
      console.log('closed');
    },
    onError: (error) => {
      console.error(error);
    }
  });
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Documentation Coverage</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            The PulseBridge SDK documentation covers everything from initialization parameters, visual payment steps, callbacks, framework components, and testing.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="rounded-[24px] border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-[#FF8000]/30 hover:shadow-[0_20px_45px_rgba(255,128,0,0.08)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFD24D] to-[#FF8000]">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container mx-auto max-w-5xl px-4 py-20">
          <div className="rounded-[28px] border border-border bg-gradient-to-r from-[#FFF6E7] via-background to-[#FFF0D4] p-10 text-center dark:from-[#2A2114] dark:via-background dark:to-[#20170B]">
            <h2 className="mb-4 text-3xl font-bold">Ready to wire up checkout?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
              Explore the step-by-step verification flows, review integration callbacks, and test using sandbox reference numbers.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-[#FF8000] hover:bg-[#E97500]" asChild>
                <Link to="/docs/include-sdk">
                  Include the SDK
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:api-support@egolepay.com">Contact Support</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
