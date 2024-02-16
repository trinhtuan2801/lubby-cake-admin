import { QUERY_KEY } from '@/api/queryKeys';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Box, Chip, IconButton, Input, Skeleton, Typography } from '@mui/joy';
import {
  Add,
  CheckOutlined,
  ClearOutlined,
  FilterAltOutlined,
  SearchOutlined,
  SentimentDissatisfiedOutlined,
} from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { CakeWithoutId, addCake, getCakes } from '@/api/cake';
import { normalizeStr } from '@/utils/string-utils';
import CakeTableRow from './CakeTableRow';
import { getCategories } from '@/api/category';
import { isAinB } from '@/utils/array-utils';
import AddCakeModal from './AddCakeModal/AddCakeModal';

const initCake: CakeWithoutId = {
  name: '',
  desc: '',
  prices: [],
  images: [],
  categoryIds: [],
  categories: [],
};

export default function CakeTable() {
  const queryClient = useQueryClient();
  const getCategoryQR = useQuery({
    queryKey: [QUERY_KEY.Categories],
    queryFn: getCategories,
  });
  const categories = getCategoryQR.data;

  const getCakeQR = useQuery({
    queryKey: [QUERY_KEY.Cakes],
    queryFn: () => getCakes(categories),
    enabled: !!categories,
  });
  const cakes = getCakeQR.data;

  const [searchWord, setSearchWord] = useState('');
  const [newCake, setNewCake] = useState<CakeWithoutId>(initCake);

  const [showFilter, setShowFilter] = useState(false);
  const [checkedChips, setCheckedChips] = useState<string[]>([]);

  const [openAddModal, setOpenAddModal] = useState(false);

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
    if (!cakes) return [];
    let result = [];
    result = cakes.filter(({ name }) =>
      normalizeStr(name).includes(normalizeStr(searchWord)),
    );
    if (showFilter)
      result = result.filter(({ categoryIds }) =>
        isAinB(checkedChips, categoryIds),
      );
    return result;
  }, [searchWord, cakes, checkedChips, showFilter]);

  const onClickChip = (id: string) => {
    const newCheckedChips = checkedChips.slice();
    const index = newCheckedChips.indexOf(id);
    if (index === -1) {
      newCheckedChips.push(id);
    } else {
      newCheckedChips.splice(index, 1);
    }
    setCheckedChips(newCheckedChips);
  };

  return (
    <>
      <Box display='flex' gap={1}>
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
        <IconButton
          variant={showFilter ? 'solid' : 'outlined'}
          color={showFilter ? 'primary' : 'neutral'}
          onClick={() => setShowFilter((prev) => !prev)}
          disabled={!cakes?.length}
        >
          <FilterAltOutlined />
        </IconButton>
        <IconButton variant='outlined' onClick={() => setOpenAddModal(true)}>
          <Add />
        </IconButton>
      </Box>
      <Box display={showFilter ? 'flex' : 'none'} gap={0.5}>
        {categories?.map((cate) => {
          const checked = checkedChips.includes(cate.id);
          return (
            <Chip
              key={cate.id}
              variant={checked ? 'solid' : 'outlined'}
              color={checked ? 'primary' : 'neutral'}
              startDecorator={
                checked && (
                  <CheckOutlined sx={{ zIndex: 1, pointerEvents: 'none' }} />
                )
              }
              onClick={() => onClickChip(cate.id)}
            >
              {cate.name}
            </Chip>
          );
        })}
      </Box>
      <Box
        flexGrow={1}
        flexBasis={0}
        overflow='auto'
        minHeight='300px'
        display='flex'
        flexDirection='column'
        gap={1}
        mt={0.5}
      >
        {renderedData.map((row) => (
          <CakeTableRow key={row.id} {...row} />
        ))}
        {getCakeQR.isPending &&
          Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                variant='rectangular'
                sx={{ borderRadius: '6px', minHeight: '100px' }}
              />
            ))}
        {!getCakeQR.isPending &&
          !renderedData.length &&
          ((showFilter && checkedChips.length) || searchWord) && (
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              color='danger'
            >
              <SentimentDissatisfiedOutlined />
              &nbsp;Không tìm thấy bánh phù hợp
            </Typography>
          )}
      </Box>
      <AddCakeModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />
    </>
  );
}
