import { DocLayout } from '../components/layout/DocLayout';

const faqs = [
  {
    id: 'switch-live',
    question: 'How do I switch from test to live?',
    answer: 'Replace your sk_test_ key with an sk_live_ key. The SDK switches environments automatically.'
  },
  {
    id: 'minimum-amount',
    question: "What's the minimum amount?",
    answer: 'N100.'
  },
  {
    id: 'maximum-amount',
    question: "What's the maximum amount?",
    answer: 'N10,000,000 per transaction.'
  },
  {
    id: 'otp-3ds',
    question: 'Does the SDK handle 3DS and OTP?',
    answer: 'Yes. The SDK handles those flows automatically and returns control through callbacks.'
  },
  {
    id: 'save-cards',
    question: 'Can I save cards for recurring payments?',
    answer: 'Yes. The document states that the SDK handles this automatically and returns a token in the success response.'
  },
  {
    id: 'fees',
    question: 'How are fees calculated?',
    answer: '1% of the transaction amount, with a minimum fee of N100 and a maximum fee of N1200.'
  },
  {
    id: 'get-keys',
    question: 'How do I get my API keys?',
    answer: 'Log in to the dashboard, open Settings, then API Keys.'
  },
  {
    id: 'close-modal',
    question: 'What happens if the user closes the modal?',
    answer: 'The onClose callback fires with a reason, such as USER_CLOSED or PAYMENT_SUCCESSFUL.'
  },
  {
    id: 'customize-modal',
    question: 'Can I customize the payment modal?',
    answer: 'Yes. The document notes that a custom logo URL can be supplied to brand the modal.'
  },
  {
    id: 'mobile-support',
    question: 'Does it work on mobile?',
    answer: 'Yes. The checkout flow is designed to be responsive across devices.'
  }
];

export default function FaqPage() {
  return (
    <DocLayout>
      <div className="space-y-8">
        <div>
          <h1>Frequently Asked Questions</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Common answers pulled from the current EgolePay JavaScript SDK guide.
          </p>
        </div>

        <section id="faq-list">
          <h2>Questions</h2>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="rounded-2xl border border-border bg-card p-6">
                <h3 id={faq.id}>{faq.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DocLayout>
  );
}
