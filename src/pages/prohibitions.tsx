import type { ReactElement } from 'react';
import { useState } from 'react';

import SetMealIcon from '@mui/icons-material/SetMeal';
import WaterIcon from '@mui/icons-material/Water';
import { Box, Tab, Tabs } from '@mui/material';

import { Layout } from '@/components/Layout';
import { CloseSeasonsTable } from '@/components/Prohibitions/CloseSeasonsTable';
import type { MapMarker, MapModalConfig } from '@/components/Prohibitions/MapsModal';
import { MapsModal } from '@/components/Prohibitions/MapsModal';
import { WaterSourceProhibitionsTable } from '@/components/Prohibitions/WaterSourceProhibitionsTable';
import { CustomTabPanel } from '@/components/common/CustomTabPanel';

const Prohibitions = () => {
  const [value, setValue] = useState(0);
  const [mapConfig, setMapConfig] = useState<MapModalConfig | undefined>();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {mapConfig !== undefined && <MapsModal config={mapConfig} setConfig={setMapConfig} />}

      <Box maxWidth="1000px" marginX="auto" display="flex" flexDirection="column">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab icon={<SetMealIcon />} iconPosition="start" disableRipple label="Видове риби" />
            <Tab icon={<WaterIcon />} iconPosition="start" disableRipple label="Водоеми" />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <CloseSeasonsTable />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <WaterSourceProhibitionsTable
            openMap={(title: string, markers: MapMarker[]) => {
              setMapConfig({ title, markers });
            }}
          />
        </CustomTabPanel>
      </Box>
    </>
  );
};

Prohibitions.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Prohibitions;
