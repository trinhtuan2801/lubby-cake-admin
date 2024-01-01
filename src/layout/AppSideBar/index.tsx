import { CakeOutlined, CategoryOutlined } from '@mui/icons-material';
import { Drawer, DrawerProps } from '@mui/material';
import { PropsWithChildren } from 'react';
import useCheckScreen from '../../hooks/useCheckScreen';
import Content, { NavItem } from './Content';
import './index.scss';

interface Props {
  open: boolean;
  onClose: () => void;
}

const items: NavItem[] = [
  {
    label: 'Thể loại',
    path: '/categories',
    icon: CategoryOutlined,
  },
  {
    label: 'Bánh',
    path: '/cakes',
    icon: CakeOutlined,
  },
];

export default function AppSideBar({ onClose, open }: Props) {
  const { isMobile } = useCheckScreen();

  if (isMobile)
    return (
      <MobileWrapper open={open} onClose={onClose}>
        <Content items={items} />
      </MobileWrapper>
    );

  return (
    <DesktopWrapper>
      <Content items={items} />
    </DesktopWrapper>
  );
}

function DesktopWrapper({ children }: PropsWithChildren) {
  return (
    <div className='app-side-bar'>
      <div className='fixed-container'>{children}</div>;
    </div>
  );
}

function MobileWrapper({ open, onClose, children }: DrawerProps) {
  return (
    <Drawer anchor={'left'} open={open} onClose={onClose}>
      <div className='app-side-bar-drawer-content'>{children}</div>
    </Drawer>
  );
}
