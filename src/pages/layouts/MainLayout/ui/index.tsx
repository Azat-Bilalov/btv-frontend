import { Outlet } from 'react-router-dom';
import { Navabar } from '@/widgets/navbar/ui';

const MainLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
      <Navabar />
    </div>
  );
};

export default MainLayout;
