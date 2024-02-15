import { QUERY_KEY } from '@/api/queryKeys';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Box, IconButton, Input } from '@mui/joy';
import { Add, ClearOutlined, SearchOutlined } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { CakeWithoutId, addCake, getCakes } from '@/api/cake';
import { normalizeStr } from '@/utils/string-utils';
import CakeTableRow from './CakeTableRow';
import { getCategories } from '@/api/category';

const initCake: CakeWithoutId = {
  name: '',
  desc: '',
  prices: [],
  images: [],
  categoryIds: [],
};

export default function CakeTable() {
  const queryClient = useQueryClient();
  const getCategoryQR = useQuery({
    queryKey: [QUERY_KEY.Categories],
    queryFn: getCategories,
  });
  const getCakeQR = useQuery({
    queryKey: [QUERY_KEY.Cakes],
    queryFn: () => getCakes(getCategoryQR.data ?? []),
    enabled: !!getCategoryQR.data,
  });

  const cakes = getCakeQR.data ?? [];
  const categories = getCategoryQR.data ?? [];

  const [searchWord, setSearchWord] = useState('');
  const [newCake, setNewCake] = useState<CakeWithoutId>(initCake);

  // eslint-disable-next-line
  const addCakeMT = useMutation({
    mutationFn: () => addCake(newCake),
    onSuccess: () => {
      setNewCake({ ...initCake });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.Cakes],
      });
    },
    onError: () => {
      toast.error('Lỗi khi thêm');
    },
  });

  const renderedData = useMemo(() => {
    let result = [];
    result = cakes.filter(({ name }) =>
      normalizeStr(name).includes(normalizeStr(searchWord)),
    );

    return result;
  }, [searchWord, cakes, categories]);

  return (
    <>
      <Box display='flex'>
        <Input
          placeholder='Tìm kiếm'
          startDecorator={<SearchOutlined />}
          size='md'
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          fullWidth
          endDecorator={
            searchWord ? (
              <IconButton
                size='sm'
                onClick={() => setSearchWord('')}
                sx={{ borderRadius: '50%' }}
              >
                <ClearOutlined />
              </IconButton>
            ) : null
          }
        />
        <IconButton variant='solid' color='primary' sx={{ ml: 1 }}>
          <Add />
        </IconButton>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          flexBasis: 0,
          overflow: 'auto',
          width: '100%',
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {renderedData.map((row) => (
          <CakeTableRow key={row.id} {...row} />
        ))}
      </Box>
    </>
  );
}
