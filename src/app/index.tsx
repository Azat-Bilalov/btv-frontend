import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import '@shared/config';

import './styles/index.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <RouterProvider router={router} />;
    </div>
  );
};

export default App;
