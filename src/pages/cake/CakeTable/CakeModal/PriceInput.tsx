import { CakePrice, CakePriceWithoutId } from '@/api/cake';
import MyModal from '@/components/MyModal/MyModal';
import { numberWithCommas } from '@/utils/string-utils';
import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Input, Typography } from '@mui/joy';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
interface Props {
  value: CakePrice;
  onChange: (id: string, newPrice: CakePriceWithoutId) => void;
  onDelete: (id: string) => void;
}

interface PriceForm {
  size: string;
  price: number;
  oldPrice: number | null;
}

export default function PriceInput({ value, onChange, onDelete }: Props) {
  const { price, size, oldPrice, id } = value;
  const [isEdit, setIsEdit] = useState(true);
  const { register, handleSubmit, reset } = useForm<PriceForm>();
  const onSubmit: SubmitHandler<PriceForm> = (formData) => {
    onChange(id, {
      size: formData.size,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
    });
    setIsEdit(false);
  };

  const cancelEdit = () => {
    if (!size) {
      onDelete(id);
    } else {
      setIsEdit(false);
      // eslint-disable-next-line
      const { id, ...formData } = value;
      reset(formData);
    }
  };

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Box>
        <Typography level='body-sm' fontWeight='bold'>
          {size}
        </Typography>
        <Box display='flex' gap={1}>
          <Typography level='body-sm' color='success'>
            {numberWithCommas(price)}đ
          </Typography>
          {!!oldPrice && (
            <Typography level='body-sm'>
              ({numberWithCommas(oldPrice)}đ)
            </Typography>
          )}
        </Box>
      </Box>
      <Box>
        <IconButton variant='plain' size='sm' onClick={() => setIsEdit(true)}>
          <Edit />
        </IconButton>
        <IconButton
          variant='plain'
          size='sm'
          color='danger'
          onClick={() => onDelete(id)}
        >
          <Delete />
        </IconButton>
      </Box>
      <MyModal
        open={isEdit}
        onClose={cancelEdit}
        onOk={handleSubmit(onSubmit)}
        OkButtonLabel='Lưu'
      >
        <Box display='flex' flexDirection='column' gap={1}>
          <Typography level='title-sm' className='required'>
            Cỡ
          </Typography>
          <Input
            {...register('size', {
              required: true,
            })}
            autoFocus
          />
          <Box display='flex' gap={1}>
            <Box flexGrow={1} flexBasis={0} overflow='hidden'>
              <Typography level='title-sm' className='required'>
                Giá bán
              </Typography>
              <Input
                type='number'
                color='success'
                {...register('price', {
                  required: true,
                })}
              />
            </Box>
            <Box flexGrow={1} flexBasis={0} overflow='hidden'>
              <Typography level='title-sm'>Giá cũ</Typography>
              <Input type='number' {...register('oldPrice')} />
            </Box>
          </Box>
        </Box>
      </MyModal>
    </Box>
  );
}
