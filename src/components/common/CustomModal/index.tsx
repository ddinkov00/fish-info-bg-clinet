import { Box, DialogContent, Grid } from '@mui/material';

import { CustomModalFooter } from './CustomModalFooter';
import { ModalWrapper } from './ModalWrapper';

type CustomModalProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;

  closeButtonTitle: string;
  actionButtonTitle: string;

  onCloseAction: () => void;
  onCloseButtonAction: () => void;
  onModalAction: () => void;
};

export const CustomModal = (props: CustomModalProps) => {
  const {
    isOpen,
    onCloseAction,
    onCloseButtonAction,
    onModalAction,
    title,
    children,
    actionButtonTitle,
    closeButtonTitle,
  } = props;

  return (
    <ModalWrapper modalTitle={title} modalWidth={448} open={isOpen} onClose={onCloseAction}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>

        <Box mt={3}>
          <CustomModalFooter
            actionButtonTitle={actionButtonTitle}
            closeButtonTitle={closeButtonTitle}
            onCloseAction={onCloseButtonAction}
            onModalAction={onModalAction}
          />
        </Box>
      </DialogContent>
    </ModalWrapper>
  );
};
