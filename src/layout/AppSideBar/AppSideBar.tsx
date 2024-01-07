import { CakeOutlined, CategoryOutlined } from '@mui/icons-material';
import { Drawer, DrawerProps } from '@mui/material';
import { PropsWithChildren } from 'react';
import Content, { NavItem } from './SideBarContent';
import useCheckScreen from '@/hooks/useCheckScreen';

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
      <Drawer anchor={'left'} open={open} onClose={onClose}>
        <Content items={items} />
      </Drawer>
    );

  return <Content items={items} />;
}
