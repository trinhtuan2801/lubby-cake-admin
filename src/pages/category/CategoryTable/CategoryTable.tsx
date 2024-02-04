import { QUERY_KEY } from '@/api/queryKeys';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table, Box, Input, Sheet, Button, Select, Option } from '@mui/joy';
import { SearchOutlined } from '@mui/icons-material';
import { PropsWithChildren, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import CategoryTableRow from './CategoryTableRow';
import { addCategory, getCategories } from '@/api/category';
import Cover from '@/components/Cover/Cover';
import { sorterCreator } from '@/utils/array-utils';

const sortMethods = {
  'name.asc': {
    name: 'Tên A -> Z',
    fn: sorterCreator('name', 'asc'),
  },
  'name.desc': {
    name: 'Tên Z -> A',
    fn: sorterCreator('name', 'desc'),
  },
};

type SortType = keyof typeof sortMethods;

export default function CategoryTable() {
  const queryClient = useQueryClient();
  const getCategoryQR = useQuery({
    queryKey: [QUERY_KEY.Categories],
    queryFn: getCategories,
  });

  const categories = getCategoryQR.data ?? [];

  const [searchWord, setSearchWord] = useState('');
  const [newCate, setNewCate] = useState('');
  const [sortType, setSortType] = useState<SortType>('name.asc');

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
    result = categories
      .filter(({ name }) =>
        name.toLowerCase().includes(searchWord.toLowerCase()),
      )
      .sort(sortMethods[sortType].fn);
    return result;
  }, [searchWord, categories, sortType]);

  return (
    <>
      <Box300px>
        <Input
          placeholder='Thêm loại bánh'
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
          disabled={!newCate || getCategoryQR.isPending}
          onClick={() => addCategoryMT.mutate()}
          loading={addCategoryMT.isPending}
        >
          Thêm
        </Button>
      </Box300px>
      <Box300px>
        <Input
          placeholder='Tìm kiếm'
          startDecorator={<SearchOutlined />}
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          fullWidth
        />
      </Box300px>
      <Box300px>
        <Select
          value={sortType}
          onChange={(_, value) => {
            value && setSortType(value);
          }}
        >
          {Object.entries(sortMethods).map(([key, value]) => (
            <Option key={key} value={key}>
              {value.name}
            </Option>
          ))}
        </Select>
      </Box300px>
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

        <Cover visible={getCategoryQR.isFetching} />
      </Sheet>
    </>
  );
}

const Box300px = ({ children }: PropsWithChildren) => (
  <Box
    display='flex'
    alignItems='center'
    columnGap={1}
    sx={{
      maxWidth: { xs: 'none', sm: '300px' },
    }}
  >
    {children}
  </Box>
);
