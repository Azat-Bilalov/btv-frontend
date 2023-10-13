import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/pages/layouts/MainLayout/ui';
import { HomePage } from '@/pages/home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
]);
