import { useParams, Navigate } from 'react-router';
import { getEndpointById } from '../data/apiEndpoints';
import { DocLayout } from '../components/layout/DocLayout';
import { EndpointHeader } from '../components/docs/EndpointHeader';
import { ParameterTable } from '../components/docs/ParameterTable';
import { CodeExamples } from '../components/docs/CodeExamples';
import { ResponseCard } from '../components/docs/ResponseCard';
import { ApiPlayground } from '../components/docs/ApiPlayground';
import { InfoBox } from '../components/docs/InfoBox';

export default function EndpointPage() {
  const { endpointId } = useParams();
  const endpoint = endpointId ? getEndpointById(endpointId) : undefined;

  if (!endpoint) {
    return <Navigate to="/404" replace />;
  }

  return (
    <DocLayout>
      <div className="space-y-12">
        {/* Page Header */}
        <EndpointHeader
          method={endpoint.method}
          route={endpoint.route}
          title={endpoint.title}
          description={endpoint.description}
        />

        {/* Deprecation Warning */}
        {endpoint.deprecated && (
          <InfoBox type="warning" title="Deprecated">
            This endpoint has been deprecated and will be removed in a future version.
            Please migrate to the recommended alternative.
          </InfoBox>
        )}

        {/* Authentication Note */}
        {endpoint.authenticationRequired && (
          <InfoBox type="info">
            This endpoint requires authentication. Include your API key in the Authorization header.
          </InfoBox>
        )}

        {/* Request Headers */}
        {endpoint.requestHeaders && endpoint.requestHeaders.length > 0 && (
          <section id="request-headers">
            <h2>Request Headers</h2>
            <ParameterTable parameters={endpoint.requestHeaders} />
          </section>
        )}

        {/* Request Parameters */}
        {endpoint.requestParameters && endpoint.requestParameters.length > 0 && (
          <section id="request-parameters">
            <h2>Request Parameters</h2>
            <ParameterTable parameters={endpoint.requestParameters} />
          </section>
        )}

        {/* Request Body Example */}
        {endpoint.sampleRequest && (
          <section id="request-body">
            <h2>Request Body</h2>
            <ResponseCard title="Example Request" response={endpoint.sampleRequest} />
          </section>
        )}

        {/* Code Examples */}
        <section id="code-examples">
          <h2>Code Examples</h2>
          <CodeExamples examples={endpoint.codeExamples} />
        </section>

        {/* Response Example */}
        <section id="response">
          <h2>Response</h2>
          <ResponseCard title="Success Response (200)" response={endpoint.sampleResponse} />
        </section>

        {/* Error Responses */}
        {endpoint.errorResponses && endpoint.errorResponses.length > 0 && (
          <section id="error-responses">
            <h2>Error Responses</h2>
            <div className="space-y-4">
              {endpoint.errorResponses.map((error, index) => (
                <div key={index} className="p-4 rounded-xl border border-border bg-card">
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 rounded bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-mono">
                      {error.code}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-medium">{error.message}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{error.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* API Playground */}
        {endpoint.playgroundEnabled && (
          <section id="try-it">
            <h2>Try It Out</h2>
            <ApiPlayground
              method={endpoint.method}
              route={endpoint.route}
              parameters={endpoint.requestParameters}
            />
          </section>
        )}
      </div>
    </DocLayout>
  );
}
