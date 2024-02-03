import { QUERY_KEY } from '@/api/queryKeys';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import CategoryTableRow from './CategoryTableRow';
import { addCategory, getCategories } from '@/api/category';

export default function CategoryTable() {
  const queryClient = useQueryClient();
  const getCategoryQR = useQuery({
    queryKey: [QUERY_KEY.Categories],
    queryFn: getCategories,
  });

  const categories = getCategoryQR.data ?? [];

  const [searchWord, setSearchWord] = useState('');
  const [newCate, setNewCate] = useState('');

  const addCategoryMT = useMutation({
    mutationFn: () => addCategory(newCate),
    onSuccess: () => {
      setNewCate('');
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.Categories],
      });
    },
    onError: () => {
      toast.error('Lỗi khi thêm');
    },
  });

  const renderedData = useMemo(() => {
    let result = [];
    result = categories.filter(({ name }) =>
      name.toLowerCase().includes(searchWord.toLowerCase()),
    );
    return result;
  }, [searchWord, categories]);

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
              addCategoryMT.mutate();
            }
          }}
          fullWidth
        />
        <Button
          variant='solid'
          color='primary'
          size='sm'
          disabled={!newCate || getCategoryQR.isPending}
          onClick={() => addCategoryMT.mutate()}
          loading={addCategoryMT.isPending}
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
          minHeight: '300px',
        }}
        variant='outlined'
      >
        <Table
          stickyHeader
          sx={{
            width: '100%',
            tableLayout: 'initial',
          }}
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
        <Box
          position='absolute'
          top={0}
          left={0}
          width='100%'
          height='100%'
          bgcolor={(theme) =>
            theme.palette.mode === 'light' ? 'white' : 'black'
          }
          sx={{ opacity: 0.5 }}
          display={getCategoryQR.isFetching ? 'block' : 'none'}
        />
      </Sheet>
    </>
  );
}
