import { QUERY_KEY } from '@/api/queryKeys';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table, Box, Input, Sheet, Button } from '@mui/joy';
import { SearchOutlined } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import CakeTableRow from './CakeTableRow';
import { addCategory, getCategories } from '@/api/category';
import Cover from '@/components/Cover/Cover';

export default function CakeTable() {
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
              <CakeTableRow key={row.id} {...row} />
            ))}
          </tbody>
        </Table>

        <Cover visible={getCategoryQR.isFetching} />
      </Sheet>
    </>
  );
}
