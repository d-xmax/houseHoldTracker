import RootLayout from '@/layouts/RootLayout';
import { SignInForm } from '@/pages/auth/components/SignInForm';
import { SignUpForm } from '@/pages/auth/components/SignUpForm';
import GroceryPlanner from '@/pages/dashboard/components/GroceryPlanner';
import { HelpPanel } from '@/pages/dashboard/components/HelpPanel';
import { LogoutPanel } from '@/pages/dashboard/components/LogoutPanel';
import { SettingsPanel } from '@/pages/dashboard/components/SettingsPanel';
import IntroductionPage from '@/pages/IntroductionPage';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: IntroductionPage,
  },
  {
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: 'grocery-pilot',
        children: [
          {
            index: true,
            Component: GroceryPlanner,
          },
          {
            path: 'settings',
            Component: SettingsPanel,
          },
          {
            path: 'logout',
            Component: LogoutPanel,
          },
          {
            path: 'help',
            Component: HelpPanel,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    Component: SignInForm,
  },
  {
    path: 'signup',
    Component: SignUpForm,
  },
]);
