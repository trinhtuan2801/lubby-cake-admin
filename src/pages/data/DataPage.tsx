import MyModal from '@/components/MyModal/MyModal';
import { deleteUnusedImages } from '@/firebase/utils';
import { Backup, HideImageOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
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

  const [openConfirmUpdate, setOpenConfirmUpdate] = useState(false);

  return (
    <>
      <Typography level='title-md' color='primary' fontWeight='bold'>
        Dữ liệu
      </Typography>
      <Box display='flex' flexDirection='column' gap={1} width='fit-content'>
        <Button
          startDecorator={<HideImageOutlined />}
          onClick={() => deleteUnusedImagesMT.mutate()}
          loading={deleteUnusedImagesMT.isPending}
        >
          Xóa ảnh không dùng
        </Button>

        <Button
          startDecorator={<Backup />}
          onClick={() => setOpenConfirmUpdate(true)}
          color='danger'
        >
          Cập nhật dữ liệu bánh
        </Button>

        <MyModal
          open={openConfirmUpdate}
          onClose={() => setOpenConfirmUpdate(false)}
          OkButtonLabel='Cập nhật'
          title={
            <Typography color='danger' fontWeight='bold'>
              Xác nhận
            </Typography>
          }
          OkButtonProps={{
            color: 'danger',
          }}
          onOk={() => {
            fetch(
              'https://api.vercel.com/v1/integrations/deploy/prj_9tvC44t5Ck1ZBfMgzceqL6b0655D/eDM2K18NZs',
            );
            toast.success('Đang cập nhật dữ liệu...');
            setOpenConfirmUpdate(false);
          }}
        >
          <Typography>Cập nhật dữ liệu sẽ mất khoảng 1 phút</Typography>
        </MyModal>
      </Box>
    </>
  );
}
