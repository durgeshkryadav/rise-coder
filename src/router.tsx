import { createBrowserRouter } from 'react-router-dom';
import App from '@/containers/App';
import ProtectedRoute from '@/components/ProtectedRoute';
import HomePage from '@/containers/HomePage/Loadable';
import TopicPage from '@/containers/TopicPage/Loadable';
import NotFoundPage from '@/containers/NotFoundPage/Loadable';
import FeaturePage from '@/containers/FeaturePage/Loadable';
import Blind75Page from '@/pages/Blind75Page';
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import Loadable from '@/utils/loadable';

const TwoSum3DPage = Loadable(() => import('@/features/visualizer3d/pages/TwoSum3DPage'));
const ContainsDuplicate3DPage = Loadable(() => import('@/features/visualizer3d/pages/ContainsDuplicate3DPage'));
const ValidAnagram3DPage = Loadable(() => import('@/features/visualizer3d/pages/ValidAnagram3DPage'));
const GroupAnagrams3DPage = Loadable(() => import('@/features/visualizer3d/pages/GroupAnagrams3DPage'));
const TopKFrequent3DPage = Loadable(() => import('@/features/visualizer3d/pages/TopKFrequent3DPage'));
const EncodeDecode3DPage = Loadable(() => import('@/features/visualizer3d/pages/EncodeDecode3DPage'));
const ProductExceptSelf3DPage = Loadable(() => import('@/features/visualizer3d/pages/ProductExceptSelf3DPage'));
const LongestConsecutive3DPage = Loadable(() => import('@/features/visualizer3d/pages/LongestConsecutive3DPage'));

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

  // Protected full-screen routes (no sidebar/header)
  {
    path: '/dsa/blind-75/two-sum-3d',
    element: (
      <ProtectedRoute>
        <TwoSum3DPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dsa/blind-75/contains-duplicate-3d',
    element: (
      <ProtectedRoute>
        <ContainsDuplicate3DPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dsa/blind-75/valid-anagram-3d',
    element: (
      <ProtectedRoute>
        <ValidAnagram3DPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dsa/blind-75/group-anagrams-3d',
    element: (
      <ProtectedRoute>
        <GroupAnagrams3DPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dsa/blind-75/top-k-frequent-3d',
    element: (
      <ProtectedRoute>
        <TopKFrequent3DPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dsa/blind-75/encode-decode-3d',
    element: (
      <ProtectedRoute>
        <EncodeDecode3DPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dsa/blind-75/product-except-self-3d',
    element: (
      <ProtectedRoute>
        <ProductExceptSelf3DPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dsa/blind-75/longest-consecutive-3d',
    element: (
      <ProtectedRoute>
        <LongestConsecutive3DPage />
      </ProtectedRoute>
    ),
  },

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
      { path: 'dsa/blind-75', element: <Blind75Page /> },
      { path: ':section', element: <HomePage /> },
      { path: ':section/:topic', element: <TopicPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
