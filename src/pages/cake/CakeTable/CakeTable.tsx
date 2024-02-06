import { QUERY_KEY } from '@/api/queryKeys';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table, Box, Input, Sheet } from '@mui/joy';
import { SearchOutlined } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import CakeTableRow from './CakeTableRow';
import { getCategories } from '@/api/category';
import Cover from '@/components/Cover/Cover';
import { CakeWithoutId, addCake } from '@/api/cake';

const initCake: CakeWithoutId = {
  name: '',
  desc: '',
  prices: [],
};

export default function CakeTable() {
  const queryClient = useQueryClient();
  const getCategoryQR = useQuery({
    queryKey: [QUERY_KEY.Categories],
    queryFn: getCategories,
  });

  const categories = getCategoryQR.data ?? [];

  const [searchWord, setSearchWord] = useState('');
  const [nameCake, setNewCake] = useState<CakeWithoutId>(initCake);

  // eslint-disable-next-line
  const addCakeMT = useMutation({
    mutationFn: () => addCake(nameCake),
    onSuccess: () => {
      setNewCake({ ...initCake });
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
