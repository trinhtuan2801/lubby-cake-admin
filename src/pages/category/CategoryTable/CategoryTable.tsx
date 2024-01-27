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
import { Box, IconButton, Sheet, Typography } from '@mui/joy';
import { DeleteOutline } from '@mui/icons-material';

export default function CategoryTable() {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.Categories],
    queryFn: getCategories,
  });

  console.log({ data });

  return (
    <Sheet
      className='OrderTableContainer'
      sx={{ height: 500, overflow: 'auto', width: '100%' }}
    >
      <Table
        stickyHeader
        sx={{
          width: '100%',
        }}
      >
        <colgroup>
          <col style={{ width: '100%', textAlign: 'left' }} />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Tên</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map(({ id, name }) => (
            <tr key={id}>
              <td>
                <Typography level='body-xs'>{name}</Typography>
              </td>
              <td>
                <IconButton>
                  <DeleteOutline />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
