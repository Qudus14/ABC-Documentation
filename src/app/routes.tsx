import { createBrowserRouter } from 'react-router';
import RootLayout from './pages/RootLayout';
import LandingPage from './pages/LandingPage';
import IntroductionPage from './pages/IntroductionPage';
import AuthenticationPage from './pages/AuthenticationPage';
import ApiKeysPage from './pages/ApiKeysPage';
import EndpointPage from './pages/EndpointPage';
import NotFoundPage from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: LandingPage
      },
      {
        path: 'docs/introduction',
        Component: IntroductionPage
      },
      {
        path: 'docs/authentication',
        Component: AuthenticationPage
      },
      {
        path: 'docs/api-keys',
        Component: ApiKeysPage
      },
      {
        path: 'docs/:endpointId',
        Component: EndpointPage
      },
      {
        path: 'docs/webhooks',
        Component: IntroductionPage // Placeholder
      },
      {
        path: 'docs/error-codes',
        Component: IntroductionPage // Placeholder
      },
      {
        path: 'docs/sdks',
        Component: IntroductionPage // Placeholder
      },
      {
        path: 'docs/changelog',
        Component: IntroductionPage // Placeholder
      },
      {
        path: '*',
        Component: NotFoundPage
      }
    ]
  }
]);