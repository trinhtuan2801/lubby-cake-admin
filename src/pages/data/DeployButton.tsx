import MyModal from '@/components/MyModal/MyModal';
import {
  DISABLED_DEPLOY_TIME_IN_SECOND,
  PREVIOUS_DEPLOY_DATE,
} from '@/constants';
import { Backup } from '@mui/icons-material';
import { Button, Typography } from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export default function DeployButton() {
  const [openConfirmUpdate, setOpenConfirmUpdate] = useState(false);
  const [disabledTime, setDisabledTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();
  const deployMT = useMutation({
    mutationFn: () => {
      localStorage.setItem(PREVIOUS_DEPLOY_DATE, dayjs().toISOString());
      return fetch(
        'https://api.vercel.com/v1/integrations/deploy/prj_9tvC44t5Ck1ZBfMgzceqL6b0655D/eDM2K18NZs',
        {
          method: 'POST',
        },
      );
    },
    onSuccess: () => {
      startCountDown(DISABLED_DEPLOY_TIME_IN_SECOND);
      toast.success('Đang cập nhật dữ liệu...');
      setOpenConfirmUpdate(false);
    },
  });

  const startCountDown = (time: number) => {
    clearInterval(timerRef.current);
    setDisabledTime(time);
    timerRef.current = setInterval(() => {
      setDisabledTime((prev) => prev - 1);
    }, 1000);
  };

  useEffect(() => {
    if (disabledTime === 0) clearInterval(timerRef.current);
  }, [disabledTime]);

  useEffect(() => {
    const prevDeployDate = localStorage.getItem(PREVIOUS_DEPLOY_DATE);
    if (prevDeployDate) {
      const diff = dayjs().diff(dayjs(prevDeployDate), 'second');
      if (diff < DISABLED_DEPLOY_TIME_IN_SECOND) {
        startCountDown(DISABLED_DEPLOY_TIME_IN_SECOND - diff);
      }
    }
  }, []);

  return (
    <>
      <Button
        startDecorator={<Backup />}
        onClick={() => setOpenConfirmUpdate(true)}
        color='success'
        disabled={disabledTime > 0}
      >
        Cập nhật dữ liệu bánh&nbsp;
        {disabledTime > 0 && <span>{disabledTime}s</span>}
      </Button>

      <MyModal
        open={openConfirmUpdate}
        onClose={() => setOpenConfirmUpdate(false)}
        OkButtonLabel='Cập nhật'
        title='Xác nhận'
        OkButtonProps={{
          color: 'success',
          loading: deployMT.isPending,
        }}
        onOk={() => {
          deployMT.mutate();
        }}
      >
        <Typography>Cập nhật dữ liệu sẽ mất khoảng 1 phút</Typography>
      </MyModal>
    </>
  );
}
