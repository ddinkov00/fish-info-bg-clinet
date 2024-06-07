import { Grid } from '@mui/material';

type RightPanelProps = {
  xs: number;
};

export const RightPanel = (props: RightPanelProps) => {
  const { xs } = props;

  return <Grid item xs={xs} sx={{ borderLeft: 1, borderColor: '#dbdbdb' }} />;
};
