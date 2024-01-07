import { Outlet, useLocation } from 'react-router-dom';
import './AppLayout.scss';
import SideBar from '../AppSideBar/AppSideBar';
import { useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import useCheckScreen from '@/hooks/useCheckScreen';
import clsx from 'clsx';

export default function AppLayout() {
  const { isMobile } = useCheckScreen();
  const [openSideBar, setOpenSideBar] = useState(false);
  const location = useLocation();

  if (location.pathname === '/login') return <Outlet />;

  return (
    <div className='app-root'>
      <div className='app-layout'>
        <div className={clsx('app-side-bar', isMobile && 'mobile')}>
          <SideBar
            open={openSideBar}
            onClose={() => {
              setOpenSideBar(false);
            }}
          />
        </div>
        <div className='app-content'>
          <div className='app-header'>
            <AppHeader
              toggleOpenSideBar={() => setOpenSideBar((prev) => !prev)}
            />
          </div>
          <div className='app-content-body'>
            <div className='app-content-body-max-width'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
