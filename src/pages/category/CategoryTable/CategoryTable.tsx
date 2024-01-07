import { getCategories } from '@/api/category';
import { QUERY_KEY } from '@/api/queryKeys';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import CategoryTableRow from './CategoryTableRow';

export default function CategoryTable() {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.Categories],
    queryFn: getCategories,
  });

  return (
    <div
      style={{
        maxHeight: '500px',
        paddingBottom: 4
      }}
    >
      <TableContainer component={Paper}>
        <Table size='small'>
          <TableBody>
            {data?.map((row) => (
              <CategoryTableRow key={row.id} {...row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
