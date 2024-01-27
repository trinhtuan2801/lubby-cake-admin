import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';

import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { Outlet } from 'react-router-dom';
import AppBreadCrumb from './AppBreadCrumb';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';

export default function JoyOrderDashboardTemplate() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <AppHeader />
        <AppSidebar />
        <Box
          component='main'
          className='MainContent'
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: 2,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
          <AppBreadCrumb />

          <Outlet />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
