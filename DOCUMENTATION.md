# Egolapay API Documentation

A modern, schema-driven API documentation website for Egolapay fintech services.

## 🎯 Key Features

### Schema-Driven Architecture
- **Single Source of Truth**: All API endpoints are defined in `/src/app/data/apiEndpoints.ts`
- **Auto-Generated Pages**: Documentation pages are automatically rendered from the schema
- **Easy Maintenance**: Add new endpoints by simply updating the data structure
- **Consistent Design**: All endpoints follow the same presentation format

### Design Features
- ✨ Dark/Light mode toggle
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Brand colors (#FFD24D, #FF8000, #FEAC01)
- 🔍 Search functionality
- 📑 Auto-generated table of contents
- 💻 Multi-language code examples (cURL, JavaScript, Flutter, Python, PHP)
- 🎮 Interactive API playground
- 📊 Parameter tables
- 🎯 Method badges (GET, POST, PUT, DELETE)

## 📁 Project Structure

```
src/app/
├── data/
│   └── apiEndpoints.ts          # API schema definitions
├── contexts/
│   └── ThemeContext.tsx         # Dark/light mode context
├── components/
│   ├── docs/                    # Documentation-specific components
│   │   ├── ApiPlayground.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── CodeExamples.tsx
│   │   ├── EndpointHeader.tsx
│   │   ├── InfoBox.tsx
│   │   ├── MethodBadge.tsx
│   │   ├── ParameterTable.tsx
│   │   └── ResponseCard.tsx
│   ├── layout/                  # Layout components
│   │   ├── DocLayout.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── TableOfContents.tsx
│   └── ui/                      # UI components (shadcn/ui)
├── pages/
│   ├── LandingPage.tsx          # Homepage
│   ├── IntroductionPage.tsx     # Getting started
│   ├── AuthenticationPage.tsx   # API authentication guide
│   ├── ApiKeysPage.tsx          # Schema architecture explanation
│   ├── EndpointPage.tsx         # Dynamic endpoint renderer
│   ├── RootLayout.tsx           # Root layout with sidebar
│   └── NotFoundPage.tsx         # 404 page
├── routes.tsx                   # React Router configuration
└── App.tsx                      # App entry point
```

## 🚀 Adding New Endpoints

To add a new API endpoint, simply add a new object to the `apiEndpoints` array in `/src/app/data/apiEndpoints.ts`:

```typescript
{
  id: 'my-new-endpoint',
  category: 'My API Category',
  title: 'My Endpoint Title',
  description: 'What this endpoint does',
  method: 'POST',
  route: '/api/v1/my-endpoint',
  authenticationRequired: true,
  requestParameters: [
    { name: 'param1', type: 'string', required: true, description: 'Parameter description' }
  ],
  sampleRequest: `{ "param1": "value" }`,
  sampleResponse: `{ "status": "success" }`,
  codeExamples: {
    curl: '...',
    javascript: '...',
    flutter: '...',
    python: '...',
    php: '...'
  },
  version: 'v1',
  playgroundEnabled: true
}
```

The system will automatically:
- Add it to the sidebar navigation
- Generate a route at `/docs/my-new-endpoint`
- Render the full documentation page
- Include it in search results
- Generate the table of contents

## 🎨 Customization

### Brand Colors
Defined in `/src/styles/theme.css`:
- `--brand-yellow: #FFD24D`
- `--brand-orange: #FF8000`
- `--brand-gold: #FEAC01`

### Fonts
- Body: Inter
- Code: JetBrains Mono

## 🧩 Component System

All documentation pages are built from reusable components:
- `MethodBadge` - HTTP method indicators
- `CodeBlock` - Syntax-highlighted code with copy button
- `ParameterTable` - Request/response parameter tables
- `CodeExamples` - Tabbed code examples
- `ApiPlayground` - Interactive API tester
- `InfoBox` - Warning/info/error message boxes
- `EndpointHeader` - Page header with method and route

## 📱 Mobile Support

The documentation is fully responsive with:
- Collapsible sidebar drawer on mobile
- Hidden table of contents on smaller screens
- Horizontal scrolling code blocks
- Touch-friendly navigation

## 🔍 Search

Search functionality is built in with keyboard shortcut support (⌘K / Ctrl+K).

## 📝 License

Built for Egolapay - Payment Made Easy
