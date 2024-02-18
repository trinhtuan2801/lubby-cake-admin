import { deleteUnusedImages } from '@/firebase/utils';
import { HideImageOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function DataPage() {
  const deleteUnusedImagesMT = useMutation({
    mutationFn: () => deleteUnusedImages(),
    onSuccess: () => {
      toast.success('Đã xóa thành công');
    },
    onError: () => {
      toast.error('Có lỗi khi xóa ảnh');
    },
  });

  return (
    <>
      <Typography level='title-md' color='primary' fontWeight='bold'>
        Dữ liệu
      </Typography>
      <Box>
        <Button
          startDecorator={<HideImageOutlined />}
          onClick={() => deleteUnusedImagesMT.mutate()}
          loading={deleteUnusedImagesMT.isPending}
        >
          Xóa ảnh không dùng
        </Button>
      </Box>
    </>
  );
}
