import { CakePrice, CakePriceWithoutId } from '@/api/cake';
import MyModal from '@/components/MyModal/MyModal';
import useUploadImage from '@/hooks/useUploadImage';
import { genIdByDate } from '@/utils/string-utils';
import { AddOutlined, PhotoCameraOutlined } from '@mui/icons-material';
import {
  AspectRatio,
  Autocomplete,
  Box,
  IconButton,
  Input,
  Textarea,
  Typography,
} from '@mui/joy';
import { useEffect, useState } from 'react';
import PriceInput from './PriceInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/api/queryKeys';
import { getCategories } from '@/api/category';

interface Props {
  open: boolean;
  onClose: () => void;
}

interface CakeForm {
  name: string;
  desc: string;
  categoryIds: string[];
}

// eslint-disable-next-line
const getInitPrice = (): CakePrice => {
  return {
    id: genIdByDate(),
    size: '',
    price: 0,
    oldPrice: null,
  };
};

export default function AddCakeModal({ open, onClose }: Props) {
  const getCategoryQR = useQuery({
    queryKey: [QUERY_KEY.Categories],
    queryFn: getCategories,
  });
  const { ImportComponent, triggerImport, data } = useUploadImage();
  const { register, handleSubmit } = useForm<CakeForm>();

  // eslint-disable-next-line
  const [prices, setPrices] = useState<CakePrice[]>([]);

  useEffect(() => {
    if (!open) setPrices([]);
  }, [open]);

  const onChangePrice = (id: string, newData: CakePriceWithoutId) => {
    const newPrices = [...prices];
    const index = newPrices.findIndex((oldData) => oldData.id === id);
    if (index === -1) return;
    newPrices[index] = {
      ...newPrices[index],
      ...newData,
    };
    setPrices(newPrices);
  };

  const onDeletePrice = (id: string) => {
    const newPrices = [...prices];
    const index = newPrices.findIndex((oldData) => oldData.id === id);
    if (index === -1) return;
    newPrices.splice(index, 1);
    setPrices(newPrices);
  };

  const onSubmit: SubmitHandler<CakeForm> = (formData) => {
    // eslint-disable-next-line
    console.log('formData', formData);
  };

  return (
    <MyModal
      open={open}
      onClose={onClose}
      OkButtonLabel='Thêm'
      onOk={handleSubmit(onSubmit)}
    >
      <ImportComponent />
      <Box display='flex' justifyContent='center'>
        <Box width='fit-content' position='relative'>
          <AspectRatio
            ratio='1'
            sx={{ width: 100, borderRadius: 'md' }}
            objectFit='cover'
          >
            {data && (
              <img
                src={data}
                style={{ border: 'none', outline: 'none' }}
                onClick={triggerImport}
              />
            )}
          </AspectRatio>
          {!data && (
            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              variant='plain'
              onClick={triggerImport}
            >
              <PhotoCameraOutlined />
            </IconButton>
          )}
        </Box>
      </Box>

      <Box display='flex' flexDirection='column' gap={1}>
        <Typography level='title-sm'>Tên</Typography>
        <Input
          {...register('name', {
            required: true,
          })}
        />
        <Typography level='title-sm'>Kích cỡ</Typography>
        {!!prices.length && (
          <Box
            p={1}
            borderRadius={6}
            border='1px solid'
            borderColor='neutral.outlinedBorder'
            display='flex'
            flexDirection='column'
            gap={1}
          >
            {prices.map((price) => (
              <PriceInput
                key={price.id}
                value={price}
                onChange={onChangePrice}
                onDelete={onDeletePrice}
              />
            ))}
          </Box>
        )}

        <IconButton
          sx={{ width: 'fit-content' }}
          variant='solid'
          color='primary'
          size='sm'
          onClick={() => {
            setPrices((prev) => [...prev, getInitPrice()]);
          }}
        >
          <AddOutlined />
        </IconButton>
        <Typography level='title-sm'>Loại bánh</Typography>
        <Autocomplete
          multiple
          options={
            getCategoryQR.data?.map((cate) => ({
              ...cate,
              label: cate.name,
            })) ?? []
          }
          // defaultValue={[top100Films[0]]}
          {...register('categoryIds')}
        />
        <Typography level='title-sm'>Mô tả</Typography>
        <Textarea {...register('desc')} />
      </Box>
    </MyModal>
  );
}
