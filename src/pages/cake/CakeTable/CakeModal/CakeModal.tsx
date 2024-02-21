import {
  Cake,
  CakePrice,
  CakePriceWithoutId,
  CakeForm,
  addCake,
  updateCake,
} from '@/api/cake';
import MyModal from '@/components/MyModal/MyModal';
import useUploadImage from '@/hooks/useUploadImage';
import { genIdByDate } from '@/utils/string-utils';
import { AddOutlined, Close, PhotoCameraOutlined } from '@mui/icons-material';
import {
  AspectRatio,
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Input,
  Textarea,
  Typography,
} from '@mui/joy';
import { useEffect, useMemo } from 'react';
import PriceInput from './PriceInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/api/queryKeys';
import { getCategories } from '@/api/category';
import { toast } from 'react-toastify';

interface Props {
  open: boolean;
  onClose: () => void;
  initData?: Cake;
}

const getInitPrice = (): CakePrice => {
  return {
    id: genIdByDate(),
    size: '',
    price: null,
    oldPrice: null,
  };
};

export default function CakeModal({ open, onClose, initData }: Props) {
  const mode = initData ? 'edit' : 'add';
  const queryClient = useQueryClient();

  const getCategoryQR = useQuery({
    queryKey: [QUERY_KEY.Categories],
    queryFn: getCategories,
  });

  const addCakeMT = useMutation({
    mutationFn: (newCake: CakeForm) => addCake(newCake),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.Cakes],
      });
      onClose();
      toast.success('Thêm bánh thành công');
    },
    onError: () => {
      toast.error('Lỗi khi thêm');
    },
  });

  const updateCakeMT = useMutation({
    mutationFn: (updatedData: Partial<CakeForm>) =>
      updateCake(initData?.id ?? '', updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.Cakes],
      });
      onClose();
      toast.success('Cập nhật thành công');
    },
    onError: () => {
      toast.error('Lỗi khi cập nhật');
    },
  });

  const {
    ImportComponent,
    triggerImport,
    clearImage,
    imageMT,
    uploadImageUrl,
  } = useUploadImage();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm<CakeForm>({
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
  const images = watch('images');

  useEffect(() => {
    if (!open) {
      reset(undefined, {
        keepDefaultValues: true,
        keepErrors: false,
      });
      clearImage();
    }
  }, [open]);

  useEffect(() => {
    if (initData) {
      // eslint-disable-next-line
      const { id, categories, ...cakeForm } = initData;
      reset(cakeForm);
    }
  }, [initData]);

  const registers = useMemo(() => {
    return {
      images: register('images', {
        validate: {
          required: (value) => !!value.length || 'Bạn chưa thêm ảnh',
        },
      }),
      name: register('name', {
        required: true,
      }),
      prices: register('prices', {
        validate: {
          required: (value) => !!value.length || 'Bạn chưa thêm cỡ',
        },
      }),
      categoryIds: register('categoryIds', {
        validate: {
          required: (value) => !!value.length,
        },
      }),
      desc: register('desc'),
    };
  }, [register]);

  const updatePrice = (id: string, newData: CakePriceWithoutId) => {
    const index = prices.findIndex((oldData) => oldData.id === id);
    if (index === -1) return;
    prices[index] = { id, ...newData };
    setValue('prices', prices);
  };

  const deletePrice = (id: string) => {
    const index = prices.findIndex((oldData) => oldData.id === id);
    if (index === -1) return;
    prices.splice(index, 1);
    setValue('prices', prices);
  };

  const addNewPrice = () => {
    prices.push(getInitPrice());
    setValue('prices', prices);
    clearErrors('prices');
  };

  const onSubmit: SubmitHandler<CakeForm> = (formData) => {
    // eslint-disable-next-line
    console.log('formData', formData);
    if (mode === 'add') {
      addCakeMT.mutate(formData);
    } else if (mode === 'edit') {
      updateCakeMT.mutate(formData);
    }
  };

  useEffect(() => {
    if (uploadImageUrl) {
      setValue('images', [uploadImageUrl]);
      clearErrors('images');
    }
  }, [uploadImageUrl]);

  return (
    <MyModal
      open={open}
      onClose={onClose}
      OkButtonLabel={mode === 'add' ? 'Thêm' : 'Cập nhật'}
      onOk={handleSubmit(onSubmit)}
      OkButtonProps={{
        loading: addCakeMT.isPending,
      }}
      CancelButtonProps={{
        disabled: addCakeMT.isPending,
      }}
      title={mode === 'add' ? 'Thêm bánh' : 'Sửa thông tin'}
    >
      <ImportComponent />
      <Box display='flex' justifyContent='center'>
        <Box width='fit-content' position='relative'>
          <AspectRatio
            ratio='1'
            sx={{ width: 100, borderRadius: 'md' }}
            objectFit='cover'
          >
            {!!images[0] && (
              <img
                src={images[0]}
                style={{ border: 'none', outline: 'none' }}
              />
            )}
          </AspectRatio>

          <Box
            position='absolute'
            top='50%'
            left='50%'
            sx={{ transform: 'translate(-50%, -50%)' }}
          >
            {imageMT.isPending ? (
              <CircularProgress />
            ) : (
              <IconButton
                variant='solid'
                color='primary'
                onClick={triggerImport}
                ref={registers.images.ref}
              >
                <PhotoCameraOutlined />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
      {!!errors.images && !imageMT.isPending && (
        <Typography
          className='bounce'
          mt={0.5}
          color='danger'
          level='body-sm'
          textAlign='center'
        >
          Bạn chưa thêm ảnh
        </Typography>
      )}
      <Box display='flex' flexDirection='column' gap={1}>
        <Typography level='title-sm' className='required'>
          Tên
        </Typography>
        <Input {...registers.name} />
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
                onChange={updatePrice}
                onDelete={deletePrice}
              />
            ))}
          </Box>
        )}

        <Box display='flex' alignItems='center' gap={1}>
          <IconButton
            sx={{ width: 'fit-content' }}
            variant='solid'
            color='primary'
            size='sm'
            onClick={addNewPrice}
            ref={registers.prices.ref}
          >
            <AddOutlined />
          </IconButton>
          {!!errors.prices && (
            <Typography className='bounce' color='danger' level='body-sm'>
              {errors.prices.message}
            </Typography>
          )}
        </Box>
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
              ref: registers.categoryIds.ref,
            },
          }}
          openOnFocus
          disableCloseOnSelect
          noOptionsText='Bấm Enter để thêm loại mới'
        />
        <Typography level='title-sm'>Mô tả</Typography>
        <Textarea {...registers.desc} />
      </Box>
    </MyModal>
  );
}
