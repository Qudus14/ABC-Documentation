import { DocLayout } from '../components/layout/DocLayout';

const releases = [
  {
    version: '1.0.0',
    date: 'March 2024',
    items: [
      'Initial release',
      'Card payments support',
      'Bank transfer support',
      '3DS and OTP handling',
      'Responsive design'
    ]
  },
  {
    version: '1.1.0',
    date: 'Coming Soon',
    items: [
      'Recurring payments',
      'USSD support',
      'QR code payments'
    ]
  }
];

export default function ChangelogPage() {
  return (
    <DocLayout>
      <div className="space-y-8">
        <div>
          <h1>Changelog</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Current release notes captured from the SDK document. Last updated March 2024 in the source material.
          </p>
        </div>

        <section id="releases">
          <h2>Versions</h2>
          <div className="space-y-4">
            {releases.map((release) => (
              <div key={release.version} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <h3 id={`version-${release.version.replace(/\./g, '-')}`}>Version {release.version}</h3>
                  <p className="text-sm text-muted-foreground">{release.date}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {release.items.map((item) => (
                    <span key={item} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DocLayout>
  );
}
