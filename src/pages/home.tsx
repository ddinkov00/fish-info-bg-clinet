import type { ReactElement } from 'react';

import { Box } from '@mui/material';

import { Layout } from '@/components/Layout';

const Home = () => {
  return (
    <Box maxWidth="1000px" marginX="auto" display="flex" flexDirection="column" alignItems="center">
      {/* <CustomImageList /> */}
    </Box>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
