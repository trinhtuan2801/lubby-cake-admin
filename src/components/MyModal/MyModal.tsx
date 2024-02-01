import {
  Box,
  Button,
  ButtonProps,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  ModalProps,
  Typography,
} from '@mui/joy';
import { PropsWithChildren, ReactNode } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  ModalProps?: ModalProps;
  footer?: ReactNode;
  onOk?: () => void;
  OkButtonLabel?: string;
  OkButtonProps?: ButtonProps;
  onCancel?: () => void;
  CancelButtonLabel?: string;
  CancelButtonProps?: ButtonProps;
}

export default function MyModal({
  open,
  onClose,
  children,
  title = '',
  ModalProps,
  OkButtonLabel,
  OkButtonProps,
  CancelButtonLabel,
  CancelButtonProps,
  onOk,
  onCancel,
}: PropsWithChildren<Props>) {
  return (
    <Modal {...ModalProps} open={open} onClose={onClose}>
      <ModalDialog sx={{ rowGap: 2.5 }}>
        <ModalClose />
        <Box minHeight={24}>
          {typeof title === 'object' ? (
            title
          ) : (
            <Typography level='title-lg'>{title}</Typography>
          )}
        </Box>
        <Box overflow='auto'>{children}</Box>
        <Box display='flex' justifyContent='flex-end' columnGap={1}>
          {!!onOk && (
            <Button {...OkButtonProps} onClick={onOk}>
              {OkButtonLabel ?? 'Ok'}
            </Button>
          )}
          <Button
            variant='outlined'
            {...CancelButtonProps}
            onClick={() => {
              if (onCancel) onCancel();
              else onClose();
            }}
          >
            {CancelButtonLabel ?? 'Hủy'}
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
