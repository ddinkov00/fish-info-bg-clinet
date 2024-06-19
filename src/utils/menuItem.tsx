import type { Dispatch, ReactNode, SetStateAction } from 'react';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import DoNotTouchOutlinedIcon from '@mui/icons-material/DoNotTouchOutlined';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Router from 'next/router';

import type { RouteValues, Routes } from './constants';

export const MenuItem = {
  Home: 'Home',
  Prohibitions: 'Prohibitions',
  AddPost: 'AddPost',
} as const;

export const MenuItemData = () => Array.from(Object.values(MenuItem));

type Key = keyof typeof MenuItem;
export type MenuItemEnum = (typeof MenuItem)[Key];

type MenuItemConfig = {
  [key in MenuItemEnum]: {
    text: string;
    icon: ReactNode;
    iconSelected: ReactNode;
    onClick: () => void;
    route?: keyof typeof Routes;
  };
};

export const getMenuItemConfig = (
  setShowAddPostModal: Dispatch<SetStateAction<boolean>>,
): MenuItemConfig => ({
  Home: {
    text: 'Начало',
    icon: <HomeOutlinedIcon />,
    iconSelected: <HomeIcon />,
    onClick: () => Router.push('home'),
    route: 'home',
  },
  Prohibitions: {
    text: 'Забрани',
    icon: <DoNotTouchOutlinedIcon />,
    iconSelected: <DoNotTouchIcon />,
    onClick: () => Router.push('prohibitions'),
    route: 'prohibitions',
  },
  AddPost: {
    text: 'Публикувай',
    icon: <AddCircleOutlineOutlinedIcon />,
    iconSelected: <AddCircleOutlinedIcon />,
    onClick: () => setShowAddPostModal(true),
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
