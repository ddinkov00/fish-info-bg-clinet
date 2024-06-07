import { DialogContent, Grid } from '@mui/material';

import { ModalWrapper } from './ModalWrapper';

type CustomModalProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;

  onCloseAction: () => void;
};

export const CustomModal = (props: CustomModalProps) => {
  const { isOpen, onCloseAction, title, children } = props;

  return (
    <ModalWrapper modalTitle={title} modalWidth={448} open={isOpen} onClose={onCloseAction}>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </DialogContent>
    </ModalWrapper>
  );
};
