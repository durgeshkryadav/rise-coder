import { createBrowserRouter } from 'react-router-dom';
import App from '@/containers/App';
import ProtectedRoute from '@/components/ProtectedRoute';
import HomePage from '@/containers/HomePage/Loadable';
import TopicPage from '@/containers/TopicPage/Loadable';
import NotFoundPage from '@/containers/NotFoundPage/Loadable';
import FeaturePage from '@/containers/FeaturePage/Loadable';
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';

/**
 * Router — Uses container Loadable pattern from react-boilerplate.
 * Auth routes are public. App routes are protected.
 */
const router = createBrowserRouter([
  // Public auth routes (no sidebar/header)
  { path: '/auth/login', element: <LoginPage /> },
  { path: '/auth/signup', element: <SignupPage /> },
  { path: '/auth/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/auth/reset-password', element: <ResetPasswordPage /> },

  // Protected app routes
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'features', element: <FeaturePage /> },
      { path: ':section/:topic', element: <TopicPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
