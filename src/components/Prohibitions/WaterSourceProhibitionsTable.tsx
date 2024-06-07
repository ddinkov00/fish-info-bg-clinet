import { useGetWaterSourceProhibitions } from '@/api/waterSourceProhibitionsController';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import { WaterSourceProhibitionRow } from './WaterSourceProhibitionRow';

export const WaterSourceProhibitionsTable = () => {
  const { data } = useGetWaterSourceProhibitions();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const tableData = data ?? [];

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="50px" />
              <TableCell align="left">Име</TableCell>
              <TableCell align="right">Регион</TableCell>
              <TableCell align="right">Тип</TableCell>
              <TableCell width="50px" />
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <WaterSourceProhibitionRow row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Редове на страница"
        page={page}
        onPageChange={(_, newPage) => handleChangePage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
