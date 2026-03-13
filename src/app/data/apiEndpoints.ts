export interface CodeExample {
  curl?: string;
  javascript?: string;
  flutter?: string;
  python?: string;
  php?: string;
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
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  route: string;
  authenticationRequired: boolean;
  requestHeaders?: Parameter[];
  requestParameters?: Parameter[];
  requestBody?: string;
  sampleRequest?: string;
  sampleResponse: string;
  errorResponses?: ErrorResponse[];
  codeExamples: CodeExample;
  version: string;
  deprecated?: boolean;
  playgroundEnabled?: boolean;
}

export const apiEndpoints: ApiEndpoint[] = [
  {
    id: 'initialize-transaction',
    category: 'Payments API',
    title: 'Initialize Transaction',
    description: 'Initialize a new payment transaction and get an authorization URL to redirect your customer to complete payment.',
    method: 'POST',
    route: '/api/v1/transactions/initialize',
    authenticationRequired: true,
    requestHeaders: [
      { name: 'Authorization', type: 'string', required: true, description: 'Bearer {your_secret_key}' },
      { name: 'Content-Type', type: 'string', required: true, description: 'application/json' }
    ],
    requestParameters: [
      { name: 'email', type: 'string', required: true, description: 'Customer\'s email address' },
      { name: 'amount', type: 'number', required: true, description: 'Amount in kobo (NGN)' },
      { name: 'reference', type: 'string', required: false, description: 'Unique transaction reference (auto-generated if not provided)' },
      { name: 'callback_url', type: 'string', required: false, description: 'URL to redirect customer after payment' },
      { name: 'metadata', type: 'object', required: false, description: 'Additional transaction data' }
    ],
    sampleRequest: `{
  "email": "customer@example.com",
  "amount": 50000,
  "callback_url": "https://yoursite.com/callback",
  "metadata": {
    "customer_name": "John Doe",
    "order_id": "ORD-12345"
  }
}`,
    sampleResponse: `{
  "status": "success",
  "message": "Transaction initialized successfully",
  "data": {
    "authorization_url": "https://checkout.egolapay.com/tx_abc123",
    "access_code": "tx_abc123",
    "reference": "ref_xyz789"
  }
}`,
    errorResponses: [
      { code: '400', message: 'Bad Request', description: 'Invalid parameters provided' },
      { code: '401', message: 'Unauthorized', description: 'Invalid or missing API key' }
    ],
    codeExamples: {
      curl: `curl -X POST https://api.egolapay.com/api/v1/transactions/initialize \\
  -H "Authorization: Bearer YOUR_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "customer@example.com",
    "amount": 50000
  }'`,
      javascript: `const response = await fetch('https://api.egolapay.com/api/v1/transactions/initialize', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_SECRET_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'customer@example.com',
    amount: 50000
  })
});

const data = await response.json();
console.log(data);`,
      flutter: `import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> initializeTransaction() async {
  final response = await http.post(
    Uri.parse('https://api.egolapay.com/api/v1/transactions/initialize'),
    headers: {
      'Authorization': 'Bearer YOUR_SECRET_KEY',
      'Content-Type': 'application/json',
    },
    body: jsonEncode({
      'email': 'customer@example.com',
      'amount': 50000,
    }),
  );
  
  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    print(data);
  }
}`,
      python: `import requests
import json

url = "https://api.egolapay.com/api/v1/transactions/initialize"
headers = {
    "Authorization": "Bearer YOUR_SECRET_KEY",
    "Content-Type": "application/json"
}
payload = {
    "email": "customer@example.com",
    "amount": 50000
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(data)`,
      php: `<?php
$url = "https://api.egolapay.com/api/v1/transactions/initialize";
$data = array(
    "email" => "customer@example.com",
    "amount" => 50000
);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Authorization: Bearer YOUR_SECRET_KEY",
    "Content-Type: application/json"
));

$response = curl_exec($ch);
curl_close($ch);
$result = json_decode($response);
print_r($result);
?>`
    },
    version: 'v1',
    deprecated: false,
    playgroundEnabled: true
  },
  {
    id: 'verify-transaction',
    category: 'Payments API',
    title: 'Verify Transaction',
    description: 'Verify the status of a transaction using the transaction reference.',
    method: 'GET',
    route: '/api/v1/transactions/verify/:reference',
    authenticationRequired: true,
    requestHeaders: [
      { name: 'Authorization', type: 'string', required: true, description: 'Bearer {your_secret_key}' }
    ],
    requestParameters: [
      { name: 'reference', type: 'string', required: true, description: 'Transaction reference to verify' }
    ],
    sampleResponse: `{
  "status": "success",
  "message": "Transaction retrieved successfully",
  "data": {
    "reference": "ref_xyz789",
    "amount": 50000,
    "status": "success",
    "paid_at": "2026-02-27T10:30:00Z",
    "channel": "card",
    "customer": {
      "email": "customer@example.com"
    },
    "metadata": {
      "customer_name": "John Doe"
    }
  }
}`,
    codeExamples: {
      curl: `curl -X GET https://api.egolapay.com/api/v1/transactions/verify/ref_xyz789 \\
  -H "Authorization: Bearer YOUR_SECRET_KEY"`,
      javascript: `const reference = 'ref_xyz789';
const response = await fetch(\`https://api.egolapay.com/api/v1/transactions/verify/\${reference}\`, {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_SECRET_KEY'
  }
});

const data = await response.json();
console.log(data);`,
      flutter: `import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> verifyTransaction(String reference) async {
  final response = await http.get(
    Uri.parse('https://api.egolapay.com/api/v1/transactions/verify/$reference'),
    headers: {
      'Authorization': 'Bearer YOUR_SECRET_KEY',
    },
  );
  
  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    print(data);
  }
}`,
      python: `import requests

reference = "ref_xyz789"
url = f"https://api.egolapay.com/api/v1/transactions/verify/{reference}"
headers = {
    "Authorization": "Bearer YOUR_SECRET_KEY"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)`,
      php: `<?php
$reference = "ref_xyz789";
$url = "https://api.egolapay.com/api/v1/transactions/verify/" . $reference;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Authorization: Bearer YOUR_SECRET_KEY"
));

$response = curl_exec($ch);
curl_close($ch);
$result = json_decode($response);
print_r($result);
?>`
    },
    version: 'v1',
    playgroundEnabled: true
  },
  {
    id: 'create-transfer',
    category: 'Transfers API',
    title: 'Create Transfer',
    description: 'Initiate a transfer to a bank account or mobile money.',
    method: 'POST',
    route: '/api/v1/transfers/create',
    authenticationRequired: true,
    requestHeaders: [
      { name: 'Authorization', type: 'string', required: true, description: 'Bearer {your_secret_key}' },
      { name: 'Content-Type', type: 'string', required: true, description: 'application/json' }
    ],
    requestParameters: [
      { name: 'account_number', type: 'string', required: true, description: 'Recipient account number' },
      { name: 'bank_code', type: 'string', required: true, description: 'Recipient bank code' },
      { name: 'amount', type: 'number', required: true, description: 'Amount in kobo' },
      { name: 'narration', type: 'string', required: false, description: 'Transfer description' },
      { name: 'reference', type: 'string', required: false, description: 'Unique transfer reference' }
    ],
    sampleRequest: `{
  "account_number": "0123456789",
  "bank_code": "058",
  "amount": 10000,
  "narration": "Payment for services",
  "reference": "transfer_ref_123"
}`,
    sampleResponse: `{
  "status": "success",
  "message": "Transfer initiated successfully",
  "data": {
    "transfer_code": "TRF_abc123",
    "reference": "transfer_ref_123",
    "status": "pending",
    "amount": 10000
  }
}`,
    codeExamples: {
      curl: `curl -X POST https://api.egolapay.com/api/v1/transfers/create \\
  -H "Authorization: Bearer YOUR_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "account_number": "0123456789",
    "bank_code": "058",
    "amount": 10000
  }'`,
      javascript: `const response = await fetch('https://api.egolapay.com/api/v1/transfers/create', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_SECRET_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    account_number: '0123456789',
    bank_code: '058',
    amount: 10000
  })
});

const data = await response.json();`,
      flutter: `import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> createTransfer() async {
  final response = await http.post(
    Uri.parse('https://api.egolapay.com/api/v1/transfers/create'),
    headers: {
      'Authorization': 'Bearer YOUR_SECRET_KEY',
      'Content-Type': 'application/json',
    },
    body: jsonEncode({
      'account_number': '0123456789',
      'bank_code': '058',
      'amount': 10000,
    }),
  );
  
  final data = jsonDecode(response.body);
  print(data);
}`,
      python: `import requests

url = "https://api.egolapay.com/api/v1/transfers/create"
headers = {
    "Authorization": "Bearer YOUR_SECRET_KEY",
    "Content-Type": "application/json"
}
payload = {
    "account_number": "0123456789",
    "bank_code": "058",
    "amount": 10000
}

response = requests.post(url, headers=headers, json=payload)
print(response.json())`,
      php: `<?php
$url = "https://api.egolapay.com/api/v1/transfers/create";
$data = array(
    "account_number" => "0123456789",
    "bank_code" => "058",
    "amount" => 10000
);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Authorization: Bearer YOUR_SECRET_KEY",
    "Content-Type: application/json"
));

$response = curl_exec($ch);
print_r(json_decode($response));
?>`
    },
    version: 'v1',
    playgroundEnabled: true
  },
  {
    id: 'buy-airtime',
    category: 'Bill Payments API',
    title: 'Buy Airtime',
    description: 'Purchase airtime for mobile phone numbers across all networks.',
    method: 'POST',
    route: '/api/v1/bills/airtime',
    authenticationRequired: true,
    requestHeaders: [
      { name: 'Authorization', type: 'string', required: true, description: 'Bearer {your_secret_key}' },
      { name: 'Content-Type', type: 'string', required: true, description: 'application/json' }
    ],
    requestParameters: [
      { name: 'phone_number', type: 'string', required: true, description: 'Phone number to recharge' },
      { name: 'network', type: 'string', required: true, description: 'Network provider (MTN, GLO, AIRTEL, 9MOBILE)' },
      { name: 'amount', type: 'number', required: true, description: 'Amount in Naira' },
      { name: 'reference', type: 'string', required: false, description: 'Unique transaction reference' }
    ],
    sampleRequest: `{
  "phone_number": "08012345678",
  "network": "MTN",
  "amount": 1000,
  "reference": "airtime_ref_123"
}`,
    sampleResponse: `{
  "status": "success",
  "message": "Airtime purchase successful",
  "data": {
    "reference": "airtime_ref_123",
    "phone_number": "08012345678",
    "amount": 1000,
    "status": "completed"
  }
}`,
    codeExamples: {
      curl: `curl -X POST https://api.egolapay.com/api/v1/bills/airtime \\
  -H "Authorization: Bearer YOUR_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phone_number": "08012345678",
    "network": "MTN",
    "amount": 1000
  }'`,
      javascript: `const response = await fetch('https://api.egolapay.com/api/v1/bills/airtime', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_SECRET_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    phone_number: '08012345678',
    network: 'MTN',
    amount: 1000
  })
});`,
      flutter: `import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> buyAirtime() async {
  final response = await http.post(
    Uri.parse('https://api.egolapay.com/api/v1/bills/airtime'),
    headers: {
      'Authorization': 'Bearer YOUR_SECRET_KEY',
      'Content-Type': 'application/json',
    },
    body: jsonEncode({
      'phone_number': '08012345678',
      'network': 'MTN',
      'amount': 1000,
    }),
  );
  
  print(jsonDecode(response.body));
}`,
      python: `import requests

url = "https://api.egolapay.com/api/v1/bills/airtime"
payload = {
    "phone_number": "08012345678",
    "network": "MTN",
    "amount": 1000
}

response = requests.post(url, 
    headers={"Authorization": "Bearer YOUR_SECRET_KEY"},
    json=payload)
print(response.json())`,
      php: `<?php
$data = array(
    "phone_number" => "08012345678",
    "network" => "MTN",
    "amount" => 1000
);

$ch = curl_init("https://api.egolapay.com/api/v1/bills/airtime");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Authorization: Bearer YOUR_SECRET_KEY"
));

print_r(json_decode(curl_exec($ch)));
?>`
    },
    version: 'v1',
    playgroundEnabled: true
  },
  {
    id: 'refund-transaction',
    category: 'Payments API',
    title: 'Refund Transaction',
    description: 'Process a refund for a completed transaction.',
    method: 'POST',
    route: '/api/v1/transactions/refund',
    authenticationRequired: true,
    requestHeaders: [
      { name: 'Authorization', type: 'string', required: true, description: 'Bearer {your_secret_key}' },
      { name: 'Content-Type', type: 'string', required: true, description: 'application/json' }
    ],
    requestParameters: [
      { name: 'transaction_reference', type: 'string', required: true, description: 'Reference of the transaction to refund' },
      { name: 'amount', type: 'number', required: false, description: 'Amount to refund (full refund if not specified)' },
      { name: 'reason', type: 'string', required: false, description: 'Reason for the refund' }
    ],
    sampleRequest: `{
  "transaction_reference": "ref_xyz789",
  "amount": 25000,
  "reason": "Customer requested refund"
}`,
    sampleResponse: `{
  "status": "success",
  "message": "Refund processed successfully",
  "data": {
    "refund_id": "rfnd_abc123",
    "transaction_reference": "ref_xyz789",
    "amount": 25000,
    "status": "completed",
    "processed_at": "2026-02-27T11:00:00Z"
  }
}`,
    codeExamples: {
      curl: `curl -X POST https://api.egolapay.com/api/v1/transactions/refund \\
  -H "Authorization: Bearer YOUR_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "transaction_reference": "ref_xyz789",
    "amount": 25000
  }'`,
      javascript: `const response = await fetch('https://api.egolapay.com/api/v1/transactions/refund', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_SECRET_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    transaction_reference: 'ref_xyz789',
    amount: 25000
  })
});`,
      flutter: `import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> refundTransaction() async {
  final response = await http.post(
    Uri.parse('https://api.egolapay.com/api/v1/transactions/refund'),
    headers: {
      'Authorization': 'Bearer YOUR_SECRET_KEY',
      'Content-Type': 'application/json',
    },
    body: jsonEncode({
      'transaction_reference': 'ref_xyz789',
      'amount': 25000,
    }),
  );
  
  print(jsonDecode(response.body));
}`,
      python: `import requests

url = "https://api.egolapay.com/api/v1/transactions/refund"
payload = {
    "transaction_reference": "ref_xyz789",
    "amount": 25000
}

response = requests.post(url, 
    headers={"Authorization": "Bearer YOUR_SECRET_KEY"},
    json=payload)
print(response.json())`,
      php: `<?php
$data = array(
    "transaction_reference" => "ref_xyz789",
    "amount" => 25000
);

$ch = curl_init("https://api.egolapay.com/api/v1/transactions/refund");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Authorization: Bearer YOUR_SECRET_KEY",
    "Content-Type: application/json"
));

print_r(json_decode(curl_exec($ch)));
?>`
    },
    version: 'v1',
    playgroundEnabled: true
  },
  {
    id: 'verify-transfer',
    category: 'Transfers API',
    title: 'Verify Transfer',
    description: 'Check the status of a transfer using the transfer code or reference.',
    method: 'GET',
    route: '/api/v1/transfers/verify/:reference',
    authenticationRequired: true,
    requestHeaders: [
      { name: 'Authorization', type: 'string', required: true, description: 'Bearer {your_secret_key}' }
    ],
    requestParameters: [
      { name: 'reference', type: 'string', required: true, description: 'Transfer reference or code to verify' }
    ],
    sampleResponse: `{
  "status": "success",
  "message": "Transfer retrieved successfully",
  "data": {
    "reference": "transfer_ref_123",
    "transfer_code": "TRF_abc123",
    "amount": 10000,
    "status": "completed",
    "recipient": {
      "account_number": "0123456789",
      "bank_name": "GTBank"
    },
    "completed_at": "2026-02-27T10:45:00Z"
  }
}`,
    codeExamples: {
      curl: `curl -X GET https://api.egolapay.com/api/v1/transfers/verify/transfer_ref_123 \\
  -H "Authorization: Bearer YOUR_SECRET_KEY"`,
      javascript: `const reference = 'transfer_ref_123';
const response = await fetch(\`https://api.egolapay.com/api/v1/transfers/verify/\${reference}\`, {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_SECRET_KEY'
  }
});`,
      flutter: `import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> verifyTransfer(String reference) async {
  final response = await http.get(
    Uri.parse('https://api.egolapay.com/api/v1/transfers/verify/$reference'),
    headers: {
      'Authorization': 'Bearer YOUR_SECRET_KEY',
    },
  );
  
  print(jsonDecode(response.body));
}`,
      python: `import requests

reference = "transfer_ref_123"
url = f"https://api.egolapay.com/api/v1/transfers/verify/{reference}"

response = requests.get(url, 
    headers={"Authorization": "Bearer YOUR_SECRET_KEY"})
print(response.json())`,
      php: `<?php
$reference = "transfer_ref_123";
$url = "https://api.egolapay.com/api/v1/transfers/verify/" . $reference;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Authorization: Bearer YOUR_SECRET_KEY"
));

print_r(json_decode(curl_exec($ch)));
?>`
    },
    version: 'v1',
    playgroundEnabled: true
  }
];

// Extract unique categories for sidebar navigation
export const categories = Array.from(new Set(apiEndpoints.map(endpoint => endpoint.category)));

// Helper to get endpoints by category
export const getEndpointsByCategory = (category: string): ApiEndpoint[] => {
  return apiEndpoints.filter(endpoint => endpoint.category === category);
};

// Helper to find endpoint by ID
export const getEndpointById = (id: string): ApiEndpoint | undefined => {
  return apiEndpoints.find(endpoint => endpoint.id === id);
};