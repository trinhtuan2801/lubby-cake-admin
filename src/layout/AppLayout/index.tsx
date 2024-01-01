import { Outlet, useLocation } from 'react-router-dom';
import './index.scss';
import Header from '../AppHeader';
import SideBar from '../AppSideBar';
import { useState } from 'react';

export default function AppLayout() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const location = useLocation();

  if (location.pathname === '/login') return <Outlet />;

  return (
    <div className='app-root'>
      <div className='app-layout'>
        <SideBar
          open={openSideBar}
          onClose={() => {
            setOpenSideBar(false);
          }}
        />
        <div className='app-content'>
          <Header toggleOpenSideBar={() => setOpenSideBar((prev) => !prev)} />
          <div className='app-body'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
