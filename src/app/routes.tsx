import { createBrowserRouter } from 'react-router';
import RootLayout from './pages/RootLayout';
import LandingPage from './pages/LandingPage';
import IntroductionPage from './pages/IntroductionPage';
import AuthenticationPage from './pages/AuthenticationPage';
import ApiKeysPage from './pages/ApiKeysPage';
import EndpointPage from './pages/EndpointPage';
import TestingPage from './pages/TestingPage';
import FaqPage from './pages/FaqPage';
import ErrorCodesPage from './pages/ErrorCodesPage';
import ChangelogPage from './pages/ChangelogPage';
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
        path: 'docs/testing',
        Component: TestingPage
      },
      {
        path: 'docs/faq',
        Component: FaqPage
      },
      {
        path: 'docs/error-codes',
        Component: ErrorCodesPage
      },
      {
        path: 'docs/changelog',
        Component: ChangelogPage
      },
      {
        path: 'docs/:endpointId',
        Component: EndpointPage
      },
      {
        path: '*',
        Component: NotFoundPage
      }
    ]
  }
]);
