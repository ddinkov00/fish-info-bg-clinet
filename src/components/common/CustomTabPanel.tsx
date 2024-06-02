import { Box } from '@mui/material';

type TabPanelProps = {
  children: React.ReactNode;
  index: number;
  value: number;
};

export const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ backgroundColor: 'red' }}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
};
