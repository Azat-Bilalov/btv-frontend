import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/pages/layouts/MainLayout/ui';
import { HomePage } from '@/pages/home';
import { Map } from '@/pages/map';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/map',
        element: <Map/>,
      },
    ],
  },
]);
