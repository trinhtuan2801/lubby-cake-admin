import { getCategories } from '@/api/category';
import { QUERY_KEY } from '@/api/queryKeys';

import { useQuery } from '@tanstack/react-query';
import CategoryTableRow from './CategoryTableRow';
import { Table, Box, IconButton, Input, Sheet, Typography } from '@mui/joy';
import {
  AddOutlined,
  Delete,
  DeleteOutline,
  SearchOutlined,
} from '@mui/icons-material';
import { duplicateArray } from '@/utils/array-utils';
import { useMemo, useState } from 'react';

export default function CategoryTable() {
  const { data = [], isLoading } = useQuery({
    queryKey: [QUERY_KEY.Categories],
    queryFn: getCategories,
  });
  const [searchWord, setSearchWord] = useState('');

  const renderedData = useMemo(() => {
    let result = [];
    result = data.filter(({ name }) =>
      name.toLowerCase().includes(searchWord.toLowerCase()),
    );
    result = duplicateArray(result, 10);
    return result;
  }, [searchWord]);

  if (isLoading) return <></>;

  return (
    <Box flexGrow={1} display='flex' flexDirection='column'>
      <Box display='flex'>
        <Input placeholder='Thêm loại bánh' />
        <IconButton variant='outlined' color='primary' sx={{ ml: 1 }}>
          <AddOutlined />
        </IconButton>
      </Box>
      <Box display='flex' justifyContent='space-between' mt={1}>
        <Input placeholder='Tìm kiếm' startDecorator={<SearchOutlined />} />
      </Box>
      <Sheet
        sx={{
          flexGrow: 1,
          flexBasis: 0,
          overflow: 'auto',
          width: '100%',
          mt: 2,
          borderRadius: 6,
        }}
      >
        <Table
          stickyHeader
          sx={{
            width: '100%',
            tableLayout: 'initial',
          }}
          stripe='odd'
        >
          <colgroup>
            <col style={{ width: '100%' }} />
            <col />
          </colgroup>

          <tbody>
            {renderedData.map(({ id, name }) => (
              <tr key={id}>
                <td>
                  <Typography>{name}</Typography>
                </td>
                <td>
                  <IconButton variant='outlined' size='sm' color='neutral'>
                    <Delete />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
}
