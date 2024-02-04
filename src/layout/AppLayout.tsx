import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';

import { Outlet } from 'react-router-dom';
import AppBreadCrumb from './AppBreadCrumb';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import { CssVar } from '@/constants';

export default function JoyOrderDashboardTemplate() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <AppHeader />
        <AppSidebar />
        <Box
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: `calc(12px + var(${CssVar.HEADER_HEIGHT}))`,
              md: 3,
            },
            pb: 2,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
            overflow: 'auto',
          }}
        >
          <Box
            display='flex'
            flexGrow={1}
            flexDirection='column'
            alignItems='center'
          >
            <Box
              display='flex'
              flexDirection='column'
              gap={1}
              maxWidth={`var(${CssVar.PAGE_WIDTH} , 800px)`}
              width='100%'
              flexGrow={1}
            >
              {/* <AppBreadCrumb /> */}
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
