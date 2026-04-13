import { createBrowserRouter } from 'react-router-dom';
import App from '@/containers/App';
import HomePage from '@/containers/HomePage/Loadable';
import TopicPage from '@/containers/TopicPage/Loadable';
import NotFoundPage from '@/containers/NotFoundPage/Loadable';
import FeaturePage from '@/containers/FeaturePage/Loadable';

/**
 * Router — Uses container Loadable pattern from react-boilerplate.
 * Each container has its own Loadable.jsx for code splitting.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'features', element: <FeaturePage /> },
      { path: ':section/:topic', element: <TopicPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
