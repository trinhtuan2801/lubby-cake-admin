import { addCategory, deleteCategory, getCategories } from '@/api/category';
import { QUERY_KEY } from '@/api/queryKeys';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  Box,
  IconButton,
  Input,
  Sheet,
  Typography,
  Button,
} from '@mui/joy';
import { AddOutlined, Delete, Edit, SearchOutlined } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import CategoryTableRow from './CategoryTableRow';

export default function CategoryTable() {
  const queryClient = useQueryClient();
  const { data = [], isLoading } = useQuery({
    queryKey: [QUERY_KEY.Categories],
    queryFn: getCategories,
  });
  const [searchWord, setSearchWord] = useState('');
  const [newCate, setNewCate] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const renderedData = useMemo(() => {
    let result = [];
    result = data.filter(({ name }) =>
      name.toLowerCase().includes(searchWord.toLowerCase()),
    );
    return result;
  }, [searchWord, data]);

  const addCate = () => {
    addCategory(newCate)
      .then(() => {
        setNewCate('');
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.Categories],
        });
      })
      .catch(() => {
        toast.error('Lỗi khi thêm');
      });
  };

  return (
    <>
      <Box
        display='flex'
        sx={{
          maxWidth: { xs: 'none', sm: '300px' },
        }}
      >
        <Input
          placeholder='Thêm loại bánh'
          size='md'
          value={newCate}
          onChange={(e) => setNewCate(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && newCate) {
              addCate();
            }
          }}
          fullWidth
        />
        <Button
          variant='solid'
          color='primary'
          size='sm'
          disabled={!newCate}
          onClick={addCate}
          loading={isLoading}
          sx={{ ml: 1 }}
        >
          Thêm
        </Button>
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        sx={{
          maxWidth: { xs: 'none', sm: '300px' },
        }}
      >
        <Input
          placeholder='Tìm kiếm'
          startDecorator={<SearchOutlined />}
          size='md'
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          fullWidth
        />
      </Box>
      <Sheet
        sx={{
          flexGrow: 1,
          flexBasis: 0,
          overflow: 'auto',
          width: '100%',
          borderRadius: 6,
        }}
        variant='outlined'
      >
        <Table
          stickyHeader
          sx={{
            width: '100%',
            tableLayout: 'initial',
          }}
          size='sm'
        >
          <colgroup>
            <col style={{ width: '100%' }} />
            <col />
          </colgroup>

          <tbody>
            {renderedData.map((row) => (
              <CategoryTableRow key={row.id} {...row} />
            ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  );
}
