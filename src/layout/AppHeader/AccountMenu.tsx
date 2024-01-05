import { Logout } from '@mui/icons-material';
import { Avatar, IconButton, ListItemIcon, MenuItem } from '@mui/material';
import { useRef, useState } from 'react';
import MyMenu from '../../components/MyMenu/MyMenu';
import firebaseUtils from '../../firebase';
import { useAppSelector } from '../../redux/store';

const { auth } = firebaseUtils;

export default function AccountMenu() {
  const { userData } = useAppSelector((s) => s.user);
  const anchorEl = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        ref={anchorEl}
        onClick={() => setOpen(true)}
        size='small'
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }} src={userData?.photoURL ?? ''}>
          {userData?.displayName}
        </Avatar>
      </IconButton>
      <MyMenu
        anchorEl={anchorEl.current}
        open={open}
        onClose={() => setOpen(false)}
        onClick={() => setOpen(false)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            auth.signOut();
            window.location.reload();
          }}
        >
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </MyMenu>
    </>
  );
}
