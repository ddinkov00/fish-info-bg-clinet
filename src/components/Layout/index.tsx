import { ReactElement } from 'react';

import { Grid } from '@mui/material';

import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';

export const Layout = ({ children }: { children: ReactElement }) => {
  const shouldShowRightPanel = false;

  return (
    <Grid container height="100vh">
      <LeftPanel xs={2} />

      <Grid item paddingTop="30px" xs={shouldShowRightPanel ? 7 : 10}>
        {children}
      </Grid>

      {shouldShowRightPanel && <RightPanel xs={3} />}
    </Grid>
  );
};
