import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';

import { Box, Dialog, DialogTitle, IconButton } from '@mui/material';

type ModalWrapperProps = {
  open: boolean;
  onClose: () => void;
  modalWidth: string | number;
  modalTitle: string;
  children: React.ReactNode;
};

export const ModalWrapper = ({
  children,
  open,
  modalWidth,
  modalTitle,
  onClose,
}: ModalWrapperProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Dialog
      sx={{
        zIndex: 2000,
      }}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: '2px', minWidth: modalWidth, width: '100%' } }}
    >
      <DialogTitle
        color="black"
        fontFamily="fontLora"
        fontSize={20}
        fontStyle="normal"
        fontWeight="400"
      >
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{modalTitle}</Box>

          <Box
            onMouseEnter={() => {
              setHovered(true);
            }}
            onMouseLeave={() => {
              setHovered(false);
            }}
          >
            <IconButton disableRipple onClick={onClose}>
              <CloseIcon sx={{ color: hovered ? '#17373766' : '#173737B3' }} />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      {children}
    </Dialog>
  );
};
