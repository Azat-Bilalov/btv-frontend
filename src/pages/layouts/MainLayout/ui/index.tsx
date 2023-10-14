import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/header';
import { Navabar } from '@/widgets/navbar/ui';

const MainLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Navabar/>
    </div>
  );
};

export default MainLayout;
