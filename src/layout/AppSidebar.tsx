import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

// import { closeSidebar } from '../utils';
import ColorSchemeToggle from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { SidebarTabs } from '@/constants';
import firebaseUtils from '@/firebase/utils';
import { useAppSelector } from '@/redux/store';
import { Link } from 'react-router-dom';
import { GlobalStyles } from '@mui/joy';
import { closeSidebar } from './sidebarUtils';

const { auth } = firebaseUtils;
export default function AppSidebar() {
  const { userData } = useAppSelector((s) => s.user);

  return (
    <Sheet
      className='Sidebar'
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))', // -100% or 0 
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={{
          ':root': {
            '--Sidebar-width': '220px',
          },
        }}
      />
      <Box
        className='Sidebar-overlay'
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography level='title-lg'>Lubby Cake</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size='sm'
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          {SidebarTabs.map(({ Icon, name, path }) => (
            <Link to={path} key={path}>
              <ListItem>
                <ListItemButton selected={path === location.pathname}>
                  <Icon />
                  <ListItemContent>
                    <Typography level='title-sm'>{name}</Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar variant='outlined' size='sm' src={userData?.photoURL ?? ''} />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level='title-sm'>{userData?.displayName}</Typography>
          <Typography level='body-xs'>
            {userData?.email?.split('@')[0]}
          </Typography>
        </Box>
        <IconButton
          size='sm'
          variant='plain'
          color='neutral'
          onClick={() => auth.signOut().then(() => window.location.reload())}
        >
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
