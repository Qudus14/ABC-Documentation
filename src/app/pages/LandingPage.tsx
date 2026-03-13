import { ArrowRight, Shield, Zap, Webhook, Code, Smartphone, TestTube } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';

export default function LandingPage() {
  const features = [
    {
      icon: Shield,
      title: 'Secure Infrastructure',
      description: 'Bank-grade security with end-to-end encryption for all transactions'
    },
    {
      icon: Zap,
      title: 'Real-time Transactions',
      description: 'Instant payment processing and immediate transaction confirmations'
    },
    {
      icon: Webhook,
      title: 'Webhook Support',
      description: 'Real-time notifications for all transaction events in your application'
    },
    {
      icon: Code,
      title: 'Easy Integration',
      description: 'Simple REST API with comprehensive documentation and code examples'
    },
    {
      icon: Smartphone,
      title: 'Flutter SDK',
      description: 'Native mobile SDK for seamless Flutter app integration'
    },
    {
      icon: TestTube,
      title: 'Sandbox Environment',
      description: 'Test your integration safely before going live with production keys'
    }
  ];

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD24D]/10 via-[#FF8000]/5 to-[#FEAC01]/10" />
        <div className="relative container max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF8000]/10 text-[#FF8000] text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Payment Made Easy
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#FFD24D] via-[#FF8000] to-[#FEAC01] bg-clip-text text-transparent">
              Build Seamless Payments with Egolapay APIs
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Reliable, scalable APIs for payments, transfers, bill payments, and AutoReg services. 
              Start integrating in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="bg-[#FF8000] hover:bg-[#FF8000]/90" asChild>
                <Link to="/docs/introduction">
                  View Documentation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/docs/api-keys">
                  Get API Keys
                </Link>
              </Button>
            </div>

            {/* Code Preview */}
            <div className="mt-12 rounded-xl overflow-hidden border border-border shadow-2xl">
              <div className="bg-[#1e1e1e] p-6 text-left">
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                  <code>{`curl -X POST https://api.egolapay.com/api/v1/transactions/initialize \\
  -H "Authorization: Bearer YOUR_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "customer@example.com",
    "amount": 50000
  }'`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Egolapay?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build world-class payment experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all hover:scale-105"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFD24D] to-[#FF8000] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border">
        <div className="container max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using Egolapay to power their payments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#FF8000] hover:bg-[#FF8000]/90" asChild>
              <Link to="/docs/introduction">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="mailto:support@egolapay.com">
                Contact Sales
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
