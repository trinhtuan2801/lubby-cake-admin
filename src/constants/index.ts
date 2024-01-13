import { CakeRounded, CategoryRounded } from '@mui/icons-material';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export enum COLLECTION {
  Users = 'users',
  Cakes = 'cakes',
  Categories = 'categories',
}

export interface RouteAlias {
  name: string;
  subRoutes?: {
    [key: string]: RouteAlias;
  };
}

export const routeAliases: RouteAlias = {
  name: 'root',
  subRoutes: {
    categories: {
      name: 'Loại bánh',
    },
  },
};

interface SidebarTab {
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  name: string;
  path: string;
}

export const SidebarTabs: SidebarTab[] = [
  {
    Icon: CategoryRounded,
    name: 'Loại bánh',
    path: '/categories',
  },
  {
    Icon: CakeRounded,
    name: 'Danh sách bánh',
    path: '/cakes',
  },
];
