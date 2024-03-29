import { Category, deleteCategory, updateCategory } from '@/api/category';
import { QUERY_KEY } from '@/api/queryKeys';
import MyModal from '@/components/MyModal/MyModal';
import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Input, Typography } from '@mui/joy';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface CategoryTableRowProps extends Category {}

export default function CategoryTableRow({ id, name }: CategoryTableRowProps) {
  const queryClient = useQueryClient();
  const [openEdit, setOpenEdit] = useState(false);
  const [newName, setNewName] = useState(name);
  const [openDelete, setOpenDelete] = useState(false);

  const updateCategoryMT = useMutation({
    mutationFn: () => updateCategory(id, { name: newName }),
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

  const deleteCategoryMT = useMutation({
    mutationFn: () => deleteCategory(id),
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
    if (openEdit) setNewName(name);
  }, [openEdit]);

  return (
    <>
      <tr>
        <td>
          <Box pl={1}>
            <Typography>{name}</Typography>
          </Box>
        </td>
        <td>
          <Box display='flex' justifyContent='flex-end'>
            <IconButton
              variant='plain'
              size='sm'
              onClick={() => setOpenEdit(true)}
            >
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
        </td>
      </tr>
      <MyModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        title='Sửa'
        OkButtonLabel='Cập nhật'
        OkButtonProps={{
          loading: updateCategoryMT.isPending,
          disabled: !newName,
        }}
        onOk={() => {
          updateCategoryMT.mutate();
        }}
      >
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && newName) {
              updateCategoryMT.mutate();
            }
          }}
        />
      </MyModal>
      <MyModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        title='Xóa'
        OkButtonLabel='Xóa'
        OkButtonProps={{
          color: 'danger',
          loading: deleteCategoryMT.isPending,
        }}
        onOk={() => {
          deleteCategoryMT.mutate();
        }}
      >
        <Typography>
          Bạn muốn xóa loại:&nbsp;
          <Typography
            component='span'
            color='danger'
            sx={{ display: 'inline-block' }}
          >
            {name} ?
          </Typography>
        </Typography>
      </MyModal>
    </>
  );
}
