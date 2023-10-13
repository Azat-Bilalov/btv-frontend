import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/header';

const MainLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
