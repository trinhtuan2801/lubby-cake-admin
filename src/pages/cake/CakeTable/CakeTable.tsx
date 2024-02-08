import { QUERY_KEY } from '@/api/queryKeys';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table, Box, Input, Sheet } from '@mui/joy';
import { SearchOutlined } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import CakeTableRow from './CakeTableRow';
import Cover from '@/components/Cover/Cover';
import { CakeWithoutId, addCake, getCakes } from '@/api/cake';
import { normalizeStr } from '@/utils/string-utils';

const initCake: CakeWithoutId = {
  name: '',
  desc: '',
  prices: [],
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
            '& td': {
              verticalAlign: 'top',
            },
            '& tr > *:first-child': {
              position: 'sticky',
              left: 0,
              bgcolor: 'background.surface',
            },
            '& tr > *:last-child': {
              position: 'sticky',
              right: 0,
              bgcolor: 'var(--TableCell-headBackground)',
            },
            '& col:first-child': {
              minWidth: { xs: '100px', sm: '200px' },
            },
          }}
          borderAxis='x'
        >
          <colgroup>
            <col />
            <col style={{ width: '100%' }} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>
                <Box pl={1}>Tên</Box>
              </th>
              <th>Giá</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {renderedData.map((row) => (
              <CakeTableRow key={row.id} {...row} />
            ))}
          </tbody>
        </Table>

        <Cover visible={getCakeQR.isFetching} />
      </Sheet>
    </>
  );
}
