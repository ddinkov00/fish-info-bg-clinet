import { Button, Grid, Typography } from '@mui/material';

type CustomModalFooterProps = {
  closeButtonTitle: string;
  actionButtonTitle: string;

  onCloseAction: () => void;
  onModalAction: () => void;
};

const buttonsTextStyle = {
  fontSize: '16px',
  fontWeight: 600,
};

export const CustomModalFooter = (props: CustomModalFooterProps) => {
  const { closeButtonTitle, actionButtonTitle, onCloseAction, onModalAction } = props;

  return (
    <Grid item container justifyContent="end" alignItems="center" spacing={2}>
      <Grid item>
        <Button variant="outlined" size="medium" onClick={onCloseAction}>
          <Typography sx={{ ...buttonsTextStyle, color: '#173737B3' }}>
            {closeButtonTitle}
          </Typography>
        </Button>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          size="medium"
          sx={{ backgroundColor: 'primary' }}
          onClick={onModalAction}
        >
          <Typography sx={{ ...buttonsTextStyle, color: 'white' }}>{actionButtonTitle}</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};
