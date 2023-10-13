import { RouterProvider } from 'react-router-dom';
import { router } from './Router';

import './styles/index.scss';

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
