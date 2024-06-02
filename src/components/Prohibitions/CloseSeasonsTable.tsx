import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import dayjs from 'dayjs';

import { useGetCloseSeasons } from '@/api/closeSeasonController';
import { EMPTY_STRING } from '@/utils/constants';
import { mapDateToDayAndMonth } from '@/utils/dateHelper';

export const CloseSeasonsTable = () => {
  const queryResult = useGetCloseSeasons();
  const closeSeasonsData = queryResult.data ?? [];

  const tableData = closeSeasonsData.map((x) => {
    const dateNow = dayjs();
    const startDate = dayjs(x.startDate);
    const endDate = dayjs(x.endDate);

    let altitude = EMPTY_STRING;

    if (x.altitudeMin && !x.altitudeMax) {
      altitude = `от ${x.altitudeMin} м.`;
    }

    if (!x.altitudeMin && x.altitudeMax) {
      altitude = `до ${x.altitudeMax} м.`;
    }

    if (x.altitudeMin && x.altitudeMax) {
      altitude = `от ${x.altitudeMin} м. до ${x.altitudeMax} м.`;
    }

    return {
      id: x.id,
      name: x.fishSpeciesName,
      startDate: mapDateToDayAndMonth(startDate),
      endDate: mapDateToDayAndMonth(endDate),
      altitude,
      status: dateNow.isBefore(startDate) || dateNow.isAfter(endDate) ? true : false,
    };
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, width: 'fill' }} size="medium" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Вид</TableCell>
            <TableCell align="right">Надморска височина</TableCell>
            <TableCell align="right">Начало</TableCell>
            <TableCell align="right">Край</TableCell>
            <TableCell align="right">Статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.altitude}</TableCell>
              <TableCell align="right">{row.startDate}</TableCell>
              <TableCell align="right">{row.endDate}</TableCell>
              <TableCell align="right">
                {row.status ? (
                  <CheckCircleOutlineIcon color="success" />
                ) : (
                  <DoNotDisturbOnOutlinedIcon color="error" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
