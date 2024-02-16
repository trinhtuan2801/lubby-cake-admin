import { CakePrice } from '@/api/cake';
import MyModal from '@/components/MyModal/MyModal';
import useUploadImage from '@/hooks/useUploadImage';
import { numberWithCommas } from '@/utils/string-utils';
import { AddOutlined, PhotoCameraOutlined } from '@mui/icons-material';
import {
  AspectRatio,
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Typography,
} from '@mui/joy';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

// eslint-disable-next-line
const initPrice: CakePrice = {
  id: '',
  size: '',
  price: 0,
  oldPrice: undefined,
};

export default function AddCakeModal({ open, onClose }: Props) {
  const { ImportComponent, triggerImport, data } = useUploadImage();

  // eslint-disable-next-line
  const [prices, setPrices] = useState<CakePrice[]>([]);

  return (
    <MyModal open={open} onClose={onClose}>
      <ImportComponent />
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Box width='fit-content' position='relative'>
          <AspectRatio
            ratio='1'
            sx={{ width: 150, borderRadius: 'md' }}
            objectFit='cover'
          >
            {data && (
              <img src={data} style={{ border: 'none', outline: 'none' }} />
            )}
          </AspectRatio>
          <IconButton
            sx={{
              position: 'absolute',
              bottom: 5,
              right: 5,
            }}
            variant='solid'
            color='primary'
            onClick={triggerImport}
          >
            <PhotoCameraOutlined />
          </IconButton>
        </Box>
      </Box>

      <Box display='flex' flexDirection='column' gap={1}>
        <FormControl>
          <FormLabel>Tên</FormLabel>
          <Input />
        </FormControl>
        <FormControl>
          <FormLabel>Lựa chọn</FormLabel>
          {prices.map(({ id, price, size, oldPrice }) => (
            <Box key={id} display='flex' gap={1}>
              <Typography level='body-sm' fontWeight='bold'>
                {size}
              </Typography>
              <Typography level='body-sm' color='success'>
                {numberWithCommas(price)}đ
              </Typography>
              {oldPrice !== undefined && (
                <Typography level='body-sm'>
                  ({numberWithCommas(oldPrice)}đ)
                </Typography>
              )}
            </Box>
          ))}
          <IconButton
            sx={{ width: 'fit-content' }}
            variant='outlined'
            color='primary'
          >
            <AddOutlined />
          </IconButton>
        </FormControl>
      </Box>
    </MyModal>
  );
}
