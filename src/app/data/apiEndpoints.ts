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
    description: 'Load the hosted PulseBridge checkout script on any page where you want to open the payment modal.',
    method: 'SDK',
    route: '<script src="https://apigateway-test.egolepay.com/pulsebridge-sdk.js"></script>',
    copyValue: '<script src="https://apigateway-test.egolepay.com/pulsebridge-sdk.js"></script>',
    authenticationRequired: false,
    requestHeadersTitle: 'SDK Details',
    requestHeaders: [
      {
        name: 'Script URL',
        type: 'string',
        required: true,
        description: 'Hosted JavaScript bundle that exposes the PulseBridge checkout constructor.'
      },
      {
        name: 'Global object',
        type: 'window.InlineJS',
        required: true,
        description: 'Constructor available after the script loads and ready to be used in browser code.'
      }
    ],
    sampleRequestTitle: 'Embed Example',
    sampleRequestLanguage: 'html',
    sampleRequest: `<script src="https://apigateway-test.egolepay.com/pulsebridge-sdk.js"></script>

<button onclick="startPayment()">Pay Bill</button>

<script>
  function startPayment() {
    const payment = new InlineJS({
      merchantId: '22C811B4-EF62-*******************',
      apiKey: 'sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      secretKey: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxx',
      uGuid: '12345',
      txnRef: 'SCP43202660440414',
      type: 'WebGuid',
      amount: 75295.50,
      email: 'customer@example.com',
      currency: 'NGN',
      description: 'Safety Certification Payment',
      onSuccess: function (response) {
        console.log('onSuccess', response);
      },
      onClose: function (info) {
        console.log('onClose');
      },
      onError: function (error) {
        console.log('onError', error);
      }
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
          code: `<script src="https://apigateway-test.egolepay.com/pulsebridge-sdk.js"></script>

<button onclick="startPayment()">Pay Bill</button>

<script>
  function startPayment() {
    const payment = new InlineJS({
      merchantId: '22C811B4-EF62-*******************',
      apiKey: 'sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      secretKey: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxx',
      uGuid: '12345',
      txnRef: 'SCP43202660440414',
      type: 'WebGuid',
      amount: 75295.50,
      email: 'customer@example.com',
      onSuccess: function (response) {
        console.log('onSuccess', response);
      }
    });
  }
</script>`
        },
        {
          id: 'deferred-script',
          label: 'Deferred Load',
          language: 'html',
          code: `<script defer src="https://apigateway-test.egolepay.com/pulsebridge-sdk.js"></script>

<button id="pay-button">Pay Bill</button>

<script>
  window.addEventListener('load', function () {
    document.getElementById('pay-button').addEventListener('click', function () {
      const payment = new InlineJS({
        merchantId: '22C811B4-EF62-*******************',
        apiKey: 'sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        secretKey: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxx',
        uGuid: '12345',
        txnRef: 'SCP43202660440414',
        type: 'WebGuid',
        amount: 75295.50,
        email: 'customer@example.com',
        onSuccess: function (response) {
          console.log('onSuccess', response);
        }
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
    description: 'Create a checkout session by passing your merchant identifiers, API keys, wallet ID, and transaction details into the InlineJS constructor.',
    method: 'SDK',
    route: 'new InlineJS(config)',
    copyValue: `new InlineJS({
  merchantId: '22C811B4-EF62-*******************',
  apiKey: 'sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  secretKey: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxx',
  uGuid: '12345',
  type: 'WebGuid',
  txnRef: 'SCP43202660440414',
  amount: 75295.50,
  email: 'customer@example.com'
})`,
    authenticationRequired: false,
    requestParametersTitle: 'Configuration Options',
    requestParameters: [
      { name: 'merchantId', type: 'string', required: true, description: 'Merchant unique identifier (e.g. 22C811B4-EF62-*******************).' },
      { name: 'apiKey', type: 'string', required: true, description: 'Your EgolePay API key. Use sk_test_ prefix in sandbox.' },
      { name: 'secretKey', type: 'string', required: true, description: 'Your EgolePay Secret/Public key. Use pk_test_ prefix in sandbox.' },
      { name: 'uGuid', type: 'string', required: true, description: 'Egole Wallet ID (e.g. 12345 for sandbox testing).' },
      { name: 'type', type: 'string', required: true, description: 'Integration type. Set to "WebGuid".' },
      { name: 'txnRef', type: 'string', required: true, description: 'Required transaction/bill reference number (e.g. SCP43202660440414).' },
      { name: 'amount', type: 'number', required: true, description: 'The bill payment amount in NGN.' },
      { name: 'email', type: 'string', required: true, description: 'Customer email address used for confirmations and tracking.' },
      { name: 'currency', type: 'string', required: false, description: 'Payment currency, defaults to "NGN".' },
      { name: 'description', type: 'string', required: false, description: 'Brief description of the transaction.' }
    ],
    sampleRequestTitle: 'SDK Initialization Example',
    sampleRequestLanguage: 'javascript',
    sampleRequest: `function startPayment() {
  const payment = new InlineJS({
    merchantId: '22C811B4-EF62-*******************',
    apiKey: 'sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    secretKey: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxx',
    uGuid: '12345',
    type: 'WebGuid',
    txnRef: 'SCP43202660440414',
    amount: 75295.50,
    email: 'customer@example.com',
    currency: 'NGN',
    description: 'Safety Certification Payment',
    onSuccess: function (response) {
      console.log('onSuccess', response);
      window.location.href = '/success?ref=' + response.transactionReference;
    },
    onClose: function (info) {
      console.log('onClose');
    },
    onError: function (error) {
      console.error('onError', error);
      alert(error.message);
    }
  });
}`,
    sampleResponseTitle: 'Success Payload',
    sampleResponseLanguage: 'json',
    sampleResponse: `{
  "status": "success",
  "amount": 75295.50,
  "transactionReference": "TXN_123456",
  "paymentReference": "PAY_123456",
  "paymentMethod": "transfer", // "card" or "transfer"
  "txnRef": "SCP43202660440414"
}`,
    codeExamplesTitle: 'Integration Examples',
    codeExamples: {
      snippets: [
        {
          id: 'basic-checkout',
          label: 'Basic Checkout',
          language: 'javascript',
          code: `function payBill() {
  const payment = new InlineJS({
    merchantId: '22C811B4-EF62-*******************',
    apiKey: 'sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    secretKey: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxx',
    uGuid: '12345',
    txnRef: 'SCP43202660440414',
    type: 'WebGuid',
    amount: 75295.50,
    email: 'customer@example.com',
    onSuccess: (res) => {
      console.log('Payment completed: ' + res.transactionReference);
      window.location.href = '/receipt?ref=' + res.txnRef;
    },
    onError: (err) => alert(err.message)
  });
}`
        }
      ]
    },
    errorResponsesTitle: 'Common Failure States',
    errorResponses: [
      { code: 'INVALID_REFERENCE', message: 'Validation Failed', description: 'The provided transaction reference (txnRef) is invalid or cannot be found.' },
      { code: 'EXPIRED_REFERENCE', message: 'Expired Bill', description: 'The bill associated with this reference has expired.' },
      { code: 'INSUFFICIENT_FUNDS', message: 'Declined', description: 'Customer card does not have enough balance to complete the charge.' },
      { code: 'INVALID_PIN', message: 'Declined', description: 'Incorrect PIN was submitted during card authentication.' },
      { code: 'TRANSFER_EXPIRED', message: 'Expired Transfer', description: 'The 30-minute window for bank transfer expired before the transaction was detected.' }
    ],
    version: 'v1.0.0'
  },
  {
    id: 'callback-events',
    category: 'SDK Basics',
    title: 'Callback Events',
    description: 'Use InlineJS callbacks to react to successful payments, failures, and modal closes.',
    method: 'EVENT',
    route: 'onSuccess | onError | onClose',
    copyValue: `{
  onSuccess(response) {},
  onError(error) {},
  onClose(info) {}
}`,
    authenticationRequired: false,
    requestParametersTitle: 'Available Callbacks',
    requestParameters: [
      { name: 'onSuccess(response)', type: 'function', required: false, description: 'Runs after a successful payment (either card submission or when "I Have Paid" bank transfer is verified). The response contains status, amount, transactionReference, paymentMethod, and txnRef.' },
      { name: 'onError(error)', type: 'function', required: false, description: 'Runs when a validation or payment attempt fails (e.g. invalid reference, invalid PIN, card decline, or expired bank transfer).' },
      { name: 'onClose(info)', type: 'function', required: false, description: 'Runs when the checkout modal is closed.' }
    ],
    sampleRequestTitle: 'Callback Configuration',
    sampleRequestLanguage: 'javascript',
    sampleRequest: `const payment = new InlineJS({
  merchantId: '22C811B4-EF62-*******************',
  apiKey: 'sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  secretKey: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxx',
  uGuid: '12345',
  txnRef: 'SCP43202660440414',
  type: 'WebGuid',
  amount: 75295.50,
  email: 'customer@example.com',
  onSuccess: function (response) {
    console.log('Success!', response.transactionReference, response.paymentMethod);
  },
  onError: function (error) {
    console.log('Error:', error.message);
  },
  onClose: function (info) {
    console.log('Modal closed');
  }
});`,
    sampleResponseTitle: 'Example Success Response',
    sampleResponseLanguage: 'json',
    sampleResponse: `{
  "status": "success",
  "amount": 75295.50,
  "transactionReference": "TXN_123456",
  "paymentReference": "PAY_123456",
  "paymentMethod": "transfer",
  "txnRef": "SCP43202660440414"
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
  //   "amount": 75295.50,
  //   "transactionReference": "TXN_123456",
  //   "paymentReference": "PAY_123456",
  //   "paymentMethod": "transfer",
  //   "txnRef": "SCP43202660440414"
  // }
}`
        },
        {
          id: 'error-handler',
          label: 'onError',
          language: 'javascript',
          code: `onError: function (error) {
  console.log(error);
  // "Invalid reference number" or "Declined: Insufficient funds"
}`
        },
        {
          id: 'close-handler',
          label: 'onClose',
          language: 'javascript',
          code: `onClose: function (info) {
  console.log("onClose");
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
    description: 'Wrap PulseBridge checkout in a reusable React button that receives the configuration parameters and callbacks.',
    method: 'GUIDE',
    route: 'function PaymentButton({ txnRef, amount, email, onSuccess, onError, onClose })',
    copyValue: 'function PaymentButton({ txnRef, amount, email, onSuccess, onError, onClose })',
    authenticationRequired: false,
    requestParametersTitle: 'Component Props',
    requestParameters: [
      { name: 'txnRef', type: 'string', required: true, description: 'Transaction reference number passed into the InlineJS config.' },
      { name: 'amount', type: 'number', required: true, description: 'The payment amount in NGN.' },
      { name: 'email', type: 'string', required: true, description: 'Customer email address.' },
      { name: 'onSuccess', type: '(response) => void', required: true, description: 'Handler that receives the success payload.' },
      { name: 'onError', type: '(error) => void', required: false, description: 'Handler that receives the error payload.' },
      { name: 'onClose', type: '() => void', required: false, description: 'Handler that fires when the checkout modal closes.' }
    ],
    sampleRequestTitle: 'React Example',
    sampleRequestLanguage: 'jsx',
    sampleRequest: `import React from 'react';

function PaymentButton({ txnRef, amount, email, onSuccess, onError, onClose }) {
  const handlePayment = () => {
    if (!window.InlineJS) {
      console.error('PulseBridge SDK not loaded');
      return;
    }
    
    new window.InlineJS({
      merchantId: '22C811B4-EF62-*******************',
      apiKey: process.env.REACT_APP_EGOLEPAY_KEY,
      secretKey: process.env.REACT_APP_EGOLEPAY_SECRET_KEY,
      uGuid: '12345',
      txnRef,
      type: 'WebGuid',
      amount,
      email,
      onSuccess,
      onError: onError || ((err) => console.log('Error', err)),
      onClose: onClose || (() => console.log('onClose'))
    });
  };

  return (
    <button onClick={handlePayment} className="pay-btn">
      Pay Bill
    </button>
  );
}`,
    sampleResponseTitle: 'Success Payload',
    sampleResponseLanguage: 'json',
    sampleResponse: `{
  "status": "success",
  "amount": 75295.50,
  "transactionReference": "TXN_123456",
  "paymentReference": "PAY_123456",
  "paymentMethod": "card",
  "txnRef": "SCP43202660440414"
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
      txnRef="SCP43202660440414"
      amount={75295.50}
      email="customer@example.com"
      onSuccess={(response) => {
        window.location.href = '/receipt?ref=' + response.transactionReference;
      }}
      onError={(err) => {
        console.error('Checkout failed:', err);
      }}
      onClose={() => {
        console.log('Checkout closed');
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
    description: 'Use a Vue component to manage loading state while forwarding success, error, and close events to parent components.',
    method: 'GUIDE',
    route: 'methods.handlePayment()',
    copyValue: 'methods.handlePayment()',
    authenticationRequired: false,
    requestParametersTitle: 'Component Inputs',
    requestParameters: [
      { name: 'txnRef', type: 'String', required: true, description: 'Transaction reference number.' },
      { name: 'amount', type: 'Number', required: true, description: 'Payment amount in NGN.' },
      { name: 'email', type: 'String', required: true, description: 'Customer email address.' },
      { name: 'loading', type: 'Boolean', required: false, description: 'Component state that disables the button while checkout is in progress.' }
    ],
    sampleRequestTitle: 'Vue Example',
    sampleRequestLanguage: 'html',
    sampleRequest: `<template>
  <button @click="handlePayment" :disabled="loading" class="pay-btn">
    {{ loading ? 'Processing...' : 'Pay Bill' }}
  </button>
</template>

<script>
export default {
  props: ['txnRef', 'amount', 'email'],
  data() {
    return {
      loading: false
    };
  },
  methods: {
    handlePayment() {
      this.loading = true;

      new window.InlineJS({
        merchantId: '22C811B4-EF62-*******************',
        apiKey: process.env.VUE_APP_EGOLEPAY_KEY,
        secretKey: process.env.VUE_APP_EGOLEPAY_SECRET_KEY,
        uGuid: '12345',
        txnRef: this.txnRef,
        type: 'WebGuid',
        amount: this.amount,
        email: this.email,
        onSuccess: (response) => {
          this.loading = false;
          this.$emit('success', response);
        },
        onError: (error) => {
          this.loading = false;
          this.$emit('error', error);
        },
        onClose: () => {
          this.loading = false;
          this.$emit('close');
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
  "amount": 75295.50,
  "transactionReference": "TXN_123456",
  "paymentReference": "PAY_123456",
  "paymentMethod": "transfer",
  "txnRef": "SCP43202660440414"
}`,
    codeExamplesTitle: 'Parent Listener',
    codeExamples: {
      snippets: [
        {
          id: 'vue-parent',
          label: 'Parent Usage',
          language: 'html',
          code: `<payment-button
  txn-ref="SCP43202660440414"
  :amount="75295.50"
  email="customer@example.com"
  @success="handleSuccess"
  @error="handleError"
  @close="handleClose"
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
    description: 'Encapsulate the SDK in an Angular component that exposes success, error, and close events to the host screen.',
    method: 'GUIDE',
    route: 'handlePayment(): void',
    copyValue: 'handlePayment(): void',
    authenticationRequired: false,
    requestParametersTitle: 'Component Inputs and Outputs',
    requestParameters: [
      { name: '@Input() txnRef', type: 'string', required: true, description: 'Transaction reference number.' },
      { name: '@Input() amount', type: 'number', required: true, description: 'The bill payment amount.' },
      { name: '@Input() email', type: 'string', required: true, description: 'Customer email.' },
      { name: '@Output() success', type: 'EventEmitter<any>', required: true, description: 'Emits the success response to the parent.' },
      { name: '@Output() error', type: 'EventEmitter<any>', required: true, description: 'Emits SDK errors.' },
      { name: '@Output() close', type: 'EventEmitter<any>', required: true, description: 'Emits close event.' }
    ],
    sampleRequestTitle: 'Angular Example',
    sampleRequestLanguage: 'typescript',
    sampleRequest: `import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-payment',
  template: \`
    <button (click)="handlePayment()" [disabled]="loading" class="pay-btn">
      {{ loading ? 'Processing...' : 'Pay Bill' }}
    </button>
  \`
})
export class PaymentComponent {
  @Input() txnRef!: string;
  @Input() amount!: number;
  @Input() email!: string;
  @Output() success = new EventEmitter();
  @Output() error = new EventEmitter();
  @Output() close = new EventEmitter();

  loading = false;

  handlePayment() {
    this.loading = true;

    new (window as any).InlineJS({
      merchantId: '22C811B4-EF62-*******************',
      apiKey: 'sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      secretKey: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxx',
      uGuid: '12345',
      txnRef: this.txnRef,
      type: 'WebGuid',
      amount: this.amount,
      email: this.email,
      onSuccess: (response: unknown) => {
        this.loading = false;
        this.success.emit(response);
      },
      onError: (err: unknown) => {
        this.loading = false;
        this.error.emit(err);
      },
      onClose: () => {
        this.loading = false;
        this.close.emit();
      }
    });
  }
}`,
    sampleResponseTitle: 'Success Payload',
    sampleResponseLanguage: 'json',
    sampleResponse: `{
  "status": "success",
  "amount": 75295.50,
  "transactionReference": "TXN_123456",
  "paymentReference": "PAY_123456",
  "paymentMethod": "card",
  "txnRef": "SCP43202660440414"
}`,
    codeExamplesTitle: 'Template Usage',
    codeExamples: {
      snippets: [
        {
          id: 'angular-parent',
          label: 'Parent Usage',
          language: 'html',
          code: `<app-payment
  txnRef="SCP43202660440414"
  [amount]="75295.50"
  email="customer@example.com"
  (success)="handleSuccess($event)"
  (error)="handleError($event)"
  (close)="handleClose()"
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
