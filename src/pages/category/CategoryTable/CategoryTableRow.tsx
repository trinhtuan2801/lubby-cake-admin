import { Category, deleteCategory } from '@/api/category';
import { QUERY_KEY } from '@/api/queryKeys';
import MyIconButton from '@/components/MyIconButton/MyIconButton';
import { DeleteOutline } from '@mui/icons-material';
import { TableCell, TableRow } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
  });

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell width='100%'>{name}</TableCell>
      <TableCell align='right' >
        <MyIconButton onClick={() => deleteRow.mutate(id)}>
          <DeleteOutline color='error' fontSize='small' />
        </MyIconButton>
      </TableCell>
    </TableRow>
  );
}
