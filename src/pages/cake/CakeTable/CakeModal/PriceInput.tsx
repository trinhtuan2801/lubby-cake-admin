import { CakePrice, CakePriceWithoutId } from '@/api/cake';
import MyModal from '@/components/MyModal/MyModal';
import { numberWithCommas } from '@/utils/string-utils';
import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Input, Typography } from '@mui/joy';
import { useEffect, useMemo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
interface Props {
  value: CakePrice;
  onChange: (id: string, newPrice: CakePriceWithoutId) => void;
  onDelete: (id: string) => void;
}

export default function PriceInput({
  value: parentValue,
  onChange,
  onDelete,
}: Props) {
  const { id } = parentValue;
  const [isEdit, setIsEdit] = useState(parentValue.size ? false : true);
  const { register, handleSubmit, reset } = useForm<CakePriceWithoutId>();
  const onSubmit: SubmitHandler<CakePriceWithoutId> = (formData) => {
    // eslint-disable-next-line
    console.log('formData', formData);
    onChange(id, {
      size: formData.size,
      price: formData.price,
      oldPrice: formData.oldPrice,
    });
    setIsEdit(false);
  };

  const resetToDefaultData = () => {
    // eslint-disable-next-line
    const { id, ...formData } = parentValue;
    reset(formData);
  };

  const cancelEdit = () => {
    if (!parentValue.size) {
      onDelete(id);
    } else {
      setIsEdit(false);
      resetToDefaultData();
    }
  };

  useEffect(() => {
    resetToDefaultData();
  }, [parentValue]);

  const registers = useMemo(() => {
    return {
      size: register('size', {
        required: true,
      }),
      price: register('price', {
        required: true,
        valueAsNumber: true,
      }),
      oldPrice: register('oldPrice', {
        valueAsNumber: true,
      }),
    };
  }, [register]);

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Box>
        <Typography level='body-sm' fontWeight='bold'>
          {parentValue.size}
        </Typography>
        <Box display='flex' gap={1}>
          <Typography level='body-sm' color='success'>
            {numberWithCommas(parentValue.price)}đ
          </Typography>
          {!!parentValue.oldPrice && (
            <Typography level='body-sm'>
              ({numberWithCommas(parentValue.oldPrice)}đ)
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
          <Input {...registers.size} autoFocus />
          <Box display='flex' gap={1}>
            <Box flexGrow={1} flexBasis={0} overflow='hidden'>
              <Typography level='title-sm' className='required'>
                Giá bán
              </Typography>
              <Input type='number' color='success' {...registers.price} />
            </Box>
            <Box flexGrow={1} flexBasis={0} overflow='hidden'>
              <Typography level='title-sm'>Giá cũ</Typography>
              <Input type='number' {...registers.oldPrice} />
            </Box>
          </Box>
        </Box>
      </MyModal>
    </Box>
  );
}
