import { CakePrice, CakePriceWithoutId } from '@/api/cake';
import { numberWithCommas } from '@/utils/string-utils';
import {
  CheckOutlined,
  CloseOutlined,
  Delete,
  Edit,
} from '@mui/icons-material';
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

  if (!isEdit)
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
      </Box>
    );

  return (
    <Box display='flex' flexDirection='column' gap={1}>
      <Input
        placeholder='Cỡ'
        {...register('size', {
          required: true,
        })}
        autoFocus
      />
      <Box display='flex' gap={1}>
        <Input
          placeholder='Giá bán'
          type='number'
          color='success'
          {...register('price', {
            required: true,
          })}
        />
        <Input placeholder='Giá cũ' type='number' {...register('oldPrice')} />
      </Box>
      <Box display='flex' justifyContent='flex-end' gap={1}>
        <IconButton
          variant='outlined'
          size='sm'
          color='primary'
          onClick={handleSubmit(onSubmit)}
        >
          <CheckOutlined />
        </IconButton>
        <IconButton
          variant='outlined'
          size='sm'
          color='danger'
          onClick={cancelEdit}
        >
          <CloseOutlined />
        </IconButton>
      </Box>
    </Box>
  );
}
