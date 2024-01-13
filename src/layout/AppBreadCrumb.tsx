import { routeAliases } from '@/constants';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/joy/Typography';
import { useMemo } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface Crumb {
  path: string;
  name: string;
}

export default function AppBreadCrumb() {
  const { pathname } = useLocation();

  const crumbs = useMemo(() => {
    const result: Crumb[] = [];
    const paths = pathname.split('/').slice(1);
    let currRoute = routeAliases;
    let currPath = '';
    paths.forEach((path) => {
      if (currRoute.subRoutes?.[path]) {
        currRoute = currRoute.subRoutes[path];
        currPath += `/${path}`;
        result.push({
          path: currPath,
          name: currRoute.name,
        });
      }
    });
    return result;
  }, [pathname]);

  return (
    <Breadcrumbs
      size='sm'
      aria-label='breadcrumbs'
      separator={<ChevronRightRoundedIcon fontSize='small' />}
      sx={{ pl: 0 }}
    >
      <RouterLink to='/'>
        <Typography
          color='neutral'
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <HomeRoundedIcon />
        </Typography>
      </RouterLink>

      {crumbs.map(({ name, path }, index) => {
        if (index === crumbs.length - 1)
          return (
            <Typography
              key={index}
              color='primary'
              fontWeight={500}
              fontSize={12}
            >
              {name}
            </Typography>
          );

        return (
          <RouterLink key={index} color='neutral' to={path}>
            <Typography
              color='neutral'
              fontWeight={500}
              fontSize={12}
              sx={{
                ':hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {name}
            </Typography>
          </RouterLink>
        );
      })}
    </Breadcrumbs>
  );
}
