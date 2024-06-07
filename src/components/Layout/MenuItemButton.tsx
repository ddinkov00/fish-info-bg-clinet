import type { Dispatch, SetStateAction } from 'react';

import { Button, IconButton, Typography } from '@mui/material';

import type { MenuItemEnum } from '@/utils/menuItem';
import { getMenuItemConfig } from '@/utils/menuItem';

type MenuItemButtonProps = {
  menuKey: MenuItemEnum;
  selected: MenuItemEnum;
  setShowAddPostModal: Dispatch<SetStateAction<boolean>>;
  setSelected: Dispatch<SetStateAction<MenuItemEnum>>;
  smallVersion: boolean;
};

export const MenuItemButton = (props: MenuItemButtonProps) => {
  const { menuKey, selected, setShowAddPostModal, setSelected, smallVersion } = props;

  const isSelected = selected === menuKey;
  const config = getMenuItemConfig(setShowAddPostModal)[menuKey];

  const onClick = () => {
    setSelected(menuKey);
    config.onClick();
  };

  if (smallVersion) {
    return (
      <IconButton
        size="large"
        disableRipple
        color="primary"
        onClick={onClick}
        style={{ backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0 }}
      >
        {isSelected ? config.iconSelected : config.icon}
      </IconButton>
    );
  }

  return (
    <Button
      variant="text"
      disableRipple
      style={{ backgroundColor: 'transparent' }}
      startIcon={isSelected ? config.iconSelected : config.icon}
      onClick={onClick}
    >
      <Typography fontWeight={isSelected ? 'bold' : 'regular'}>{config.text}</Typography>
    </Button>
  );
};
