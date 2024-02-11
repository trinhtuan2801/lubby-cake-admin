import { QUERY_KEY } from '@/api/queryKeys';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Box, Input } from '@mui/joy';
import { SearchOutlined } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { CakeWithoutId, addCake, getCakes } from '@/api/cake';
import { normalizeStr } from '@/utils/string-utils';
import CakeTableRow from './CakeTableRow';

const initCake: CakeWithoutId = {
  name: '',
  desc: '',
  prices: [],
  images: [],
};

export default function CakeTable() {
  const queryClient = useQueryClient();
  const getCakeQR = useQuery({
    queryKey: [QUERY_KEY.Cakes],
    queryFn: getCakes,
  });

  const cakes = getCakeQR.data ?? [];

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
  }, [searchWord, cakes]);

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
        />
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
