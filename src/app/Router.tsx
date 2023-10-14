import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/pages/layouts/MainLayout/ui';
import { HomePage } from '@/pages/home';
import { Map } from '@/pages/map';
import { Queue } from '@/pages/queue';

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
      {
        path: '/queue',
        element: <Queue/>,
      },
    ],
  },
]);
