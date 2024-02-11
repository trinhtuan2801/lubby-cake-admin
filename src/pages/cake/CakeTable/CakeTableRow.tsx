import { Cake, CakeWithoutId, deleteCake, updateCake } from '@/api/cake';
import { QUERY_KEY } from '@/api/queryKeys';
import MyModal from '@/components/MyModal/MyModal';
import { numberWithCommas } from '@/utils/string-utils';
import {
  DeleteForever,
  Edit,
  ExpandMoreOutlined,
  MoreVertOutlined,
} from '@mui/icons-material';
import {
  AspectRatio,
  Box,
  Dropdown,
  IconButton,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from '@mui/joy';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface CakeTableRowProps extends Cake {}

export default function CakeTableRow(props: CakeTableRowProps) {
  const { id, name, images, prices, desc } = props;
  const queryClient = useQueryClient();
  const [openEdit, setOpenEdit] = useState(false);
  const [newData, setNewData] = useState<Partial<CakeWithoutId>>({});
  const [openDelete, setOpenDelete] = useState(false);
  const [isExpandDesc, setIsExpandDesc] = useState(false);

  // eslint-disable-next-line
  const updateCakeMT = useMutation({
    mutationFn: () => updateCake(id, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.Cakes],
      });
      setOpenEdit(false);
    },
    onError: () => {
      toast.error('Lỗi khi cập nhật');
    },
  });

  const deleteCakeMT = useMutation({
    mutationFn: () => deleteCake(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.Cakes],
      });
      setOpenDelete(false);
    },
    onError: () => {
      toast.error('Lỗi khi xóa');
    },
  });

  useEffect(() => {
    if (openEdit) setNewData(props);
  }, [openEdit]);

  return (
    <Box bgcolor='background.level1' borderRadius={6} p={0.8}>
      <Box display='flex'>
        <Box>
          {images[0] && (
            <AspectRatio ratio='1' sx={{ width: 50, borderRadius: 6 }}>
              <img src={images[0]} />
            </AspectRatio>
          )}
        </Box>
        <Box pl={1} flexGrow={1} overflow='hidden'>
          <Box display='flex' flexDirection='column'>
            <Typography
              level='body-sm'
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                verticalAlign: 'text-top',
              }}
              fontWeight='bold'
              color='primary'
            >
              {name}
            </Typography>
            <Box>
              {prices.map(({ size, price, oldPrice }, index) => (
                <Box key={index} display='flex' gap={1}>
                  <Typography level='body-sm' fontWeight='bold'>
                    {size}
                  </Typography>
                  <Typography level='body-sm' color='success'>
                    {numberWithCommas(price)}đ
                  </Typography>
                  {oldPrice && (
                    <Typography level='body-sm'>
                      ({numberWithCommas(oldPrice)}đ)
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
          {isExpandDesc && <Typography level='body-sm'>{desc}</Typography>}
        </Box>
        <Box
          flexShrink={0}
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
        >
          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{ root: { size: 'sm' } }}
            >
              <MoreVertOutlined />
            </MenuButton>
            <Menu placement='bottom-end'>
              <MenuItem onClick={() => setOpenEdit(true)}>
                <ListItemDecorator>
                  <Edit />
                </ListItemDecorator>{' '}
                Sửa
              </MenuItem>
              <MenuItem color='danger' onClick={() => setOpenDelete(true)}>
                <ListItemDecorator sx={{ color: 'inherit' }}>
                  <DeleteForever />
                </ListItemDecorator>{' '}
                Xóa
              </MenuItem>
            </Menu>
          </Dropdown>
          <IconButton
            size='sm'
            onClick={() => setIsExpandDesc((prev) => !prev)}
          >
            <ExpandMoreOutlined
              sx={{
                rotate: isExpandDesc ? '180deg' : '0deg',
                transition: 'rotate 0.2s ease-out',
              }}
            />
          </IconButton>
        </Box>
      </Box>

      <MyModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        title='Xóa'
        OkButtonLabel='Xóa'
        OkButtonProps={{
          color: 'danger',
          loading: deleteCakeMT.isPending,
        }}
        onOk={() => {
          deleteCakeMT.mutate();
        }}
      >
        <Typography>
          Bạn muốn xóa&nbsp;
          <Typography component='span' color='danger'>
            {name}
          </Typography>
          &nbsp;?
        </Typography>
      </MyModal>
    </Box>
  );
}
