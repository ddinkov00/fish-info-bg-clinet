import { ReactElement, useState } from 'react';

import SetMealIcon from '@mui/icons-material/SetMeal';
import WaterIcon from '@mui/icons-material/Water';
import { Box, Tab, Tabs } from '@mui/material';

import { Layout } from '@/components/Layout';
import { CustomTabPanel } from '@/components/common/CustomTabPanel';

const Prohibitions = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box maxWidth="935px" marginX="auto" display="flex" flexDirection="column">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab icon={<SetMealIcon />} iconPosition="start" disableRipple label="Видове риби" />
          <Tab icon={<WaterIcon />} iconPosition="start" disableRipple label="Водоеми" />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
};

Prohibitions.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Prohibitions;
