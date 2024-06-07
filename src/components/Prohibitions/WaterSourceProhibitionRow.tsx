import {
  WaterSourceProhibitionResponse,
  WaterSourceProhibitionType,
} from '@/api/types/waterSourceProhibition';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MapIcon from '@mui/icons-material/Map';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { Box, Collapse, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';

type WaterSourceProhibitionRowProps = {
  row: WaterSourceProhibitionResponse;
};

export const WaterSourceProhibitionRow = (props: WaterSourceProhibitionRowProps) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);

  const type =
    row.type === WaterSourceProhibitionType.Prohibited ? 'пълна забрана' : 'хвани и пусни';

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.regionName}</TableCell>
        <TableCell align="right">{type}</TableCell>
        <TableCell align="center" sx={{ marginBottom: 0, borderBottom: 0 }}>
          <IconButton
            onMouseOver={() => setButtonHover(true)}
            onMouseOut={() => setButtonHover(false)}
          >
            {buttonHover ? <MapIcon color="primary" /> : <MapOutlinedIcon color="primary" />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography fontWeight="bold" fontSize={15}>
                Допълнителна информация:
              </Typography>
              <Typography fontSize={13}>{row.description}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
