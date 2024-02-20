import { CakePrice, CakePriceWithoutId } from '@/api/cake';
import MyModal from '@/components/MyModal/MyModal';
import useUploadImage from '@/hooks/useUploadImage';
import { genIdByDate } from '@/utils/string-utils';
import { AddOutlined, Close, PhotoCameraOutlined } from '@mui/icons-material';
import {
  AspectRatio,
  Autocomplete,
  Box,
  Chip,
  IconButton,
  Input,
  Textarea,
  Typography,
} from '@mui/joy';
import { useEffect, useMemo } from 'react';
import PriceInput from './PriceInput';
import { SubmitHandler, useForm, SubmitErrorHandler } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/api/queryKeys';
import { getCategories } from '@/api/category';

interface Props {
  open: boolean;
  onClose: () => void;
}

interface CakeForm {
  images: string[];
  name: string;
  prices: CakePrice[];
  categoryIds: string[];
  desc: string;
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
  const { ImportComponent, triggerImport, data: imageUrl } = useUploadImage();
  const { register, handleSubmit, setValue, watch, reset } = useForm<CakeForm>({
    defaultValues: {
      images: [],
      name: '',
      prices: [],
      categoryIds: [],
      desc: '',
    },
  });

  const categoryIds = watch('categoryIds');
  const prices = watch('prices');

  useEffect(() => {
    if (!open) {
      reset(undefined, {
        keepDefaultValues: true,
      });
    }
  }, [open]);

  const customRegisters = useMemo(() => {
    const result = {
      images: register('images', {
        validate: {
          required: (value) => !!value.length || 'Bạn chưa thêm ảnh',
        },
      }),
      categoryIds: register('categoryIds', {
        validate: {
          required: (value) => !!value.length,
        },
      }),
      prices: register('prices', {
        validate: {
          required: (value) => !!value.length || 'Bạn chưa thêm cỡ',
        },
      }),
    };
    setTimeout(() => {
      reset(undefined, { keepDefaultValues: true });
    }, 1000);
    return result;
  }, [register]);

  const onChangePrice = (id: string, newData: CakePriceWithoutId) => {
    const index = prices.findIndex((oldData) => oldData.id === id);
    if (index === -1) return;
    prices[index] = { id, ...newData };
    setValue('prices', prices);
  };

  const onDeletePrice = (id: string) => {
    const index = prices.findIndex((oldData) => oldData.id === id);
    if (index === -1) return;
    prices.splice(index, 1);
    setValue('prices', prices);
  };

  const onAddPrice = () => {
    prices.push(getInitPrice());
    setValue('prices', prices);
  };

  const onSubmit: SubmitHandler<CakeForm> = (formData) => {
    // eslint-disable-next-line
    console.log('formData', formData);
  };

  const onInvalid: SubmitErrorHandler<CakeForm> = (errors) => {
    // eslint-disable-next-line
    console.log('errors', errors);
    if (errors.prices) {
      errors.prices.ref?.focus?.();
    }
  };

  useEffect(() => {
    if (imageUrl) setValue('images', [imageUrl]);
  }, [imageUrl]);

  return (
    <MyModal
      open={open}
      onClose={onClose}
      OkButtonLabel='Thêm'
      onOk={handleSubmit(onSubmit, onInvalid)}
    >
      <ImportComponent />
      <Box display='flex' justifyContent='center'>
        <Box width='fit-content' position='relative'>
          <AspectRatio
            ratio='1'
            sx={{ width: 100, borderRadius: 'md' }}
            objectFit='cover'
          >
            {!!imageUrl && (
              <img src={imageUrl} style={{ border: 'none', outline: 'none' }} />
            )}
          </AspectRatio>
          <IconButton
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            variant='solid'
            color='primary'
            onClick={triggerImport}
            ref={customRegisters.images.ref}
          >
            <PhotoCameraOutlined />
          </IconButton>
        </Box>
      </Box>

      <Box display='flex' flexDirection='column' gap={1}>
        <Typography level='title-sm' className='required'>
          Tên
        </Typography>
        <Input
          {...register('name', {
            required: true,
          })}
        />
        <Typography level='title-sm' className='required'>
          Cỡ & Giá
        </Typography>
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
          onClick={onAddPrice}
          ref={customRegisters.prices.ref}
        >
          <AddOutlined />
        </IconButton>
        <Typography level='title-sm' className='required'>
          Loại bánh
        </Typography>
        <Autocomplete
          value={getCategoryQR.data?.filter((cate) =>
            categoryIds?.includes(cate.id),
          )}
          multiple
          options={getCategoryQR.data ?? []}
          getOptionLabel={(option) => option.name}
          renderTags={(tags, getTagProps) =>
            tags.map((item, index) => {
              const { key, ...props } = getTagProps({ index });
              return (
                <Chip
                  key={key}
                  color='primary'
                  endDecorator={<Close fontSize='small' />}
                  {...props}
                >
                  {item.name}
                </Chip>
              );
            })
          }
          onChange={(_, categories) => {
            setValue(
              'categoryIds',
              categories.map((cate) => cate.id),
            );
          }}
          slotProps={{
            input: {
              ref: customRegisters.categoryIds.ref,
            },
          }}
          openOnFocus
          disableCloseOnSelect
          noOptionsText='Bấm Enter để thêm loại mới'
        />
        <Typography level='title-sm'>Mô tả</Typography>
        <Textarea {...register('desc')} />
      </Box>
    </MyModal>
  );
}
