import { DocLayout } from '../components/layout/DocLayout';
import { InfoBox } from '../components/docs/InfoBox';

const errorCodes = [
  ['INSUFFICIENT_FUNDS', 'Card has insufficient funds'],
  ['INVALID_PIN', 'Incorrect PIN entered'],
  ['EXPIRED_CARD', 'Card has expired'],
  ['DO_NOT_HONOR', 'Bank declined transaction'],
  ['INVALID_CARD', 'Card number is invalid'],
  ['3DS_FAILED', '3DS authentication failed'],
  ['OTP_FAILED', 'OTP verification failed'],
  ['NETWORK_ERROR', 'Network connection issue']
];

export default function ErrorCodesPage() {
  return (
    <DocLayout>
      <div className="space-y-8">
        <div>
          <h1>Error Codes</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Use these codes and messages to classify decline states and customer support responses in your checkout flow.
          </p>
        </div>

        <section id="error-table">
          <h2>Reference</h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Code</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {errorCodes.map(([code, description]) => (
                  <tr key={code} className="border-t border-border">
                    <td className="px-4 py-3 font-mono text-sm">{code}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <InfoBox type="warning" title="Implementation note">
          Treat the code list as a customer experience guide as well as a logging surface. Show a clear message, keep the cart or payment context intact, and allow the customer to retry where appropriate.
        </InfoBox>
      </div>
    </DocLayout>
  );
}
