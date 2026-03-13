export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'SDK' | 'GUIDE' | 'EVENT';

export interface CodeSnippet {
  id: string;
  label: string;
  language: string;
  code: string;
}

export interface CodeExample {
  curl?: string;
  javascript?: string;
  flutter?: string;
  python?: string;
  php?: string;
  snippets?: CodeSnippet[];
}

export interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ErrorResponse {
  code: string;
  message: string;
  description: string;
}

export interface ApiEndpoint {
  id: string;
  category: string;
  title: string;
  description: string;
  method: ApiMethod;
  route: string;
  copyValue?: string;
  authenticationRequired: boolean;
  requestHeaders?: Parameter[];
  requestHeadersTitle?: string;
  requestParameters?: Parameter[];
  requestParametersTitle?: string;
  sampleRequest?: string;
  sampleRequestTitle?: string;
  sampleRequestLanguage?: string;
  sampleResponse?: string;
  sampleResponseTitle?: string;
  sampleResponseLanguage?: string;
  errorResponses?: ErrorResponse[];
  errorResponsesTitle?: string;
  codeExamples: CodeExample;
  codeExamplesTitle?: string;
  version: string;
  deprecated?: boolean;
  playgroundEnabled?: boolean;
}

export const apiEndpoints: ApiEndpoint[] = [
  {
    id: 'include-sdk',
    category: 'SDK Basics',
    title: 'Include SDK',
    description: 'Load the hosted EgolePay checkout script on any page where you want to open the payment modal.',
    method: 'SDK',
    route: '<script src="https://api.egolepay.com/v1/sdk.js"></script>',
    copyValue: '<script src="https://api.egolepay.com/v1/sdk.js"></script>',
    authenticationRequired: false,
    requestHeadersTitle: 'SDK Details',
    requestHeaders: [
      {
        name: 'Script URL',
        type: 'string',
        required: true,
        description: 'Hosted JavaScript bundle that exposes the EgolePay checkout constructor.'
      },
      {
        name: 'Global object',
        type: 'window.EgolePay',
        required: true,
        description: 'Constructor available after the script loads and ready to be used in browser code.'
      }
    ],
    sampleRequestTitle: 'Embed Example',
    sampleRequestLanguage: 'html',
    sampleRequest: `<script src="https://api.egolepay.com/v1/sdk.js"></script>

<button onclick="startPayment()">Pay Now</button>

<script>
  function startPayment() {
    new EgolePay({
      apiKey: 'sk_test_xxxxxxxxxxxxxxxx',
      referenceNumber: 'EGP77154452626262622',
      amount: 5000,
      email: 'customer@example.com'
    });
  }
</script>`,
    codeExamplesTitle: 'Loading Patterns',
    codeExamples: {
      snippets: [
        {
          id: 'standard-html',
          label: 'HTML Page',
          language: 'html',
          code: `<script src="https://api.egolepay.com/v1/sdk.js"></script>

<button onclick="startPayment()">Pay Now</button>

<script>
  function startPayment() {
    new EgolePay({
      apiKey: 'sk_test_xxxxxxxxxxxxxxxx',
      referenceNumber: 'EGP77154452626262622',
      amount: 5000,
      email: 'customer@example.com'
    });
  }
</script>`
        },
        {
          id: 'deferred-script',
          label: 'Deferred Load',
          language: 'html',
          code: `<script defer src="https://api.egolepay.com/v1/sdk.js"></script>

<button id="pay-button">Pay Now</button>

<script>
  window.addEventListener('load', function () {
    document.getElementById('pay-button').addEventListener('click', function () {
      new EgolePay({
        apiKey: 'sk_test_xxxxxxxxxxxxxxxx',
        referenceNumber: 'EGP77154452626262622',
        amount: 5000,
        email: 'customer@example.com'
      });
    });
  });
</script>`
        }
      ]
    },
    version: 'v1.0.0'
  },
  {
    id: 'initialize-payment',
    category: 'SDK Basics',
    title: 'Initialize Payment',
    description: 'Create a checkout session by passing your API key, customer reference number, transaction details, and lifecycle callbacks into the EgolePay constructor.',
    method: 'SDK',
    route: 'new EgolePay(config)',
    copyValue: `new EgolePay({
  apiKey: 'sk_test_xxxxxxxxxxxxxxxx',
  referenceNumber: 'EGP77154452626262622',
  amount: 5000,
  email: 'customer@example.com'
})`,
    authenticationRequired: false,
    requestParametersTitle: 'Configuration Options',
    requestParameters: [
      { name: 'apiKey', type: 'string', required: true, description: 'Your EgolePay API key. Use sk_test_ in sandbox and sk_live_ in production.' },
      { name: 'referenceNumber', type: 'string', required: true, description: 'Required customer reference number passed with each payment initialization for reconciliation and tracking.' },
      { name: 'amount', type: 'number', required: true, description: 'Amount in NGN. Minimum amount is N100.' },
      { name: 'email', type: 'string', required: true, description: 'Customer email used for payment confirmation and transaction tracking.' },
      { name: 'customerName', type: 'string', required: false, description: 'Customer full name shown during checkout and available in your records.' },
      { name: 'phone', type: 'string', required: false, description: 'Customer phone number in local or international format.' }
    ],
    sampleRequestTitle: 'Default Checkout Example',
    sampleRequestLanguage: 'javascript',
    sampleRequest: `function startPayment() {
  new EgolePay({
    apiKey: 'sk_test_xxxxxxxxxxxxxxxx',
    referenceNumber: 'EGP77154452626262622',
    amount: 5000,
    email: 'customer@example.com',
    onSuccess: function (response) {
      console.log('Payment successful!', response);
      window.location.href = '/success?ref=' + response.transactionReference;
    },
    onError: function (error) {
      console.error('Payment failed:', error);
      alert(error.message);
    },
    onCancel: function () {
      console.log('User cancelled payment');
    }
  });
}`,
    sampleResponseTitle: 'Success Payload',
    sampleResponseLanguage: 'json',
    sampleResponse: `{
  "status": "success",
  "amount": 5000,
  "transactionReference": "TXN_123456",
  "paymentReference": "PAY_123456"
}`,
    codeExamplesTitle: 'Integration Examples',
    codeExamples: {
      snippets: [
        {
          id: 'basic-button',
          label: 'Basic Button',
          language: 'javascript',
          code: `function pay() {
  new EgolePay({
    apiKey: 'sk_test_xxxxxxxxxx',
    referenceNumber: 'EGP77154452626262622',
    amount: 5000,
    email: 'customer@example.com',
    onSuccess: (res) => window.location.href = '/success',
    onError: (err) => alert(err.message)
  });
}`
        },
        {
          id: 'customer-details',
          label: 'Customer Details',
          language: 'javascript',
          code: `new EgolePay({
  apiKey: 'sk_test_xxxxxxxxxx',
  referenceNumber: 'EGP77154452626262622',
  amount: 10000,
  email: 'john@example.com',
  customerName: 'John Doe',
  phone: '+2348012345678',
  onSuccess: function (res) {
    updateOrderStatus(res.transactionReference);
    window.location.href = '/thank-you';
  },
  onError: function (err) {
    showErrorToUser(err.message);
  }
});`
        }
      ]
    },
    errorResponsesTitle: 'Common Failure States',
    errorResponses: [
      { code: 'INSUFFICIENT_FUNDS', message: 'Declined', description: 'Customer card does not have enough balance to complete the charge.' },
      { code: 'INVALID_PIN', message: 'Declined', description: 'Incorrect PIN was submitted during card authentication.' },
      { code: 'NETWORK_ERROR', message: 'Retry', description: 'The customer or merchant device lost connectivity during checkout.' }
    ],
    version: 'v1.0.0'
  },
  {
    id: 'callback-events',
    category: 'SDK Basics',
    title: 'Callback Events',
    description: 'Use EgolePay callbacks to react to successful payments, failures, modal closes, and user journey changes.',
    method: 'EVENT',
    route: 'onSuccess | onError | onCancel | onClose | onStepChange',
    copyValue: `{
  onSuccess(response) {},
  onError(error) {},
  onCancel() {},
  onClose(info) {},
  onStepChange(step) {}
}`,
    authenticationRequired: false,
    requestParametersTitle: 'Available Callbacks',
    requestParameters: [
      { name: 'onSuccess(response)', type: 'function', required: false, description: 'Runs after a successful payment. The response contains status, amount, transactionReference, and paymentReference.' },
      { name: 'onError(error)', type: 'function', required: false, description: 'Runs when a payment attempt fails and returns a message like Insufficient funds or Invalid PIN.' },
      { name: 'onCancel()', type: 'function', required: false, description: 'Runs when the user cancels the payment flow before completion.' },
      { name: 'onClose(info)', type: 'function', required: false, description: 'Runs when the modal closes and includes a reason such as USER_CLOSED or PAYMENT_SUCCESSFUL.' },
      { name: 'onStepChange(step)', type: 'function', required: false, description: 'Runs whenever the customer moves between checkout steps. Useful for analytics and support diagnostics.' }
    ],
    sampleRequestTitle: 'Callback Configuration',
    sampleRequestLanguage: 'javascript',
    sampleRequest: `new EgolePay({
  apiKey: 'sk_test_xxxxxxxxxx',
  referenceNumber: 'EGP77154452626262622',
  amount: 5000,
  email: 'customer@example.com',
  onSuccess: function (response) {
    console.log(response);
  },
  onError: function (error) {
    console.log(error.message);
  },
  onCancel: function () {
    console.log('Payment cancelled');
  },
  onClose: function (info) {
    console.log(info.reason);
  },
  onStepChange: function (step) {
    console.log(step.currentStep);
  }
});`,
    sampleResponseTitle: 'Example Success Response',
    sampleResponseLanguage: 'json',
    sampleResponse: `{
  "status": "success",
  "amount": 5000,
  "transactionReference": "TXN_123456",
  "paymentReference": "PAY_123456"
}`,
    codeExamplesTitle: 'Callback Handlers',
    codeExamples: {
      snippets: [
        {
          id: 'success-handler',
          label: 'onSuccess',
          language: 'javascript',
          code: `onSuccess: function (response) {
  console.log(response);
  // {
  //   "status": "success",
  //   "amount": 5000,
  //   "transactionReference": "TXN_123456",
  //   "paymentReference": "PAY_123456"
  // }
}`
        },
        {
          id: 'error-handler',
          label: 'onError',
          language: 'javascript',
          code: `onError: function (error) {
  console.log(error.message);
  // "Insufficient funds" or "Invalid PIN"
}`
        },
        {
          id: 'close-handler',
          label: 'onClose',
          language: 'javascript',
          code: `onClose: function (info) {
  console.log(info.reason);
  // "USER_CLOSED" or "PAYMENT_SUCCESSFUL"
}`
        },
        {
          id: 'step-handler',
          label: 'onStepChange',
          language: 'javascript',
          code: `onStepChange: function (step) {
  console.log(step.currentStep);
  // "payment_options", "card_payment", and other checkout steps
}`
        }
      ]
    },
    version: 'v1.0.0'
  },
  {
    id: 'react-component',
    category: 'Framework Guides',
    title: 'React Component',
    description: 'Wrap EgolePay checkout in a reusable React button that receives amount, email, referenceNumber, and success handlers through props.',
    method: 'GUIDE',
    route: 'function PaymentButton({ amount, email, referenceNumber, onSuccess })',
    copyValue: 'function PaymentButton({ amount, email, referenceNumber, onSuccess })',
    authenticationRequired: false,
    requestParametersTitle: 'Component Props',
    requestParameters: [
      { name: 'amount', type: 'number', required: true, description: 'Amount passed into the component and used for checkout.' },
      { name: 'email', type: 'string', required: true, description: 'Customer email used in the EgolePay config.' },
      { name: 'referenceNumber', type: 'string', required: true, description: 'Customer reference number forwarded into the EgolePay config.' },
      { name: 'onSuccess', type: '(response) => void', required: true, description: 'Handler that receives the EgolePay success payload.' }
    ],
    sampleRequestTitle: 'React Example',
    sampleRequestLanguage: 'jsx',
    sampleRequest: `import React from 'react';

function PaymentButton({ amount, email, referenceNumber, onSuccess }) {
  const handlePayment = () => {
    new window.EgolePay({
      apiKey: process.env.REACT_APP_EGOLEPAY_KEY,
      referenceNumber,
      amount,
      email,
      onSuccess
    });
  };

  return (
    <button onClick={handlePayment}>
      Pay N{amount}
    </button>
  );
}`,
    sampleResponseTitle: 'Success Payload',
    sampleResponseLanguage: 'json',
    sampleResponse: `{
  "status": "success",
  "amount": 5000,
  "transactionReference": "TXN_123456",
  "paymentReference": "PAY_123456"
}`,
    codeExamplesTitle: 'Usage',
    codeExamples: {
      snippets: [
        {
          id: 'react-usage',
          label: 'Parent Screen',
          language: 'jsx',
          code: `export function CheckoutPage() {
  return (
    <PaymentButton
      amount={5000}
      email="customer@example.com"
      referenceNumber="EGP77154452626262622"
      onSuccess={(response) => {
        window.location.href = '/success?ref=' + response.transactionReference;
      }}
    />
  );
}`
        }
      ]
    },
    version: 'v1.0.0'
  },
  {
    id: 'vue-component',
    category: 'Framework Guides',
    title: 'Vue Component',
    description: 'Use a Vue component to manage loading state while forwarding success and error events to parent components.',
    method: 'GUIDE',
    route: 'methods.handlePayment()',
    copyValue: 'methods.handlePayment()',
    authenticationRequired: false,
    requestParametersTitle: 'Component Inputs',
    requestParameters: [
      { name: 'amount', type: 'Number', required: true, description: 'Checkout amount rendered in the button and sent to EgolePay.' },
      { name: 'email', type: 'String', required: true, description: 'Customer email passed into the SDK config.' },
      { name: 'referenceNumber', type: 'String', required: true, description: 'Customer reference number passed into the SDK config.' },
      { name: 'loading', type: 'Boolean', required: false, description: 'Component state that disables the button while checkout is in progress.' }
    ],
    sampleRequestTitle: 'Vue Example',
    sampleRequestLanguage: 'html',
    sampleRequest: `<template>
  <button @click="handlePayment" :disabled="loading">
    {{ loading ? 'Processing...' : \`Pay N\${amount}\` }}
  </button>
</template>

<script>
export default {
  props: ['amount', 'email', 'referenceNumber'],
  data() {
    return {
      loading: false
    };
  },
  methods: {
    handlePayment() {
      this.loading = true;

      new window.EgolePay({
        apiKey: process.env.VUE_APP_EGOLEPAY_KEY,
        referenceNumber: this.referenceNumber,
        amount: this.amount,
        email: this.email,
        onSuccess: (response) => {
          this.loading = false;
          this.$emit('success', response);
        },
        onError: (error) => {
          this.loading = false;
          this.$emit('error', error);
        }
      });
    }
  }
};
</script>`,
    sampleResponseTitle: 'Success Payload',
    sampleResponseLanguage: 'json',
    sampleResponse: `{
  "status": "success",
  "amount": 5000,
  "transactionReference": "TXN_123456",
  "paymentReference": "PAY_123456"
}`,
    codeExamplesTitle: 'Parent Listener',
    codeExamples: {
      snippets: [
        {
          id: 'vue-parent',
          label: 'Parent Usage',
          language: 'html',
          code: `<payment-button
  :amount="5000"
  email="customer@example.com"
  reference-number="EGP77154452626262622"
  @success="handleSuccess"
  @error="handleError"
/>`
        }
      ]
    },
    version: 'v1.0.0'
  },
  {
    id: 'angular-component',
    category: 'Framework Guides',
    title: 'Angular Component',
    description: 'Encapsulate the SDK in an Angular component that exposes success and error events to the host screen.',
    method: 'GUIDE',
    route: 'handlePayment(): void',
    copyValue: 'handlePayment(): void',
    authenticationRequired: false,
    requestParametersTitle: 'Component Inputs and Outputs',
    requestParameters: [
      { name: '@Input() amount', type: 'number', required: true, description: 'Amount displayed in the template and sent to the SDK.' },
      { name: '@Input() email', type: 'string', required: true, description: 'Customer email used for the payment request.' },
      { name: '@Input() referenceNumber', type: 'string', required: true, description: 'Customer reference number passed into the EgolePay setup.' },
      { name: '@Output() success', type: 'EventEmitter<any>', required: true, description: 'Emits the EgolePay success response to the parent component.' },
      { name: '@Output() error', type: 'EventEmitter<any>', required: true, description: 'Emits SDK errors so the parent can react to failures.' }
    ],
    sampleRequestTitle: 'Angular Example',
    sampleRequestLanguage: 'typescript',
    sampleRequest: `import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-payment',
  template: \`
    <button (click)="handlePayment()" [disabled]="loading">
      Pay N{{ amount }}
    </button>
  \`
})
export class PaymentComponent {
  @Input() amount!: number;
  @Input() email!: string;
  @Input() referenceNumber!: string;
  @Output() success = new EventEmitter();
  @Output() error = new EventEmitter();

  loading = false;

  handlePayment() {
    this.loading = true;

    new (window as any).EgolePay({
      apiKey: 'sk_test_xxxxxxxxxx',
      referenceNumber: this.referenceNumber,
      amount: this.amount,
      email: this.email,
      onSuccess: (response: unknown) => {
        this.loading = false;
        this.success.emit(response);
      },
      onError: (err: unknown) => {
        this.loading = false;
        this.error.emit(err);
      }
    });
  }
}`,
    sampleResponseTitle: 'Success Payload',
    sampleResponseLanguage: 'json',
    sampleResponse: `{
  "status": "success",
  "amount": 5000,
  "transactionReference": "TXN_123456",
  "paymentReference": "PAY_123456"
}`,
    codeExamplesTitle: 'Template Usage',
    codeExamples: {
      snippets: [
        {
          id: 'angular-parent',
          label: 'Parent Usage',
          language: 'html',
          code: `<app-payment
  [amount]="5000"
  email="customer@example.com"
  referenceNumber="EGP77154452626262622"
  (success)="handleSuccess($event)"
  (error)="handleError($event)"
></app-payment>`
        }
      ]
    },
    version: 'v1.0.0'
  }
];

export const categories = Array.from(new Set(apiEndpoints.map((endpoint) => endpoint.category)));

export const getEndpointsByCategory = (category: string): ApiEndpoint[] => {
  return apiEndpoints.filter((endpoint) => endpoint.category === category);
};

export const getEndpointById = (id: string): ApiEndpoint | undefined => {
  return apiEndpoints.find((endpoint) => endpoint.id === id);
};
