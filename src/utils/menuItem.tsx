import { ReactNode } from 'react';

import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import DoNotTouchOutlinedIcon from '@mui/icons-material/DoNotTouchOutlined';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import { RouteValues, Routes } from './constants';

export const MenuItem = {
  Home: 'Home',
  Prohibitions: 'Prohibitions',
} as const;

export const MenuItemData = () => Array.from(Object.values(MenuItem));

type Key = keyof typeof MenuItem;
export type MenuItemEnum = (typeof MenuItem)[Key];

type MenuItemConfig = {
  [key in MenuItemEnum]: {
    text: string;
    icon: ReactNode;
    iconSelected: ReactNode;
    route: keyof typeof Routes;
  };
};

export const getMenuItemConfig = (): MenuItemConfig => ({
  Home: {
    text: 'Начало',
    icon: <HomeOutlinedIcon />,
    iconSelected: <HomeIcon />,
    route: 'home',
  },
  Prohibitions: {
    text: 'Забрани',
    icon: <DoNotTouchOutlinedIcon />,
    iconSelected: <DoNotTouchIcon />,
    route: 'prohibitions',
  },
});

export const mapPathToMenuItem = (path: RouteValues): MenuItemEnum => {
  switch (path) {
    case '/home':
      return MenuItem.Home;
    case '/prohibitions':
      return MenuItem.Prohibitions;
    default:
      return MenuItem.Home;
  }
};
