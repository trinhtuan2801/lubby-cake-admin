import { getCategories } from '@/api/category';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableRow
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';


export default function CategoryTable() {
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        <TableBody>
          {data?.map(({ name, id }) => (
            <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell scope='row'>{name}</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
