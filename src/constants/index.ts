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
  subRoutes?: Record<string, RouteAlias>;
}

export const routeAliases: RouteAlias = {
  name: 'root',
  subRoutes: {
    categories: {
      name: 'Loại bánh',
    },
    cakes: {
      name: 'Danh sách bánh',
    },
  },
};

interface SidebarTab {
  Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
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

export enum CssVar {
  HEADER_HEIGHT = '--Header-height',
  SIDEBAR_WIDTH = '--Sidebar-width',
  SIDE_NAVIGATION_SLIDE_IN = '--SideNavigation-slideIn',
  PAGE_WIDTH = '--Page-width',
}

export enum SearchParam {
  CATEGORY = 'cate',
}
