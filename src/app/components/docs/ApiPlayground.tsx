import { useState } from 'react';
import { Play, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Parameter } from '../../data/apiEndpoints';
import { CodeBlock } from './CodeBlock';

interface ApiPlaygroundProps {
  method: string;
  route: string;
  parameters?: Parameter[];
}

export function ApiPlayground({ method, route, parameters }: ApiPlaygroundProps) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const handleTryApi = () => {
    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setResponse(JSON.stringify({
        status: 'success',
        message: 'This is a mock response from the playground',
        note: 'Replace YOUR_API_KEY with your actual API key to make real requests',
        data: {
          ...inputs
        }
      }, null, 2));
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <div className="bg-muted/50 px-4 py-3 border-b border-border">
        <h3 className="text-sm font-medium">API Playground</h3>
      </div>
      
      <div className="p-4 space-y-4">
        {/* API Key Input */}
        <div>
          <label className="text-sm font-medium mb-2 block">API Key</label>
          <Input 
            type="password" 
            placeholder="sk_test_..." 
            className="font-mono text-sm"
          />
        </div>

        {/* Dynamic Parameter Inputs */}
        {parameters?.map((param) => (
          <div key={param.name}>
            <label className="text-sm font-medium mb-2 block">
              {param.name}
              {param.required && <span className="text-orange-500 ml-1">*</span>}
            </label>
            <Input
              placeholder={param.description}
              value={inputs[param.name] || ''}
              onChange={(e) => setInputs({ ...inputs, [param.name]: e.target.value })}
              className="font-mono text-sm"
            />
          </div>
        ))}

        <Button 
          onClick={handleTryApi} 
          disabled={loading}
          className="w-full bg-[#FF8000] hover:bg-[#FF8000]/90"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Try API
            </>
          )}
        </Button>

        {response && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Response</h4>
            <CodeBlock code={response} language="json" />
          </div>
        )}
      </div>
    </div>
  );
}
