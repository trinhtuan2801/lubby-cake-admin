import {
  Cake,
  CakeForm,
  CakePrice,
  CakePriceWithoutId,
  addCake,
  updateCake,
} from '@/api/cake';
import { QUERY_KEY } from '@/api/queryKeys';
import MyModal from '@/components/MyModal/MyModal';
import {
  Age,
  AgeStr,
  Gender,
  GenderStr,
  ageKeys,
  genderKeys,
} from '@/constants';
import useUploadImage from '@/hooks/useUploadImage';
import { genIdByDate } from '@/utils/string-utils';
import {
  AddOutlined,
  CheckOutlined,
  PhotoCameraOutlined,
} from '@mui/icons-material';
import {
  AspectRatio,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Input,
  Textarea,
  Typography,
} from '@mui/joy';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PriceInput from './PriceInput';

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

  // const getCategoryQR = useQuery({
  //   queryKey: [QUERY_KEY.Categories],
  //   queryFn: getCategories,
  // });

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
    // eslint-disable-next-line
    formState: { errors },
    clearErrors,
  } = useForm<CakeForm>({
    defaultValues: {
      images: [],
      name: '',
      prices: [],
      categoryIds: [],
      desc: '',
      gender: null,
      age: null,
    },
  });

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
      // categoryIds: register('categoryIds', {
      //   validate: {
      //     required: (value) => !!value.length,
      //   },
      // }),
    };
  }, [register]);

  // const categoryIds = watch('categoryIds');
  const prices = watch('prices');
  const images = watch('images');
  const selectedGender = watch('gender');
  const selectedAge = watch('age');
  const desc = watch('desc');

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

  const onClickGender = (gender: Gender) => {
    setValue('gender', selectedGender === gender ? null : gender);
  };

  const onClickAge = (age: Age) => {
    setValue('age', selectedAge === age ? null : age);
  };

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
        </Box>
        <Typography level='title-sm'>Giới tính</Typography>
        <Box display='flex' gap={0.5}>
          {genderKeys.map((gender) => {
            const checked = selectedGender === gender;
            return (
              <Chip
                key={gender}
                variant='outlined'
                color={checked ? 'primary' : 'neutral'}
                startDecorator={
                  checked && (
                    <CheckOutlined sx={{ zIndex: 1, pointerEvents: 'none' }} />
                  )
                }
                onClick={() => onClickGender(gender)}
              >
                {GenderStr[gender]}
              </Chip>
            );
          })}
        </Box>
        <Typography level='title-sm'>Độ tuổi</Typography>
        <Box display='flex' gap={0.5}>
          {ageKeys.map((age) => {
            const checked = selectedAge === age;
            return (
              <Chip
                key={age}
                variant='outlined'
                color={checked ? 'primary' : 'neutral'}
                startDecorator={
                  checked && (
                    <CheckOutlined sx={{ zIndex: 1, pointerEvents: 'none' }} />
                  )
                }
                onClick={() => onClickAge(age)}
              >
                {AgeStr[age]} tuổi
              </Chip>
            );
          })}
        </Box>
        {/* <Autocomplete
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
        /> */}
        <Typography level='title-sm'>Mô tả</Typography>
        <Textarea
          value={desc}
          onChange={(e) => setValue('desc', e.target.value)}
        />
      </Box>
    </MyModal>
  );
}
