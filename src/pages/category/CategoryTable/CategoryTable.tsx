import { QUERY_KEY } from '@/api/queryKeys';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  Box,
  Input,
  Sheet,
  Button,
  Select,
  Option,
  IconButton,
} from '@mui/joy';
import { ClearOutlined, SearchOutlined } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import CategoryTableRow from './CategoryTableRow';
import { CategoryWithoutId, addCategory, getCategories } from '@/api/category';
import Cover from '@/components/Cover/Cover';
import { sorterCreator } from '@/utils/array-utils';
import { normalizeStr } from '@/utils/string-utils';

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

const initCategory: CategoryWithoutId = {
  name: '',
};

export default function CategoryTable() {
  const queryClient = useQueryClient();
  const getCategoryQR = useQuery({
    queryKey: [QUERY_KEY.Categories],
    queryFn: getCategories,
  });

  const categories = getCategoryQR.data ?? [];

  const [searchWord, setSearchWord] = useState('');
  const [newCate, setNewCate] = useState<CategoryWithoutId>(initCategory);
  const [sortType, setSortType] = useState<SortType>('name.asc');

  const addCategoryMT = useMutation({
    mutationFn: () => addCategory(newCate),
    onSuccess: () => {
      setNewCate({ ...initCategory });
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
        normalizeStr(name).includes(normalizeStr(searchWord)),
      )
      .sort(sortMethods[sortType].fn);
    return result;
  }, [searchWord, categories, sortType]);

  return (
    <>
      <Box display='flex' gap={1}>
        <Input
          placeholder='Thêm loại bánh'
          value={newCate.name}
          onChange={(e) =>
            setNewCate((prev) => ({ ...prev, name: e.target.value }))
          }
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
          disabled={!newCate.name || getCategoryQR.isPending}
          onClick={() => addCategoryMT.mutate()}
          loading={addCategoryMT.isPending}
        >
          Thêm
        </Button>
      </Box>
      <Box>
        <Input
          placeholder='Tìm kiếm'
          startDecorator={<SearchOutlined />}
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
      </Box>
      <Box>
        <Select
          sx={{ width: 'fit-content' }}
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

        <Cover visible={getCategoryQR.isFetching} />
      </Sheet>
    </>
  );
}
