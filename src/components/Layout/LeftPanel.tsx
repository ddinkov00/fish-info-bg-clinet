import { useEffect, useState } from 'react';

import PhishingIcon from '@mui/icons-material/Phishing';
import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';

import { RouteValues } from '@/utils/constants';
import { MenuItem, MenuItemData, MenuItemEnum, mapPathToMenuItem } from '@/utils/menuItem';

import { MenuItemButton } from './MenuItemButton';

type LeftPanelProps = {
  xs: number;
};

export const LeftPanel = (props: LeftPanelProps) => {
  const { xs } = props;

  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState<MenuItemEnum>(MenuItem.Home);

  const smallVersion = useMediaQuery(`(max-width:1170px)`);

  const menuItems = MenuItemData();

  useEffect(() => {
    const path = router.asPath as RouteValues;
    setSelectedMenu(mapPathToMenuItem(path));
  }, [router]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      paddingX={smallVersion ? 0 : '24px'}
      paddingTop="33px"
      item
      xs={xs}
      sx={{ borderRight: 1, borderColor: '#dbdbdb' }}
    >
      <Grid
        item
        container
        alignItems={smallVersion ? 'center' : 'flex-start'}
        direction="column"
        gap="30px"
      >
        <Grid item>
          <Button disableRipple style={{ backgroundColor: 'transparent' }} variant="text">
            {smallVersion ? (
              <PhishingIcon sx={{ width: 50, height: 50, paddingX: 0 }} />
            ) : (
              <Typography variant="h6" noWrap color="primary" fontFamily="Seymour One">
                FishInfo
              </Typography>
            )}
          </Button>
        </Grid>

        <Grid
          container
          item
          alignItems={smallVersion ? 'center' : 'flex-start'}
          direction="column"
          gap="10px"
        >
          {menuItems.map((x) => {
            return (
              <Grid key={`menu-item-${x}`} item>
                <MenuItemButton
                  smallVersion={smallVersion}
                  menuKey={x}
                  selected={selectedMenu}
                  setSelected={setSelectedMenu}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};