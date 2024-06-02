import { Dispatch, SetStateAction } from 'react';

import { Button, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { MenuItemEnum, getMenuItemConfig } from '@/utils/menuItem';

type MenuItemButtonProps = {
  menuKey: MenuItemEnum;
  selected: MenuItemEnum;
  setSelected: Dispatch<SetStateAction<MenuItemEnum>>;
  smallVersion: boolean;
};

export const MenuItemButton = (props: MenuItemButtonProps) => {
  const { menuKey, selected, setSelected, smallVersion } = props;

  const router = useRouter();

  const isSelected = selected === menuKey;
  const config = getMenuItemConfig()[menuKey];

  const onClick = () => {
    setSelected(menuKey);
    router.push(config.route);
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
