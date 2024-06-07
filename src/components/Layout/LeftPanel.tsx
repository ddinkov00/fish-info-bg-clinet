import { useEffect, useState } from 'react';

import PhishingIcon from '@mui/icons-material/Phishing';
import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';

import type { RouteValues } from '@/utils/constants';
import type { MenuItemEnum } from '@/utils/menuItem';
import { MenuItem, MenuItemData, mapPathToMenuItem } from '@/utils/menuItem';

import { AddPostForm } from '../Posts/AddPostForm';
import { CustomModal } from '../common/CustomModal';
import { MenuItemButton } from './MenuItemButton';

type LeftPanelProps = {
  xs: number;
};

export const LeftPanel = (props: LeftPanelProps) => {
  const { xs } = props;

  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState<MenuItemEnum>(MenuItem.Home);
  const [showAddPostModal, setShowAddPostModal] = useState(false);

  const smallVersion = useMediaQuery(`(max-width:1170px)`);

  const menuItems = MenuItemData();
  const path = router.asPath as RouteValues;

  useEffect(() => {
    setSelectedMenu(mapPathToMenuItem(path));
  }, [router]);

  const onModalClose = () => {
    setShowAddPostModal(false);
    setSelectedMenu(mapPathToMenuItem(path));
  };

  return (
    <>
      {showAddPostModal && (
        <CustomModal title="Качи публикация" isOpen={showAddPostModal} onCloseAction={onModalClose}>
          <AddPostForm />
        </CustomModal>
      )}

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
                    setShowAddPostModal={setShowAddPostModal}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
