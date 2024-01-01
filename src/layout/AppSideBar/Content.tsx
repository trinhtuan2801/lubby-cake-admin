import { CategoryOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
import './Content.scss';

type IconType = typeof CategoryOutlined;

export interface NavItem {
  label: string;
  icon: IconType;
  path: string;
}

interface Props {
  items: NavItem[];
}

export default function Content({ items }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div className='app-side-bar-content'>
      <Typography
        fontSize='24px'
        className='title'
        color='primary'
        fontWeight='700'
      >
        Lubby Cake
      </Typography>
      {items.map(({ icon: Icon, label, path }, index) => (
        <div
          key={index}
          onClick={() => {
            navigate(path);
          }}
          className={clsx('nav-item', pathname === path && 'active')}
        >
          <Icon fontSize='small' />
          <Typography>{label}</Typography>
        </div>
      ))}
    </div>
  );
}
