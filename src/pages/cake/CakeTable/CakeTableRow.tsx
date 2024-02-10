import { Cake, CakeWithoutId, deleteCake, updateCake } from '@/api/cake';
import { QUERY_KEY } from '@/api/queryKeys';
import MyModal from '@/components/MyModal/MyModal';
import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/joy';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface CakeTableRowProps extends Cake {}

export default function CakeTableRow(props: CakeTableRowProps) {
  const { id, name } = props;
  const queryClient = useQueryClient();
  const [openEdit, setOpenEdit] = useState(false);
  const [newData, setNewData] = useState<Partial<CakeWithoutId>>({});
  const [openDelete, setOpenDelete] = useState(false);

  // eslint-disable-next-line
  const updateCakeMT = useMutation({
    mutationFn: () => updateCake(id, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.Categories],
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
        queryKey: [QUERY_KEY.Categories],
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
    <>
      <Box display='flex'>
        <Box>
          <img />
        </Box>
        <IconButton variant='plain' size='sm' onClick={() => setOpenEdit(true)}>
          <Edit />
        </IconButton>
        <IconButton
          variant='plain'
          size='sm'
          color='danger'
          onClick={() => setOpenDelete(true)}
        >
          <Delete />
        </IconButton>
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
          Bạn muốn xóa <b>{name}</b> ?
        </Typography>
      </MyModal>
    </>
  );
}
