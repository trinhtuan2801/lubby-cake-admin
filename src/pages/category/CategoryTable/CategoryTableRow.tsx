import { Category, deleteCategory } from '@/api/category';
import { QUERY_KEY } from '@/api/queryKeys';
import MyIconButton from '@/components/MyIconButton/MyIconButton';
import MyModal from '@/components/MyModal/MyModal';
import { Delete, DeleteOutline, Edit, Save } from '@mui/icons-material';
import { Box, IconButton, Input, Typography } from '@mui/joy';
import { TableCell, TableRow } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface CategoryTableRowProps extends Category {}

export default function CategoryTableRow({ id, name }: CategoryTableRowProps) {
  const queryClient = useQueryClient();

  const deleteRow = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.Categories],
      });
    },
    onError: () => {
      toast.error('Lỗi khi xóa');
    },
  });

  const [openEdit, setOpenEdit] = useState(false);

  const [newName, setNewName] = useState(name);

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
              onClick={() => deleteRow.mutate(id)}
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
        onOk={() => {}}
      >
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </MyModal>
    </>
  );
}
